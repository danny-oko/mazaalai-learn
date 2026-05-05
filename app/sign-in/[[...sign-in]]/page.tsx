"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useSignIn } from "@clerk/nextjs/legacy";

import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignInForm } from "@/components/auth/SignInForm";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getClerkErrorMessage } from "@/lib/clerk/error-message";
import { signInSchema } from "@/lib/validators/auth";

const HOME_ROUTE = "/home";

export default function SignInPage() {
  const { isSignedIn, isLoaded: sessionLoaded } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { signOut } = useClerk();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  /** Clerk Client Trust / MFA: new browsers (e.g. incognito) often require email OTP after password. */
  const [secondFactorEmailAddressId, setSecondFactorEmailAddressId] = useState<
    string | null
  >(null);
  const [isSecondFactorBusy, setIsSecondFactorBusy] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    router.prefetch(HOME_ROUTE);
  }, [isLoaded, router]);

  useEffect(() => {
    if (!sessionLoaded || !isSignedIn) return;
    router.replace(HOME_ROUTE);
  }, [sessionLoaded, isSignedIn, router]);

  // BFCache: Back can restore `/sign-in` without re-running middleware; bounce signed-in users away.
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      if (!sessionLoaded || !isSignedIn) return;
      router.replace(HOME_ROUTE);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [sessionLoaded, isSignedIn, router]);

  const onGoogleSignIn = async () => {
    if (!isLoaded || !signIn) return;
    setError(null);
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sign-in",
        redirectUrlComplete: HOME_ROUTE,
      });
    } catch (err: unknown) {
      setError(getClerkErrorMessage(err, "Could not start Google sign-in."));
    }
  };

  const onSubmit = async (formData: FormData) => {
    if (!isLoaded) return;
    setError(null);
    setIsSigningIn(true);

    const parsed = signInSchema.safeParse({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });
    if (!parsed.success) {
      setIsSigningIn(false);
      return setError(parsed.error.issues[0]?.message ?? "Invalid input.");
    }

    const identifier = parsed.data.email;
    const password = parsed.data.password;

    try {
      const attempt = await signIn.create({
        identifier,
        password,
      });

      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        router.replace(HOME_ROUTE);
        return;
      }

      if (attempt.status === "needs_second_factor") {
        const factor = attempt.supportedSecondFactors?.find(
          (f) => f.strategy === "email_code",
        );

        if (factor?.strategy === "email_code") {
          await signIn.prepareSecondFactor({
            strategy: "email_code",
            emailAddressId: factor.emailAddressId,
          });
          setSecondFactorEmailAddressId(factor.emailAddressId);
          setError(null);
          return;
        }

        setError(
          "Extra sign-in verification is required (for example authenticator app). This screen only supports email codes—try Google sign-in or adjust verification in Clerk Dashboard.",
        );
        return;
      }

      setError(
        `Sign-in needs another step (${attempt.status}). Try again or use Google.`,
      );
    } catch (err: unknown) {
      const msg = (err as { errors?: Array<{ message?: string }> })?.errors?.[0]
        ?.message;
      if (msg?.toLowerCase().includes("session already exists")) {
        await signOut();
        setError("Previous session cleared. Please log in again.");
        return;
      }
      setError(msg ?? "Unable to sign in. Please check your credentials.");
    } finally {
      setIsSigningIn(false);
    }
  };

  const onSecondFactorSubmit = async (formData: FormData) => {
    if (!isLoaded || !signIn || !secondFactorEmailAddressId) return;
    const code = String(formData.get("code") ?? "").trim();
    if (!code) {
      setError("Enter the verification code from your email.");
      return;
    }

    setError(null);
    setIsSecondFactorBusy(true);
    try {
      const attempt = await signIn.attemptSecondFactor({
        strategy: "email_code",
        code,
      });

      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        router.replace(HOME_ROUTE);
        return;
      }

      setError("Verification did not complete. Check the code and try again.");
    } catch (err: unknown) {
      setError(getClerkErrorMessage(err, "Invalid or expired code."));
    } finally {
      setIsSecondFactorBusy(false);
    }
  };

  const onResendSecondFactor = async () => {
    if (!isLoaded || !signIn || !secondFactorEmailAddressId) return;
    setError(null);
    setIsSecondFactorBusy(true);
    try {
      await signIn.prepareSecondFactor({
        strategy: "email_code",
        emailAddressId: secondFactorEmailAddressId,
      });
    } catch (err: unknown) {
      setError(getClerkErrorMessage(err, "Could not resend the code."));
    } finally {
      setIsSecondFactorBusy(false);
    }
  };

  return (
    <AuthShell>
      <AuthHeader />
      {secondFactorEmailAddressId ? (
        <form action={onSecondFactorSubmit} className="space-y-4">
          <p className="text-center text-sm text-amber-900/90">
            We sent a verification code to your email (Clerk{" "}
            <span className="whitespace-nowrap">Client Trust</span>: new devices
            and private windows often need this step). Check spam, or use test
            code <code className="rounded bg-amber-100 px-1">424242</code> for
            Clerk test emails.
          </p>
          <FieldGroup className="gap-3">
            <Field>
              <FieldLabel
                htmlFor="sign-in-2fa-code"
                className="text-sm font-semibold tracking-wide text-[#E8920A]"
              >
                Verification code
              </FieldLabel>
              <Input
                id="sign-in-2fa-code"
                name="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                disabled={isSecondFactorBusy}
                className="h-11 rounded-2xl border-amber-300/80 bg-[#F8F4E3] text-sm sm:h-12 sm:text-base disabled:opacity-60"
                placeholder="Enter email code"
              />
            </Field>
            <FieldError>{error}</FieldError>
            <Button
              type="submit"
              disabled={isSecondFactorBusy}
              className="h-11 w-full rounded-2xl bg-[#E8920A] text-sm text-white hover:bg-[#cf7d09] sm:h-12 sm:text-base"
            >
              {isSecondFactorBusy ? "Verifying…" : "Continue"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onResendSecondFactor}
              disabled={isSecondFactorBusy}
              className="w-full rounded-xl border-amber-300 text-sm"
            >
              Resend code
            </Button>
          </FieldGroup>
        </form>
      ) : (
        <SignInForm
          isLoaded={isLoaded}
          isSigningIn={isSigningIn}
          error={error}
          onGoogleSignIn={onGoogleSignIn}
          onSubmit={onSubmit}
        />
      )}

      <p className="text-center text-xs text-amber-900/80 sm:text-sm">
        No account yet?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-amber-800 hover:text-amber-900 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </AuthShell>
  );
}

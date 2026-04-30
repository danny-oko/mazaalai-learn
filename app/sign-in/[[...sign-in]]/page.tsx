"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs/legacy";
import { useClerk } from "@clerk/nextjs";

import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignInForm } from "@/components/auth/SignInForm";
import { getClerkErrorMessage } from "@/lib/clerk/error-message";
import { signInSchema } from "@/lib/validators/auth";

const HOME_ROUTE = "/home";

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { signOut } = useClerk();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

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

    const parsed = signInSchema.safeParse({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });
    if (!parsed.success) {
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

      setError("Sign in is not complete yet. Please finish required steps.");
    } catch (err: unknown) {
      const msg = (err as { errors?: Array<{ message?: string }> })?.errors?.[0]
        ?.message;
      if (msg?.toLowerCase().includes("session already exists")) {
        await signOut();
        setError("Previous session cleared. Please log in again.");
        return;
      }
      setError(msg ?? "Unable to sign in. Please check your credentials.");
    }
  };

  return (
    <AuthShell>
      <AuthHeader />
      <SignInForm
        isLoaded={isLoaded}
        error={error}
        onGoogleSignIn={onGoogleSignIn}
        onSubmit={onSubmit}
      />

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

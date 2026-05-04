import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type SignInFormProps = {
  isLoaded: boolean;
  isSigningIn: boolean;
  error: string | null;
  onGoogleSignIn: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
};

export function SignInForm({
  isLoaded,
  isSigningIn,
  error,
  onGoogleSignIn,
  onSubmit,
}: SignInFormProps) {
  const busy = !isLoaded || isSigningIn;

  return (
    <form action={onSubmit} className="space-y-4">
      <FieldGroup className="gap-3 sm:gap-4">
        <div className="flex justify-center">
          <Button
            type="button"
            onClick={onGoogleSignIn}
            disabled={busy}
            className="h-10 w-full max-w-xs rounded-2xl border border-amber-300 bg-white text-sm text-amber-900 hover:border-[#E8920A] hover:bg-[#E8920A] hover:text-white sm:h-11"
          >
            Continue with Google
          </Button>
        </div>
        <Field>
          <FieldLabel
            htmlFor="email"
            className="text-sm font-semibold tracking-wide text-[#E8920A]"
          >
            Email
          </FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={busy}
            className="h-11 rounded-2xl border-amber-300/80 bg-[#F8F4E3] text-sm sm:h-12 sm:text-base disabled:opacity-60"
          />
        </Field>
        <Field>
          <FieldLabel
            htmlFor="password"
            className="text-sm font-semibold tracking-wide text-[#E8920A]"
          >
            Password
          </FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={busy}
            className="h-11 rounded-2xl border-amber-300/80 bg-[#F8F4E3] text-sm sm:h-12 sm:text-base disabled:opacity-60"
          />
        </Field>
        <FieldError>{error}</FieldError>
        <div id="clerk-captcha" />
        <Button
          type="submit"
          disabled={busy}
          className="h-11 w-full rounded-2xl bg-[#E8920A] text-sm text-white hover:bg-[#cf7d09] sm:h-12 sm:text-base"
        >
          {isSigningIn ? "Signing in…" : "Continue"}
        </Button>
      </FieldGroup>
    </form>
  );
}

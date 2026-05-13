import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthShell } from "@/components/auth/AuthShell";
import { mnUi } from "@/lib/i18n/mn-ui";

const HOME = "/home";

export default function SsoCallbackPage() {
  return (
    <AuthShell>
      <AuthHeader />
      <p className="text-center text-sm text-amber-900/80">{mnUi.signingIn}</p>
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl={HOME}
        signUpFallbackRedirectUrl={HOME}
        signInForceRedirectUrl={HOME}
        signUpForceRedirectUrl={HOME}
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
        secondFactorUrl="/sign-in"
      />
      <div id="clerk-captcha" />
    </AuthShell>
  );
}

import { Button } from "@/components/ui/button";

type EmailVerificationBlockProps = {
  verificationCode: string;
  verifyInfo: string | null;
  onChangeCode: (value: string) => void;
  onResendCode: () => void;
};

export function EmailVerificationBlock({
  verificationCode,
  verifyInfo,
  onChangeCode,
  onResendCode,
}: EmailVerificationBlockProps) {
  return (
    <div className="space-y-3">
      <label
        htmlFor="verificationCode"
        className="text-sm font-semibold tracking-wide text-[#E8920A]"
      >
        Verification code
      </label>
      <input
        id="verificationCode"
        value={verificationCode}
        onChange={(e) => onChangeCode(e.target.value)}
        className="h-11 w-full rounded-2xl border border-amber-300/80 bg-[#F8F4E3] px-3 text-sm sm:h-12 sm:text-base"
        placeholder="Enter email code"
      />
      <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
        <p className="text-amber-900/70">
          Not seeing it? Check spam folder. If using a <code>+clerk_test</code>{" "}
          email, use code <code>424242</code>.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={onResendCode}
          className="shrink-0 rounded-xl text-xs sm:text-sm"
        >
          Resend code
        </Button>
      </div>
      {verifyInfo && <p className="text-xs text-emerald-700 sm:text-sm">{verifyInfo}</p>}
    </div>
  );
}

import { Button } from "@/components/ui/button";

type SignUpStepActionsProps = {
  step: number;
  isLoaded: boolean;
  isSubmitting: boolean;
  awaitingEmailVerification: boolean;
  onBack: () => void;
  onContinueFromName: () => void;
  onNextFromPassword: () => void;
  onFinish: () => void;
};

export function SignUpStepActions({
  step,
  isLoaded,
  isSubmitting,
  awaitingEmailVerification,
  onBack,
  onContinueFromName,
  onNextFromPassword,
  onFinish,
}: SignUpStepActionsProps) {
  if (step === 1) {
    return (
      <div className="flex justify-center">
        <Button
          type="button"
          onClick={onContinueFromName}
          className="h-12 w-full max-w-sm rounded-2xl bg-[#E8920A] text-base font-semibold text-white hover:bg-[#cf7d09] sm:h-14 sm:text-lg"
        >
          Continue
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2 sm:gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        className="flex-1 rounded-2xl border-amber-300 bg-white text-amber-900 text-sm hover:border-[#E8920A] hover:bg-[#E8920A] hover:text-white sm:text-base"
      >
        Back
      </Button>
      {step < 3 ? (
        <Button
          type="button"
          onClick={onNextFromPassword}
          className="flex-1 rounded-2xl bg-[#E8920A] text-sm text-white hover:bg-[#cf7d09] sm:text-base"
        >
          Next
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onFinish}
          disabled={isSubmitting || !isLoaded}
          className="flex-1 rounded-2xl bg-[#E8920A] text-sm text-white hover:bg-[#cf7d09] sm:text-base"
        >
          {isSubmitting
            ? "Processing..."
            : awaitingEmailVerification
              ? "Verify & Start learning"
              : "Start learning"}
        </Button>
      )}
    </div>
  );
}

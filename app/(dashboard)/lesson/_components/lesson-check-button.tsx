interface LessonCheckButtonProps {
  disabled: boolean;
  onClick: () => void;
  onSkip?: () => void;
  // skip/reveal state
  skipped?: boolean;
  correctAnswer?: string;
  onContinue?: () => void;
  // teaching phase (just "Got it" / "Next")
  isTeaching?: boolean;
}

export function LessonCheckButton({
  disabled,
  onClick,
  onSkip,
  skipped,
  correctAnswer,
  onContinue,
  isTeaching,
}: LessonCheckButtonProps) {
  // Revealed correct answer after skip/wrong
  if (skipped && correctAnswer) {
    return (
      <div className="w-full px-4 sm:px-8 py-8 sm:py-10 border-t-4 border-[#FF4B4B] bg-[#FAD99A]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5 shrink-0">
            <span className="text-xs font-black tracking-widest uppercase text-[#FF4B4B]">
              Correct answer
            </span>
            <span className="text-lg font-black text-white">
              {correctAnswer}
            </span>
          </div>
          <button
            onClick={onContinue}
            className="w-full py-3.5 px-7 rounded-2xl font-black text-sm tracking-widest uppercase text-white active:scale-95 transition-all"
            style={{ background: "#FF4B4B", boxShadow: "0 4px 0 #991B1B" }}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (isTeaching) {
    return (
      <div className="w-full px-8 sm:px-16 md:px-32 lg:px-64 xl:px-128 py-8 sm:py-10 flex justify-end">
        <button
          onClick={onClick}
          className="py-3.5 px-20 rounded-2xl font-black text-sm w-[300px]tracking-widest uppercase text-white active:scale-95 transition-all "
          style={{ background: "#E8920A", boxShadow: "0 4px 10px #E8920A" }}
        >
          Got it
        </button>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-8 py-8 sm:py-10">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onSkip}
          className="shrink-0 min-w-24 py-3.5 px-6 rounded-2xl font-black text-sm tracking-widest uppercase border-2 border-[#374151] text-[#6B7280] hover:border-[#4B5563] hover:text-[#9CA3AF] transition-colors"
        >
          Skip
        </button>
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-full py-3.5 px-7 rounded-2xl font-black text-sm tracking-widest uppercase transition-all active:scale-95"
          style={{
            background: disabled ? "#374151" : "#58CC02",
            boxShadow: disabled ? "0 4px 0 #1F2937" : "0 4px 0 #3A8C01",
            cursor: disabled ? "not-allowed" : "pointer",
            color: disabled ? "#6B7280" : "#FFFFFF",
          }}
        >
          Check
        </button>
      </div>
    </div>
  );
}

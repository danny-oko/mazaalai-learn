interface LessonCheckButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export function LessonCheckButton({ disabled, onClick }: LessonCheckButtonProps) {
  return (
    <div className="px-5 pb-8">
      <button
        onClick={onClick}
        disabled={disabled}
        className="w-full py-4 rounded-2xl font-black text-sm tracking-widest uppercase text-white transition-all duration-200"
        style={{
          background: disabled ? "#cbd5e1" : "#0F5238",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        Check Answer
      </button>
    </div>
  );
}

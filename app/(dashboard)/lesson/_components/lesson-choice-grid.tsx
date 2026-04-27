interface LessonChoiceGridProps {
  choices: string[];
  selected: string | null;
  onSelect: (choice: string) => void;
}

export function LessonChoiceGrid({
  choices,
  selected,
  onSelect,
}: LessonChoiceGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {choices.map((choice) => {
        const isSelected = selected === choice;
        return (
          <button
            key={choice}
            onClick={() => onSelect(choice)}
            className="flex flex-col items-center justify-center py-6 rounded-2xl border-2 transition-all duration-150 bg-white"
            style={{
              borderColor: isSelected ? "#0F5238" : "#e2e8f0",
              background: isSelected ? "#f0faf5" : "white",
              boxShadow: isSelected
                ? "0 0 0 2px #0F523820"
                : "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <span className="text-4xl font-black text-slate-800">{choice[0]}</span>
            <span className="text-[11px] font-black tracking-widest uppercase text-slate-400 mt-1">
              {choice}
            </span>
          </button>
        );
      })}
    </div>
  );
}

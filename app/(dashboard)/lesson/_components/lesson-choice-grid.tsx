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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {choices.map((choice) => {
        const sel = selected === choice;
        return (
          <button
            key={choice}
            onClick={() => onSelect(choice)}
            className="flex flex-col items-center justify-center py-5 rounded-2xl border-2 transition-all duration-100 active:scale-95"
            style={{
              background: "#1A202C",
              borderColor: sel ? "#58CC02" : "#374151",
              boxShadow: sel ? "0 4px 0 #3A8C01" : "0 4px 0 #1F2937",
              color: sel ? "#58CC02" : "#FFFFFF",
            }}
          >
            <span className="text-3xl font-black">{choice}</span>
          </button>
        );
      })}
    </div>
  );
}

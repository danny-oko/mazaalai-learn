import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

interface LessonChoiceGridProps {
  // We want the raw array of strings here for the component to remain generic
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
    // Changed to grid-cols-1 because your text is long sentences
    <div
      className={`grid grid-cols-1 gap-4 w-full max-w-2xl mx-auto ${montserrat.className}`}
    >
      {choices.map((choice, index) => {
        const isSelected = selected === choice;

        return (
          <button
            key={`${index}-${choice}`}
            type="button"
            onClick={() => onSelect(choice)}
            className={`
              flex items-center gap-4 p-5 rounded-2xl border-2
              transition-all duration-100 active:scale-[0.98] text-left
              ${
                isSelected
                  ? "bg-[#1A202C] border-[#58CC02] text-[#58CC02] shadow-[0_4px_0_#3A8C01] -translate-y-[1px]"
                  : "bg-[#1A202C] border-[#374151] text-white shadow-[0_4px_0_#1F2937] hover:bg-[#2D3748]"
              }
            `}
          >
            {/* Index Badge */}
            <div
              className={`
              flex-shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center text-sm font-bold
              ${isSelected ? "border-[#58CC02] bg-[#58CC02]/10" : "border-[#374151] text-[#374151]"}
            `}
            >
              {index + 1}
            </div>

            {/* Answer Text */}
            <span className="text-lg font-semibold leading-snug">{choice}</span>
          </button>
        );
      })}
    </div>
  );
}

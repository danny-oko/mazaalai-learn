type DailyQuestCardProps = {
  label: string; // "Learn 5 characters"
  current: number; // 4
  target: number; // 5
  icon: "book" | "timer";
};

export default function DailyQuestCard({
  label,
  current,
  target,
  icon,
}: DailyQuestCardProps) {
  const percent = Math.round((current / target) * 100);

  return (
    <div className="bg-[#EDE8E0] rounded-2xl px-4 py-3 flex items-center gap-3">
      {/* Icon */}
      <div className="w-10 h-10 rounded-full bg-[#E8920A] flex items-center justify-center shrink-0">
        {icon === "book" ? (
          <span className="text-white text-base">📖</span>
        ) : (
          <span className="text-white text-base">⏱</span>
        )}
      </div>

      {/* Label + progress */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-medium text-[#1A1208]">{label}</span>
          <span className="text-sm font-semibold text-[#6B5E4A] ml-2 shrink-0">
            {current}/{target}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
          <div
            className="h-full bg-[#E8920A] rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

type Badge = {
  id: string;
  emoji: string;
  unlocked: boolean;
};

// Badge жагсаалт — өөрчилж болно
const badges: Badge[] = [
  { id: "1", emoji: "⭐", unlocked: true },
  { id: "2", emoji: "✨", unlocked: true },
  { id: "3", emoji: "🔥", unlocked: true },
  { id: "4", emoji: "🏅", unlocked: false },
  { id: "5", emoji: "🎉", unlocked: false },
  { id: "6", emoji: "⭐", unlocked: false },
  { id: "7", emoji: "✨", unlocked: false },
];

export default function AchievementSection() {
  const earned = badges.filter((b) => b.unlocked).length;
  const total = badges.length;

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold tracking-widest text-[#6B5E4A]">
          ACHIEVEMENTS
        </h3>
        <span className="text-xs text-[#A0917C] font-medium">
          Badges Earned: {earned} / {total}
        </span>
      </div>

      {/* Badge-ууд хэвтээ scroll */}
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`
              w-16 h-16 rounded-full flex items-center justify-center shrink-0
              text-2xl relative
              ${badge.unlocked ? "bg-[#EDE8E0]" : "bg-[#EDE8E0] opacity-40"}
            `}
          >
            {badge.emoji}

            {/* Түгжээ дүрс — unlocked биш бол */}
            {!badge.unlocked && (
              <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-[#EDE8E0] border border-[#E8E0D0] rounded-full flex items-center justify-center">
                <span className="text-[8px]">🔒</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

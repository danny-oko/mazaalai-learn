type Badge = {
  id: string;
  emoji: string;
  unlocked: boolean;
};

const badges: Badge[] = [
  { id: "1", emoji: "⭐", unlocked: true },
  { id: "2", emoji: "✨", unlocked: true },
  { id: "3", emoji: "🔥", unlocked: true },
  { id: "4", emoji: "🏅", unlocked: false },
  { id: "5", emoji: "🎉", unlocked: false },
  { id: "6", emoji: "⭐", unlocked: false },
  { id: "7", emoji: "✨", unlocked: false },
];

export default function WebAchievementSection() {
  const earned = badges.filter((b) => b.unlocked).length;
  const total = badges.length;

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold tracking-widest text-[#6B5E4A]">
          ACHIEVEMENTS
        </h3>
        <span className="text-xs text-[#A0917C] font-medium">
          Badges Earned: {earned} / {total}
        </span>
      </div>

      {/* Badge-ууд — scroll биш grid */}
      <div className="grid grid-cols-4 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`
              flex flex-col items-center gap-2
              ${!badge.unlocked ? "opacity-40" : ""}
            `}
          >
            {/* Badge дугуй */}
            <div className="w-16 h-16 rounded-full bg-[#EDE8E0] flex items-center justify-center text-2xl relative">
              {badge.emoji}
              {!badge.unlocked && (
                <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-[#EDE8E0] border border-[#E8E0D0] rounded-full flex items-center justify-center">
                  <span className="text-[8px]">🔒</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

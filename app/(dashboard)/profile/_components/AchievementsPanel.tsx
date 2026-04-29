import { ProfileBadge } from "../common/types";

type AchievementsPanelProps = {
  badges: ProfileBadge[];
};

export default function AchievementsPanel({ badges }: AchievementsPanelProps) {
  const unlockedCount = badges.filter((badge) => badge.unlocked).length;

  return (
    <section className="rounded-2xl border border-[#e6dece] bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a806f]">
          Achievements
        </h2>
        <p className="text-sm font-semibold text-[#8a806f]">
          {unlockedCount}/{badges.length} earned
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {badges.map((badge) => (
          <div key={badge.id} className="flex flex-col items-center gap-1 text-center">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl border text-xl ${
                badge.unlocked
                  ? "border-[#e8ddcb] bg-[#fbf6ec]"
                  : "border-[#eee8dc] bg-[#f7f3eb] opacity-45"
              }`}
            >
              {badge.icon}
            </div>
            <p className="line-clamp-1 text-[11px] font-medium text-[#7d7364]">
              {badge.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

interface League {
  label: string;
  status: "done" | "current" | "locked";
  icon: string;
  xpRequired?: number;
}

const LEAGUES: League[] = [
  { label: "Bronze Mesa", status: "done", icon: "🥉" },
  { label: "Silver Steppe", status: "current", icon: "⭐" },
  { label: "Gold Steppe", status: "locked", icon: "🥇", xpRequired: 260 },
  { label: "Platinum Sky", status: "locked", icon: "💎" },
  { label: "Diamond Gobi", status: "locked", icon: "🔷" },
];

const STATUS_STYLES = {
  done: {
    bg: "bg-[#F0FFF0]",
    border: "border-green-200",
    badge: "bg-green-100 text-green-600",
    label: "Done",
  },
  current: {
    bg: "bg-[#FFF8EE]",
    border: "border-[#E8940A]",
    badge: "bg-[#E8940A] text-white",
    label: "Current",
  },
  locked: {
    bg: "bg-white",
    border: "border-[#E8D9C0]",
    badge: "bg-[#F4EFE8] text-[#999]",
    label: "Locked",
  },
};

export default function WebLeaguePath() {
  return (
    <div className="bg-white rounded-2xl border border-[#E8D9C0] p-5">
      {/* Гарчиг */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-[#999] uppercase tracking-wide">
          Your League Path
        </p>
        <p className="text-xs text-[#E8940A] font-medium cursor-pointer hover:underline">
          4 more to unlock
        </p>
      </div>

      <p className="text-sm font-semibold text-[#222] mb-3">Leagues</p>

      <div className="flex flex-col gap-2">
        {LEAGUES.map((league) => {
          const style = STATUS_STYLES[league.status];
          return (
            <div
              key={league.label}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${style.bg} ${style.border}`}
            >
              <span className="text-lg">{league.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#222]">
                  {league.label}
                </p>
                {league.xpRequired && league.status === "locked" && (
                  <p className="text-[10px] text-[#999]">
                    {league.xpRequired} XP needed
                  </p>
                )}
              </div>
              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${style.badge}`}
              >
                {style.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

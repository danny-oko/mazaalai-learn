// Inside LeagueProgression.tsx
export default function WebLeaguePath({ userXp = 0 }: { userXp: number }) {
  // We use your RANK_TIERS directly here
  const RANK_TIERS = [
    { minXp: 0, label: "Начин", icon: "🦅" },
    { minXp: 350, label: "Харцага", icon: "🦅" },
    { minXp: 560, label: "Заан", icon: "🐘" },
    { minXp: 1000, label: "Гарьд", icon: "🦅" },
    { minXp: 1560, label: "Арслан", icon: "🦁" },
    { minXp: 1920, label: "Аварга", icon: "🏆" },
    { minXp: 2550, label: "Даян Аварга", icon: "🔥" },
    { minXp: 3700, label: "Дархан Аварга", icon: "👑" },
  ];

  const getStatus = (tierXp: number, index: number) => {
    const nextTier = RANK_TIERS[index + 1];
    if (userXp >= (nextTier?.minXp ?? Infinity)) return "done";
    if (userXp >= tierXp) return "current";
    return "locked";
  };

  return (
    <div className="rounded-2xl border-3 border-[#E5E5E5] bg-white p-5 shadow-sm dark:bg-transparent dark:border-[#37464f]">
      <h3 className="mb-5 border-b border-[#ECE7DE] px-1 pb-3 text-sm font-bold text-[#1C2B4A] dark:border-[#37464f] dark:text-[#f0f4f5]">
        Цолны нэршил
      </h3>

      <div className="space-y-1">
        {RANK_TIERS.map((rank, index) => {
          const status = getStatus(rank.minXp, index);
          const isCurrent = status === "current";
          const isLocked = status === "locked";

          return (
            <div
              key={rank.label}
              className="relative flex items-center gap-3 p-2 group"
            >
              {index !== RANK_TIERS.length - 1 && (
                <div className="absolute left-[23px] top-10 h-6 w-px bg-[#ECE7DE] dark:border-[#2d3a42]" />
              )}

              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all z-10 ${
                  isCurrent
                    ? "scale-110 border-[#E8920A] bg-[#FFF8EE] dark:border-[#ffad33] dark:bg-[#2d271b] dark:shadow-[0_0_15px_rgba(255,173,51,0.3)]"
                    : isLocked
                      ? "bg-gray-50 border-gray-100 grayscale dark:bg-[#1a2124] dark:border-[#252f35] dark:opacity-50"
                      : "border-[#BFE3D8] bg-[#ECF8F4] dark:border-[#2E8B6F] dark:bg-[#132a24]"
                }`}
              >
                <span className="text-sm">{isLocked ? "🔒" : rank.icon}</span>
              </div>

              <div className="flex-1">
                <p
                  className={`text-xs font-bold ${isLocked ? "text-gray-400 dark:text-[#52606b]" : "text-[#1C2B4A] dark:text-[#f0f4f5]"}`}
                >
                  {rank.label}
                </p>
                {isCurrent && (
                  <p className="text-[10px] font-medium text-[#E8920A] dark:text-[#ffad33]">
                    Дараагийн цол хүртэл {RANK_TIERS[index + 1]?.minXp - userXp}{" "}
                    XP
                  </p>
                )}
              </div>

              {status === "done" && (
                <span className="text-[10px] font-bold text-[#2E8B6F] dark:text-[#4ade80]">
                  ✓
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Toggle button not working properly yet//

"use client";

export type LeaderboardPeriod = "weekly" | "all-time";

type Props = {
  value: LeaderboardPeriod;
  onChange: (v: LeaderboardPeriod) => void;
};

export function LeaderboardPeriodToggle({ value, onChange }: Props) {
  return (
    <div
      className="inline-flex rounded-full bg-[#E8DFC8]/45 p-1"
      role="group"
      aria-label="Leaderboard period"
    >
      <button
        type="button"
        onClick={() => onChange("weekly")}
        className={
          "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 " +
          (value === "weekly"
            ? "bg-[#FEFAE8] text-[#1B4332] shadow-md"
            : "text-[#1B4332]/70 hover:text-[#1B4332]")
        }
      >
        Weekly
      </button>
      <button
        type="button"
        onClick={() => onChange("all-time")}
        className={
          "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 " +
          (value === "all-time"
            ? "bg-[#FEFAE8] text-[#1B4332] shadow-md"
            : "text-[#1B4332]/70 hover:text-[#1B4332]")
        }
      >
        All-time
      </button>
    </div>
  );
}

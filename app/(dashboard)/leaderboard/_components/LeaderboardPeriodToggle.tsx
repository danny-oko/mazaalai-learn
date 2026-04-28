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
      className="inline-flex rounded-full bg-[#E8E1D3] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] ring-1 ring-[#DDD4C2]"
      role="group"
      aria-label="Leaderboard period"
    >
      <button
        type="button"
        onClick={() => onChange("weekly")}
        className={
          "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 " +
          (value === "weekly"
            ? "bg-[#E8920A] text-[#1C2B4A] shadow-[0_6px_14px_rgba(232,146,10,0.35)]"
            : "text-[#6A758B] hover:bg-[#F1EADD] hover:text-[#1C2B4A] active:scale-[0.98]")
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
            ? "bg-[#E8920A] text-[#1C2B4A] shadow-[0_6px_14px_rgba(232,146,10,0.35)]"
            : "text-[#6A758B] hover:bg-[#F1EADD] hover:text-[#1C2B4A] active:scale-[0.98]")
        }
      >
        All-time
      </button>
    </div>
  );
}

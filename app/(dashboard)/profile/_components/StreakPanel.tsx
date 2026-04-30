import { Flame } from "lucide-react";

import { StreakInfo } from "../common/types";

type StreakPanelProps = {
  streak: StreakInfo;
};

export default function StreakPanel({ streak }: StreakPanelProps) {
  return (
    <section className="rounded-2xl border border-[#e6dece] bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a806f]">
        Streak
      </p>
      <p className="mt-2 text-sm font-semibold text-[#7e7463]">Current streak</p>
      <p className="flex items-center gap-2 text-5xl font-extrabold leading-none text-[#d18d1f]">
        <Flame className="size-10 shrink-0" strokeWidth={2} aria-hidden />
        {streak.current}
      </p>
      <p className="mt-1 text-sm text-[#7d7364]">days · Best: {streak.best}</p>
      <div className="mt-3 grid grid-cols-7 gap-1.5">
        {streak.days.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className={`rounded-full py-1 text-center text-[10px] font-bold ${
              index < 5
                ? "bg-[#e4a325] text-white"
                : "bg-[#f2ece0] text-[#9a907f]"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-3 w-full rounded-xl border border-[#d8e2f2] bg-[#ebf3ff] px-3 py-2 text-sm font-semibold text-[#4d6e96]"
      >
        Use Streak Freeze ({streak.frozenCount} left)
      </button>
    </section>
  );
}

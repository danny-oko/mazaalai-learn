import { Flame } from "lucide-react";

import { ProfileUser } from "../common/types";

type ProfileSummaryStatsProps = {
  user: ProfileUser;
};

export default function ProfileSummaryStats({ user }: ProfileSummaryStatsProps) {
  const stats = [
    { label: "Total XP", value: user.totalXp.toLocaleString() },
    { label: "League", value: `#${user.leaguePosition}` },
    { label: "Streak", value: user.streakCount.toString() },
    { label: "Badges", value: user.badgeCount.toString() },
  ];

  return (
    <section className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[#e6dece] bg-white md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border-b border-r border-[#f2ecdf] p-4 text-center md:border-b-0 [&:nth-child(2n)]:border-r-0 md:[&:nth-child(2)]:border-r md:[&:nth-child(4)]:border-r-0"
        >
          <p className="flex items-center justify-center gap-1.5 text-3xl font-extrabold leading-none text-[#1f1c18]">
            {stat.label === "Streak" ? (
              <>
                <Flame
                  className="size-7 shrink-0 text-[#d18d1f]"
                  strokeWidth={2.25}
                  aria-hidden
                />
                {stat.value}
              </>
            ) : (
              stat.value
            )}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#8a806f]">
            {stat.label}
          </p>
        </div>
      ))}
    </section>
  );
}

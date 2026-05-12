import { mnProfile } from "@/lib/i18n/mn-profile";

import { ProfileUser } from "../common/types";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type LeaguePanelProps = {
  league: ProfileUser["league"];
};

export default function LeaguePanel({ league }: LeaguePanelProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDarkMode = mounted && resolvedTheme === "dark";

  return (
    <section className="overflow-hidden rounded-3xl border border-[#c9d4ee] bg-white shadow-sm">
      <div className="relative bg-gradient-to-br from-[#1d2b55] via-[#243a6e] to-[#1a2748] px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8ecfb]">
          {league.name}
        </p>
        <p className="mt-1 text-xs text-[#b8c4e8]">{league.resetInText}</p>
      </div>

      <div className="divide-y divide-[#efe8db] dark:divide-[#252f35]">
        {league.entries.map((entry) => (
          <div
            key={`${entry.rank}-${entry.name}`}
            className={`flex items-center justify-between px-4 py-3 text-sm transition-colors ${
              entry.isCurrentUser
                ? "bg-[#fff7e5]"
                : "bg-white hover:bg-[#fffefb]"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-4 text-[#8a806f] dark:text-[#64748b]">
                {entry.rank}
              </span>
              <div className="flex items-center">
                <p className="font-semibold text-[#27221d] dark:text-[#f8fafc]">
                  {entry.name}
                </p>
                {entry.isCurrentUser ? (
                  <span className="ml-1 rounded-full bg-[#e9a732] px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {mnProfile.leagueYou}
                  </span>
                ) : null}
              </div>
            </div>
            <span className="font-bold text-[#4d4337]">
              {entry.xp.toLocaleString()}
              {mnProfile.leagueXpSuffix}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

import { ProfileUser } from "../common/types";

type LeaguePanelProps = {
  league: ProfileUser["league"];
};

export default function LeaguePanel({ league }: LeaguePanelProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#e6dece] bg-white">
      <div className="bg-[#1d2b55] px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4ddf3]">
          {league.name}
        </p>
        <p className="mt-1 text-xs text-[#aeb8d6]">{league.resetInText}</p>
      </div>
      <div className="divide-y divide-[#efe8db]">
        {league.entries.map((entry) => (
          <div
            key={`${entry.rank}-${entry.name}`}
            className={`flex items-center justify-between px-4 py-3 text-sm ${
              entry.isCurrentUser ? "bg-[#fff7e5]" : "bg-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-4 text-[#8a806f]">{entry.rank}</span>
              <p className="font-semibold text-[#27221d]">
                {entry.name}
                {entry.isCurrentUser ? (
                  <span className="ml-1 rounded-full bg-[#e9a732] px-1.5 py-0.5 text-[10px] font-bold text-white">
                    You
                  </span>
                ) : null}
              </p>
            </div>
            <span className="font-bold text-[#4d4337]">{entry.xp.toLocaleString()} XP</span>
          </div>
        ))}
      </div>
    </section>
  );
}

import { DailyChallenge } from "../common/types";

type DailyChallengesPanelProps = {
  challenges: DailyChallenge[];
};

export default function DailyChallengesPanel({
  challenges,
}: DailyChallengesPanelProps) {
  return (
    <section className="rounded-2xl border border-[#e6dece] bg-white p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a806f]">
          Daily Quests
        </h2>
        <span className="text-xs text-[#8a806f]">Resets in 11h 23m</span>
      </div>
      <div className="space-y-3">
        {challenges.map((challenge) => (
          <article
            key={challenge.id}
            className="rounded-xl border border-[#efe8db] bg-[#faf7f1] p-3"
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-[#27221d]">
                  {challenge.title}
                </h3>
                <p className="text-xs text-[#7d7364]">{challenge.subtitle}</p>
              </div>
              {challenge.done ? (
                <span className="rounded-full bg-[#e1f3e7] px-2 py-1 text-xs font-semibold text-[#27834e]">
                  Done!
                </span>
              ) : (
                <span className="rounded-full bg-[#ffeac8] px-2 py-1 text-xs font-semibold text-[#8b6020]">
                  +{challenge.xpReward ?? 0} XP
                </span>
              )}
            </div>
            <div className="mb-1 h-1.5 rounded-full bg-[#e8e0d1]">
              <div
                className="h-1.5 rounded-full bg-[#27956a]"
                style={{ width: `${challenge.progressPercent}%` }}
              />
            </div>
            <p className="text-right text-xs font-semibold text-[#6f6556]">
              {challenge.progressText}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

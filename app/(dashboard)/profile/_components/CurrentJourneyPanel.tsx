import { JourneyProgress } from "../common/types";

type CurrentJourneyPanelProps = {
  journey: JourneyProgress;
};

export default function CurrentJourneyPanel({ journey }: CurrentJourneyPanelProps) {
  return (
    <section className="rounded-2xl border border-[#e6dece] bg-white p-4 md:p-5">
      <div className="mb-2 flex items-center justify-between">
        <span className="rounded-full bg-[#f5ecda] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#8c6e2f]">
          {journey.moduleLabel}
        </span>
        <span className="text-sm font-semibold text-[#7e7463]">
          {journey.lessonProgressText}
        </span>
      </div>
      <h2 className="text-3xl font-extrabold text-[#27221d]">{journey.title}</h2>
      <p className="mt-1 text-sm text-[#756c5e]">{journey.description}</p>
      <div className="mt-4 h-2 rounded-full bg-[#e9e2d5]">
        <div
          className="h-2 rounded-full bg-[#e3a52f]"
          style={{ width: `${journey.completionPercent}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-sm font-semibold text-[#6e6556]">
        <span>{journey.lessonsLeftText}</span>
        <span>{journey.completionPercent}%</span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-[#efe8db] bg-[#faf7f1] p-3">
          <p className="text-xs font-bold uppercase tracking-wider text-[#8a806f]">
            Learn Characters
          </p>
          <p className="mt-1 text-lg font-bold text-[#27221d]">
            {journey.characterProgressText}
          </p>
        </div>
        <div className="rounded-xl border border-[#efe8db] bg-[#faf7f1] p-3">
          <p className="text-xs font-bold uppercase tracking-wider text-[#8a806f]">
            Practice Time
          </p>
          <p className="mt-1 text-lg font-bold text-[#27221d]">
            {journey.practiceProgressText}
          </p>
        </div>
      </div>
    </section>
  );
}

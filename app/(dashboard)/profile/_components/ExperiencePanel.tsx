import { ExperienceInfo } from "../common/types";

type ExperiencePanelProps = {
  experience: ExperienceInfo;
};

export default function ExperiencePanel({ experience }: ExperiencePanelProps) {
  const percent = Math.max(
    0,
    Math.min(100, (experience.currentXp / experience.nextLevelXp) * 100),
  );

  return (
    <section className="rounded-2xl border border-[#e6dece] bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a806f]">
        Experience
      </p>
      <p className="mt-2 text-4xl font-extrabold text-[#1f1c18]">
        {experience.currentXp.toLocaleString()}
        <span className="ml-1 text-lg text-[#8a806f]">XP</span>
      </p>
      <p className="text-sm font-medium text-[#7c7263]">
        Level {experience.currentLevel}
      </p>
      <div className="mt-3 h-2 rounded-full bg-[#e8e0d1]">
        <div className="h-2 rounded-full bg-[#4a8ec5]" style={{ width: `${percent}%` }} />
      </div>
      <div className="mt-1 flex justify-between text-xs text-[#8a806f]">
        <span>{experience.currentXp.toLocaleString()}</span>
        <span>{experience.nextLevelXp.toLocaleString()}</span>
      </div>
    </section>
  );
}

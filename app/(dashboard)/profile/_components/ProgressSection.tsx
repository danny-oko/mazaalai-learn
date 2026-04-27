import DailyQuestCard from "./DailyQuestCard";

type ProgressSectionProps = {
  moduleTitle: string; // "Basics 1"
  totalLessons: number; // 12
  completedLessons: number; // 8
  progress: number; // 65
};

export default function ProgressSection({
  moduleTitle,
  totalLessons,
  completedLessons,
  progress,
}: ProgressSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Section label */}
      <h3 className="text-xs font-bold tracking-widest text-[#6B5E4A]">
        YOUR JOURNEY
      </h3>

      {/* Amber module card */}
      <div className="bg-[#E8920A] rounded-2xl p-5 relative overflow-hidden">
        {/* Арын дугуй чимэглэл */}
        <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-8 right-10 w-20 h-20 rounded-full bg-white/5 pointer-events-none" />

        {/* Top row */}
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs font-bold tracking-widest text-white/75">
            CURRENT MODULE
          </p>
          <div className="bg-white/20 rounded-full px-3 py-1">
            <span className="text-xs font-semibold text-white">
              {completedLessons}/{totalLessons} Lessons
            </span>
          </div>
        </div>

        {/* Module нэр */}
        <h2 className="text-2xl font-bold text-white mb-4">{moduleTitle}</h2>

        {/* Progress */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/90 font-medium">Progress</span>
          <span className="text-sm text-white font-bold">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/25 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Daily quests */}
      <DailyQuestCard
        label="Learn 5 characters"
        current={4}
        target={5}
        icon="book"
      />
      <DailyQuestCard
        label="Practice for 10 mins"
        current={4}
        target={10}
        icon="timer"
      />
    </div>
  );
}

import DailyQuestCard from "./DailyQuestCard";

type WebProgressSectionProps = {
  moduleTitle: string;
  totalLessons: number;
  completedLessons: number;
  progress: number;
};

export default function WebProgressSection({
  moduleTitle,
  totalLessons,
  completedLessons,
  progress,
}: WebProgressSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Section label */}
      <h3 className="text-xs font-bold tracking-widest text-[#6B5E4A]">
        YOUR JOURNEY
      </h3>

      {/* Module карт — утаснаас том */}
      <div className="bg-[#E8920A] rounded-2xl p-7 relative overflow-hidden">
        {/* Арын чимэглэл */}
        <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-10 right-14 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />

        {/* Top row */}
        <div className="flex justify-between items-start mb-3">
          <p className="text-xs font-bold tracking-widest text-white/75">
            CURRENT MODULE
          </p>
          <div className="bg-white/20 rounded-full px-4 py-1.5">
            <span className="text-sm font-semibold text-white">
              {completedLessons}/{totalLessons} Lessons
            </span>
          </div>
        </div>

        {/* Module нэр */}
        <h2 className="text-3xl font-bold text-white mb-6">{moduleTitle}</h2>

        {/* Progress */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/90 font-medium">Progress</span>
          <span className="text-sm text-white font-bold">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-white/25 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Daily quests — хоёр карт хажуу хажуугаар */}
      <div className="grid grid-cols-2 gap-3">
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
    </div>
  );
}

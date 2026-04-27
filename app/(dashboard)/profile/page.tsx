import AchievementSection from "./_components/AchievementSection";
import ProgressSection from "./_components/ProgressSection";
import SettingsSection from "./_components/SettingsSection";
import UserHeaderCard from "./_components/UserHeaderCard";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#F4EFE8] flex flex-col items-center">
      <div className="w-full max-w-sm px-5 pt-6 pb-28 flex flex-col gap-6">
        <UserHeaderCard
          name="Batu"
          username="nomad_batu"
          avatarUrl=""
          rank="SILVER STEPPE"
          xp={1240}
          leaguePosition={1}
          streak={12}
        />

        <ProgressSection
          moduleTitle="Basics 1"
          totalLessons={12}
          completedLessons={8}
          progress={65}
        />

        <AchievementSection />

        <SettingsSection />
      </div>
    </div>
  );
}

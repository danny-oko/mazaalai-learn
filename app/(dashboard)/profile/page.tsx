import AchievementSection from "./_components/AchievementSection";
import ProgressSection from "./_components/ProgressSection";
import SettingsSection from "./_components/SettingsSection";
import UserHeaderCard from "./_components/UserHeaderCard";
import WebAchievementSection from "./_components/WebAchievementSection";
import WebProgressSection from "./_components/WebProgressSection";
import WebSettingsSection from "./_components/WebSettingsSection";
import WebUserHeaderCard from "./_components/WebUserHeaderCard";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#F4EFE8] pb-28 md:pb-10 md:pl-60 lg:pl-70 xl:pl-100">
      {/* УТАС — md-с дээш нуугдана */}
      <div className="md:hidden flex flex-col items-center">
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

      {/* ВЭБ — md-с доош нуугдана */}
      <div className="hidden md:flex flex-col items-center">
        <div className="w-full max-w-4xl px-8 pt-8 pb-16 flex flex-col gap-6">
          <WebUserHeaderCard
            name="Batu"
            username="nomad_batu"
            avatarUrl=""
            rank="SILVER STEPPE"
            xp={1240}
            leaguePosition={1}
            streak={12}
          />
          <WebProgressSection
            moduleTitle="Basics 1"
            totalLessons={12}
            completedLessons={8}
            progress={65}
          />
          <WebAchievementSection />
          <WebSettingsSection />
        </div>
      </div>
    </div>
  );
}

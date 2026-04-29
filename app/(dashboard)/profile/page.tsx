import AchievementsPanel from "./_components/AchievementsPanel";
import CurrentJourneyPanel from "./_components/CurrentJourneyPanel";
import DailyChallengesPanel from "./_components/DailyChallengesPanel";
import ExperiencePanel from "./_components/ExperiencePanel";
import LeaguePanel from "./_components/LeaguePanel";
import ProfileSummaryStats from "./_components/ProfileSummaryStats";
import ProfileTabs from "./_components/ProfileTabs";
import ProfileTopHeader from "./_components/ProfileTopHeader";
import SettingsPanel from "./_components/SettingsPanel";
import StreakPanel from "./_components/StreakPanel";
import type { ProfileUser } from "./common/types";
import mockUser from "./data/mock-user.json";

export default function ProfilePage() {
  const currentUser = mockUser as ProfileUser;

  return (
    <div className="min-h-screen bg-[#f4efe5] pb-24 md:pb-10 md:pl-60 lg:pl-70 xl:pl-100">
      <div className="mx-auto flex w-full max-w-[1220px] flex-col gap-4 px-4 pt-5 md:gap-5 md:px-6 md:pt-8">
        <ProfileTopHeader user={currentUser} />
        <ProfileSummaryStats user={currentUser} />
        <ProfileTabs activeTab={currentUser.activeTab} />
      </div>

      <div className="mx-auto mt-4 grid w-full max-w-[1220px] gap-4 px-4 md:mt-5 md:grid-cols-[minmax(0,1fr)_320px] md:gap-5 md:px-6">
        <main className="space-y-4 md:space-y-5">
          <DailyChallengesPanel challenges={currentUser.dailyChallenges} />
          <CurrentJourneyPanel journey={currentUser.journey} />
        </main>

        <aside className="space-y-4 md:space-y-5">
          <StreakPanel streak={currentUser.streak} />
          <ExperiencePanel experience={currentUser.experience} />
          <LeaguePanel league={currentUser.league} />
          <AchievementsPanel badges={currentUser.badges} />
          <SettingsPanel settings={currentUser.settings} />
        </aside>
      </div>

      <div className="h-8" />
    </div>
  );
}

import AchievementsPanel from "./_components/AchievementsPanel";
import { AppearanceToggle } from "./_components/AppearanceToggle";
import CurrentJourneyPanel from "./_components/CurrentJourneyPanel";
import DailyChallengesPanel from "./_components/DailyChallengesPanel";
import ExperiencePanel from "./_components/ExperiencePanel";
import LeaguePanel from "./_components/LeaguePanel";
import { NotificationsPreference } from "./_components/NotificationsPreference";
import { ProfileAccountForm } from "./_components/ProfileAccountForm";
import { ProfileHelpSection } from "./_components/ProfileHelpSection";
import ProfileSummaryStats from "./_components/ProfileSummaryStats";
import ProfileTabs from "./_components/ProfileTabs";
import ProfileTopHeader from "./_components/ProfileTopHeader";
import SettingsPanel from "./_components/SettingsPanel";
import StreakPanel from "./_components/StreakPanel";
import { redirect } from "next/navigation";
import type { ProfileTab, ProfileUser } from "./common/types";
import prisma from "@/lib/prisma";
import { buildProfileUser } from "@/lib/server/build-profile-user";
import { getCurrentAppUser } from "@/lib/server/get-current-app-user";

const VALID_TABS: ProfileTab[] = [
  "overview",
  "achievements",
  "stats",
  "settings",
];

function parseTab(tab: string | undefined): ProfileTab {
  if (tab && VALID_TABS.includes(tab as ProfileTab)) {
    return tab as ProfileTab;
  }
  return "overview";
}

export default async function ProfilePage({
  searchParams,
}: {
  searchParams?: Promise<{ tab?: string }>;
}) {
  const q = searchParams ? await searchParams : {};
  const activeTab = parseTab(q.tab);

  const appUser = await getCurrentAppUser();
  if (!appUser) {
    redirect("/sign-in");
  }
  const usersAbove = await prisma.user.count({
    where: { totalXp: { gt: appUser.totalXp } },
  });
  const leaguePosition = usersAbove + 1;

  const profile = await buildProfileUser(appUser, leaguePosition);
  const currentUser: ProfileUser = { ...profile, activeTab };

  return (
    <div className="min-h-screen bg-[#FFF8E7] pb-24 text-[#3b2f2f] md:pb-10">
      <div className="mx-auto w-full max-w-305 px-4 pt-5 md:px-6 md:pt-8">
        <div className="flex flex-col gap-4 md:gap-5">
          <ProfileTopHeader user={currentUser} />
          <ProfileSummaryStats user={currentUser} />
          <ProfileTabs activeTab={activeTab} />

          {activeTab === "overview" && (
            <div className="grid w-full gap-4 md:grid-cols-[minmax(0,1fr)_320px] md:gap-5">
              <main className="min-w-0 space-y-4 md:space-y-5">
                <DailyChallengesPanel
                  challenges={currentUser.dailyChallenges}
                />
                <CurrentJourneyPanel journey={currentUser.journey} />
              </main>

              <aside className="min-w-0 space-y-4 md:space-y-5">
                <StreakPanel streak={currentUser.streak} />
                <ExperiencePanel experience={currentUser.experience} />
                <LeaguePanel league={currentUser.league} />
                <AchievementsPanel badges={currentUser.badges} />
                <SettingsPanel settings={currentUser.settings} />
              </aside>
            </div>
          )}

          {activeTab === "achievements" && (
            <div className="space-y-4 md:space-y-5">
              <AchievementsPanel badges={currentUser.badges} />
            </div>
          )}

          {activeTab === "stats" && (
            <div className="space-y-4 md:space-y-5">
              <ProfileSummaryStats user={currentUser} />
              <div className="grid gap-4 md:grid-cols-2 md:gap-5">
                <StreakPanel streak={currentUser.streak} />
                <ExperiencePanel experience={currentUser.experience} />
              </div>
              <LeaguePanel league={currentUser.league} />
              <section className="rounded-2xl border border-[#e6dece] bg-white p-4 md:p-5">
                <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8a806f]">
                  Weekly activity
                </h2>
                <p className="text-sm text-[#706552]">
                  <span className="font-semibold text-[#433c31]">
                    {currentUser.weeklyStats.xpThisWeek.toLocaleString()} XP
                  </span>{" "}
                  this week · Active{" "}
                  <span className="font-semibold">
                    {currentUser.weeklyStats.daysThisWeek}
                  </span>{" "}
                  days
                </p>
              </section>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
              <ProfileAccountForm
                initialName={appUser.name ?? ""}
                initialUserName={appUser.userName}
                initialAvatarUrl={appUser.avatarUrl ?? ""}
              />
              <AppearanceToggle />
              <NotificationsPreference />
              <ProfileHelpSection />
              <SettingsPanel settings={currentUser.settings} />
            </div>
          )}
        </div>
        <div className="h-8" />
      </div>
    </div>
  );
}

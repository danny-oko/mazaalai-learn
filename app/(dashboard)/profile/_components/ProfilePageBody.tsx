import { Suspense } from "react";

import { MainLayout } from "@/components/layout/MainLayout";
import { getCurrentAppUser } from "@/lib/server/get-current-app-user";
import { redirect } from "next/navigation";

import type { ProfileTab } from "../common/types";
import ProfileAsideLessonProgressWrapper from "./ProfileAsideLessonProgressWrapper";
import ProfileAsideNearbyPlayersWrapper from "./ProfileAsideNearbyPlayersWrapper";
import {
  ProfileLessonProgressCardSkeleton,
  ProfileNearbyPlayersSkeleton,
} from "./ProfileAsideSkeletons";
import ProfileMainColumn from "./ProfileMainColumn";
import ProfileMainColumnSkeleton from "./ProfileMainColumnSkeleton";

type ProfilePageBodyProps = {
  activeTab: ProfileTab;
};

export default async function ProfilePageBody({
  activeTab,
}: ProfilePageBodyProps) {
  const appUser = await getCurrentAppUser();
  if (!appUser) {
    redirect("/sign-in");
  }

  const dashboard = await fetchProfileDashboardData(
    appUser.id,
    appUser.totalXp,
  );
  const profile = buildProfileUserFromData(appUser, dashboard);
  const currentUser: ProfileUser = { ...profile, activeTab };

  const nextLesson =
    dashboard.inProgressLesson?.lesson ?? dashboard.firstLesson;
  const nextLessonHref = nextLesson
    ? `/lesson/${nextLesson.id}`
    : "/dictionary";
  const nextLessonTitle = nextLesson?.title ?? mnProfile.exploreDictionary;

  // Энд (entry: any) гэж нэмсэн нь улаан зураасыг арилгаж, өгөгдлийг чөлөөтэй авах боломж олгоно
  const nearbyPlayers = currentUser.league.entries
    .slice(0, 5)
    .map((entry: any) => ({
      id: `${entry.rank}-${entry.name}`,
      rank: entry.rank,
      name: entry.name,
      xp: entry.xp,
      xpChange: entry.xpChange || 0,
      avatarUrl: entry.avatarUrl || null,
      isMe: Boolean(entry.isCurrentUser),
    }));

  const profileAside = (
    <div className="flex flex-col gap-y-4">
      <LessonProgressCard
        completedLessons={currentUser.completedLessonsCount}
        totalLessons={dashboard.totalLessonsCount}
        nextLessonHref={nextLessonHref}
        nextLessonTitle={nextLessonTitle}
      />
      <WebNearbyPlayers players={nearbyPlayers} />
    </div>
  );

  return (
    <MainLayout aside={profileAside}>
      {/* w-full нэмж, агуулгыг баруун талын багана руу шахахаас сэргийлэв */}
      <div className="flex flex-col gap-y-6 w-full max-w-4xl">
        <ProfileHero
          name={currentUser.name}
          username={currentUser.username}
          memberSince={currentUser.memberSince}
          avatarUrl={currentUser.avatarUrl}
          avatarInitial={currentUser.avatarInitial}
          rankTitle={currentUser.rankTitle}
          language={currentUser.language}
        />
        <ProfileSummaryStats user={currentUser} />
        <ProfileTabsSection initialTab={activeTab} currentUser={currentUser} />
      </div>
    </MainLayout>
  const displayName = appUser.name ?? appUser.userName;

  const profileAside = (
    <>
      <Suspense fallback={<ProfileLessonProgressCardSkeleton />}>
        <ProfileAsideLessonProgressWrapper userId={appUser.id} />
      </Suspense>
      <Suspense fallback={<ProfileNearbyPlayersSkeleton />}>
        <ProfileAsideNearbyPlayersWrapper
          userId={appUser.id}
          totalXp={appUser.totalXp}
          displayName={displayName}
        />
      </Suspense>
    </>
  );

  return (
    <div className="profile-page-shell min-h-screen overflow-x-hidden bg-transparent pb-24 text-[#3b2f2f] md:pb-10 dark:text-[#d8d2c4]">
      <MainLayout aside={profileAside}>
        <Suspense fallback={<ProfileMainColumnSkeleton />}>
          <ProfileMainColumn activeTab={activeTab} appUser={appUser} />
        </Suspense>
      </MainLayout>
    </div>
  );
}

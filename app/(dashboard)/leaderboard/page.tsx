import prisma from "@/lib/prisma";
import { getRankNameFromXp } from "@/lib/utils/getRankNameFromXp";
import PodiumSection from "./_components/PodiumSection";
import LeaderboardList from "./_components/LeaderboardList";
import WebPodiumSection from "./_components/WebPodiumSection";
import WebLeaderboardList from "./_components/WebLeaderboardList";
import WebStandingCard from "./_components/UserRankSummary";
import WebThisWeekCard from "./_components/WeeklyStatsCard";
import WebNearbyPlayers from "./_components/SocialPeersList";
import WebLeaguePath from "./_components/LeagueProgression";

export default async function RankPage() {
  const dbUsers = await prisma.user.findMany({
    orderBy: { totalXp: "desc" },
    select: {
      id: true,
      name: true,
      userName: true,
      totalXp: true,
      avatarUrl: true,
    },
    take: 100,
  });

  // Centralized mapping logic
  const allUsers = dbUsers.map((user, index) => ({
    id: user.id,
    rank: index + 1,
    name: user.userName || user.name || "Anonymous",
    xp: user.totalXp,
    title: getRankNameFromXp(user.totalXp),
    avatarUrl: user.avatarUrl || null,
    isMe: false, // Replace with actual session logic later
  }));

  const podiumUsers = allUsers.slice(0, 3);
  const listUsers = allUsers.slice(3);

  return (
    <div className="min-h-screen bg-[#FFF8E7] pb-24 text-[#3b2f2f] md:pb-10">
      {/* MOBILE VIEW */}
      <div className="md:hidden flex flex-col">
        {podiumUsers.length > 0 && <PodiumSection users={podiumUsers} />}
        <LeaderboardList users={listUsers} />
      </div>

      {/* DESKTOP VIEW */}
      <div className="mx-auto hidden w-full max-w-[1220px] px-4 pt-5 md:block md:px-6 md:pt-8">
        <div className="grid w-full gap-4 md:grid-cols-[minmax(0,1fr)_320px] md:gap-5">
          <main className="min-w-0 space-y-4 md:space-y-5">
            {/* Safety check: Only render if we have enough users */}
            {podiumUsers.length >= 3 ? (
              <WebPodiumSection users={podiumUsers as any} />
            ) : (
              <div className="p-10 text-center bg-white rounded-2xl border border-dashed border-[#E8D9C0]">
                Лиг эхлэхэд илүү олон тоглогч хэрэгтэй...
              </div>
            )}
            <WebLeaderboardList users={listUsers} />
          </main>

          <aside className="min-w-0 space-y-4 md:space-y-5">
            <WebStandingCard
              league="Silver Steppe League"
              rank={allUsers.findIndex((u) => u.isMe) + 1 || 1}
              total={allUsers.length}
              promotionPercent={82}
              xpToPromote={260}
            />
            <WebThisWeekCard
              totalXp={allUsers[0]?.xp || 0}
              xpChange={120}
              dayStreak={5}
              isPersonalBest={true}
              xpToday={45}
              isAboveAvg={true}
              daysActive={4}
              totalDays={7}
              isGoodPace={true}
            />
            <WebNearbyPlayers
              players={allUsers.slice(0, 5).map((u) => ({ ...u, xpChange: 0 }))}
            />
            <WebLeaguePath />
          </aside>
        </div>
      </div>
    </div>
  );
}

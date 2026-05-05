import CtaBanner from "./_components/CtaBanner";
import LeaderboardHeader from "./_components/LeaderboardHeader";
import LeaderboardList from "./_components/LeaderboardList";
import PodiumSection from "./_components/PodiumSection";
import TabToggle from "./_components/TabToggle";
import WebLeaderboardHeader from "./_components/WebLeaderboardHeader";
import WebLeaderboardList from "./_components/WebLeaderboardList";
import WebLeagueFilter from "./_components/WebLeagueFilter";
import WebLeaguePath from "./_components/WebLeaguePath";
import WebNearbyPlayers from "./_components/WebNearbyPlayers";
import WebPodiumSection from "./_components/WebPodiumSection";
import WebStandingCard from "./_components/WebStandingCard";
import WebTabToggle from "./_components/WebTabToggle";
import WebThisWeekCard from "./_components/WebThisWeekCard";
import userData from "../profile/data/mock-user.json";

const { leaguePosition, totalXp, rankTitle, streakCount } = userData;

export default function RankPage() {
  return (
    <div className="min-h-screen bg-[#F4EFE8] pb-28 md:pb-10 md:pl-60 lg:pl-70 xl:pl-100">
      <div className="md:hidden flex flex-col">
        <LeaderboardHeader
          title={"Bichig\nten"}
          streak={userData.streakCount}
        />
        <TabToggle />
        <PodiumSection
          users={[
            { rank: 1, name: "MGL killer", xp: 3120 },
            { rank: 2, name: "Batbayar", xp: 2840 },
            { rank: 3, name: "Enkhmaa", xp: 2410 },
          ]}
        />
        <LeaderboardList
          users={[
            {
              rank: 4,
              name: "Boldbaatar",
              title: "Master Scribe",
              xp: 1950,
              isMe: false,
            },
            {
              rank: 5,
              name: "You (Tsolmon)",
              title: "Scholar",
              xp: 1820,
              isMe: true,
            },
            {
              rank: 6,
              name: "Oyun-Erdene",
              title: "Scribe Apprentice",
              xp: 1680,
              isMe: false,
            },
            {
              rank: 7,
              name: "Ganbaatar",
              title: "Nomad Scholar",
              xp: 1450,
              isMe: false,
            },
          ]}
        />
        <CtaBanner
          message="Complete 3 vertical script lessons to climb the ranks faster."
          buttonText="Get Started"
          href="/map"
        />
      </div>

      <div className="hidden md:flex flex-col gap-4 px-8 pt-8">
        <WebLeaderboardHeader
          name={userData.name}
          username={userData.username}
          rank={userData.rankTitle}
          streak={userData.streakCount}
          league={userData.rankTitle}
          language={userData.language}
          xp={userData.totalXp}
          xpTotal={1500}
          xpToPromote={260}
          leaderboardRank={userData.leaguePosition}
          leadGap={260}
          endsIn="5d"
        />
        <WebTabToggle />
        <WebLeagueFilter />

        <div className="flex gap-6 items-start">
          <div className="flex flex-col gap-4 flex-1">
            <WebPodiumSection
              users={[
                { rank: 1, name: "Batu", xp: 1240, streak: 12 },
                { rank: 2, name: "Delger", xp: 980, streak: 5 },
                { rank: 3, name: "Otgon", xp: 720, streak: 3 },
              ]}
            />
            <WebLeaderboardList
              users={[
                {
                  rank: 4,
                  name: "Narantsetseg",
                  title: "Basics 1",
                  xp: 410,
                  xpChange: 2,
                  isNew: true,
                },
                {
                  rank: 5,
                  name: "Gantulga",
                  title: "Script 2",
                  xp: 325,
                  xpChange: 0,
                },
                {
                  rank: 6,
                  name: "Solongo",
                  title: "Basics 2",
                  xp: 280,
                  xpChange: -1,
                },
                {
                  rank: 7,
                  name: "Enkhtaivan",
                  title: "Basics 1",
                  xp: 215,
                  xpChange: 1,
                },
                {
                  rank: 8,
                  name: "Munkhjargal",
                  title: "Script 1",
                  xp: 170,
                  xpChange: 0,
                },
                {
                  rank: 9,
                  name: "Altantsetseg",
                  title: "Intro",
                  xp: 115,
                  xpChange: -2,
                },
                {
                  rank: 10,
                  name: "Tserenpuntsag",
                  title: "Intro",
                  xp: 62,
                  xpChange: -3,
                  isNew: true,
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4 w-80 shrink-0">
            <WebStandingCard
              league={userData.rankTitle}
              rank={userData.leaguePosition}
              total={24}
              promotionPercent={82}
              xpToPromote={260}
            />
            <WebThisWeekCard
              totalXp={userData.totalXp}
              xpChange={320}
              dayStreak={userData.streakCount}
              isPersonalBest={true}
              xpToday={userData.weeklyStats.xpThisWeek}
              isAboveAvg={true}
              daysActive={5}
              totalDays={7}
              isGoodPace={true}
            />
            <WebNearbyPlayers players={userData.nearbyPlayers} />
            <WebLeaguePath />
          </div>
        </div>
      </div>
    </div>
  );
}

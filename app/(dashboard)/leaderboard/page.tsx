import BottomNav from "./_components/BottomNav";
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

export default function RankPage() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] pb-28 text-[#3b2f2f] md:pb-10">
      {/* УТАС — md-с дээш нуугдана */}
      <div className="md:hidden flex flex-col">
        <LeaderboardHeader title={"Bichig\nten"} streak={12} />
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

      {/* ВЭБ — md-с доош нуугдана */}
      <div className="mx-auto hidden w-full max-w-6xl flex-col gap-4 px-6 pt-8 md:flex lg:px-8">
        <WebLeaderboardHeader
          name="Batu Munkh"
          username="nomad_batu"
          rank="Silver Steppe League"
          streak={12}
          league="Silver Steppe"
          language="Mongolian"
          xp={1240}
          xpTotal={1500}
          xpToPromote={260}
          leaderboardRank={1}
          leadGap={260}
          endsIn="5d"
        />
        <WebTabToggle />
        <WebLeagueFilter />
        {/* 2 багана */}
        <div className="flex gap-6 items-start">
          {/* Зүүн багана */}

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

          {/* Баруун багана */}

          <div className="flex flex-col gap-4 w-80 shrink-0">
            <WebStandingCard
              league="Silver Steppe League"
              rank={1}
              total={24}
              promotionPercent={82}
              xpToPromote={260}
            />
            <WebThisWeekCard
              totalXp={1240}
              xpChange={320}
              dayStreak={12}
              isPersonalBest={true}
              xpToday={47}
              isAboveAvg={true}
              daysActive={5}
              totalDays={7}
              isGoodPace={true}
            />
            <WebNearbyPlayers
              players={[
                { rank: 1, name: "Batu", xp: 1240, isMe: true },
                { rank: 2, name: "Delger", xp: 980, xpChange: -260 },
                { rank: 3, name: "Otgon", xp: 720, xpChange: -520 },
              ]}
            />
            <WebLeaguePath />
          </div>
        </div>
      </div>
    </div>
  );
}

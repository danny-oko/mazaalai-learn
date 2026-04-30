import BottomNav from "./_components/BottomNav";
import CtaBanner from "./_components/CtaBanner";
import LeaderboardHeader from "./_components/LeaderboardHeader";
import LeaderboardList from "./_components/LeaderboardList";
import PodiumSection from "./_components/PodiumSection";
import TabToggle from "./_components/TabToggle";
import WebLeaderboardHeader from "./_components/WebLeaderboardHeader";

export default function RankPage() {
  return (
    <div className="min-h-screen bg-[#F4EFE8] pb-28 md:pb-10 md:pl-60 lg:pl-70 xl:pl-100">
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
      <div className="hidden md:flex flex-col gap-4 px-8 pt-8">
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
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  LeaderboardPeriodToggle,
  type LeaderboardPeriod,
} from "./LeaderboardPeriodToggle";
import { LeaderboardPodium, type PodiumPlayer } from "./LeaderboardPodium";
import { LeaderboardRankList, type RankListRow } from "./LeaderboardRankList";
import { LeaderboardRightSection } from "./LeaderboardRightSection";

type LeaderboardApiRow = {
  id: string;
  name: string;
  xp: number;
  title: string;
  avatar: string | null;
};

export function LeaderboardPageClient({
  highlightUserId,
}: {
  highlightUserId: string;
}) {
  const [users, setUsers] = useState<LeaderboardApiRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<LeaderboardPeriod>("weekly");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/leaderboard");
        const data = await res.json();
        setUsers(data);
      } catch (e) {
        console.error("Leaderboard fetch failed:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const pageShellClass =
    "min-h-screen bg-[#f8f4e3] py-8 pl-6 pr-4 pb-28 md:ml-[15rem] md:pb-10 lg:ml-[17.5rem] xl:ml-[25rem]";

  if (loading) {
    return (
      <div className={pageShellClass}>
        <p className="text-[#2F372B]">Уншиж байна...</p>
      </div>
    );
  }

  const first = users[0];
  const second = users[1];
  const third = users[2];

  const podiumPlayers: PodiumPlayer[] = [];
  if (second) {
    podiumPlayers.push({
      place: 2,
      name: second.name,
      xp: second.xp,
      avatar: second.avatar,
    });
  }
  if (first) {
    podiumPlayers.push({
      place: 1,
      name: first.name,
      xp: first.xp,
      avatar: first.avatar,
    });
  }
  if (third) {
    podiumPlayers.push({
      place: 3,
      name: third.name,
      xp: third.xp,
      avatar: third.avatar,
    });
  }

  const rankRows: RankListRow[] = [];
  for (let i = 3; i < users.length; i++) {
    const u = users[i];
    const rank = i + 1;
    rankRows.push({
      rank,
      name: u.name,
      title: u.title,
      xp: u.xp,
      avatar: u.avatar,
      isCurrentUser: highlightUserId !== "" && u.id === highlightUserId,
    });
  }

  return (
    <div className={pageShellClass}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <div className="min-w-0 flex-1">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <h1 className="text-2xl font-bold text-[#2D6A4F]">The Imperial Court</h1>
            <div className="self-start sm:self-auto">
              <LeaderboardPeriodToggle value={period} onChange={setPeriod} />
            </div>
          </header>

          {podiumPlayers.length > 0 && (
            <LeaderboardPodium players={podiumPlayers} />
          )}

          <LeaderboardRankList rows={rankRows} />
        </div>

        <LeaderboardRightSection />
      </div>
    </div>
  );
}

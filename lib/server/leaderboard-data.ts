import { unstable_cache } from "next/cache";

import prisma from "@/lib/prisma";

/** Top 100 by XP — hot path for `/leaderboard`. Cached briefly to cut repeat DB work. */
export function fetchLeaderboardTop100Cached() {
  return unstable_cache(
    async () =>
      prisma.user.findMany({
        orderBy: { totalXp: "desc" },
        select: {
          id: true,
          name: true,
          userName: true,
          totalXp: true,
          avatarUrl: true,
        },
        take: 100,
      }),
    ["leaderboard-top-100-v1"],
    { revalidate: 20 },
  )();
}

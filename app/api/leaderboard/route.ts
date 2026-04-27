import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/leaderboard
export const GET = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      totalXp: "desc",
    },
    select: {
      id: true,
      name: true,
      userName: true,
      totalXp: true,
      avatarUrl: true,
    },
  });

  const data = users.map((user) => {
    let title = "Арслан";

    if (user.totalXp >= 3000) {
      title = "Дархан аварга";
    } else if (user.totalXp >= 2000) {
      title = "Даян аварга";
    } else if (user.totalXp >= 1000) {
      title = "Аварга";
    }

    return {
      id: user.id,
      name: user.name ?? user.userName,
      xp: user.totalXp,
      title,
      avatar: user.avatarUrl,
    };
  });

  return NextResponse.json(data);
};

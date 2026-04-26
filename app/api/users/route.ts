import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// POST /api/users
// Body: name OR displayName (or both), email, userName, avatarUrl optional, totalXp optional
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const {
    name,
    displayName,
    email,
    userName,
    avatarUrl,
    totalXp: totalXpRaw,
  } = body;

  const finalDisplayName = displayName ?? name;
  const finalName = name ?? displayName;

  if (!userName || !email || !finalDisplayName) {
    return NextResponse.json(
      { message: "Missing required fields: email, userName, and name or displayName" },
      { status: 400 },
    );
  }

  let totalXp: number | undefined;
  if (totalXpRaw !== undefined && totalXpRaw !== null && totalXpRaw !== "") {
    const n = Number(totalXpRaw);
    if (!Number.isNaN(n)) totalXp = n;
  }

  const user = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      userName,
      email,
      name: finalName,
      displayName: finalDisplayName,
      avatarUrl,
      ...(totalXp !== undefined && { totalXp }),
    },
  });

  return NextResponse.json(user, { status: 201 });
};

// GET /api/users
export const GET = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      totalXp: "desc",
    },
    select: {
      name: true,
      displayName: true,
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
      name: user.name ?? user.displayName ?? user.userName,
      xp: user.totalXp,
      title,
      avatar: user.avatarUrl,
    };
  });

  return NextResponse.json(data);
};

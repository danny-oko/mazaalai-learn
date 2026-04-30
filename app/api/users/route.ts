import prisma from "@/lib/prisma";
import { getRankNameFromXp } from "@/lib/utils/getRankNameFromXp";
import { NextRequest, NextResponse } from "next/server";

// POST /api/users
// Body: name OR displayName (or both), email, userName, avatarUrl optional, totalXp optional
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { name, userName, email, avatarUrl, totalXp: totalXpRaw } = body;

  const finalDisplayName = userName ?? name;
  const finalName = name ?? userName;

  if (!userName || !email || !finalDisplayName) {
    return NextResponse.json(
      { message: "Missing required fields: email, userName or name " },
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
      email,
      name: finalName,
      userName: finalDisplayName,
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
      id: true,
      name: true,
      userName: true,
      totalXp: true,
      avatarUrl: true,
    },
  });

  const data = users.map((user) => {
    const title = getRankNameFromXp(user.totalXp);

    return {
      id: user.id,
      name: user.name ?? user.userName,
      userName: user.userName,
      totalXp: user.totalXp,
      xp: user.totalXp,
      title,
      avatar: user.avatarUrl,
      avatarUrl: user.avatarUrl,
    };
  });

  return NextResponse.json(data);
};

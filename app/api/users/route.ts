import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// POST /api/users
export const POST = async (req: NextRequest) => {
  const { name, email, userName, avatarUrl } = await req.json();

  if (!userName || !email || !name) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  const user = await prisma.user.create({
    data: { id: crypto.randomUUID(), userName, email, name, avatarUrl },
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
      name: user.userName,
      xp: user.totalXp,
      title,
      avatar: user.avatarUrl,
    };
  });

  return NextResponse.json(data);
};

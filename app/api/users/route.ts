import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// POST /api/users
export const POST = async (req: NextRequest) => {
  const { name, email, userName, avatarUrl } = await req.json();

  if (!name || !email || !userName) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  const user = await prisma.user.create({
    data: { id: crypto.randomUUID(), name, email, userName, avatarUrl },
  });

  return NextResponse.json(user, { status: 201 });
};

// GET /api/users
export const GET = async () => {
  // const users = await prisma.user.findMany({
  //   select: {
  //     id: true,
  //     name: true,
  //     userName: true,
  //     avatarUrl: true,
  //     totalXp: true,
  //   },
  // });
  // return NextResponse.json(users);

  const mockUsers = [
    {
      id: "1",
      name: "Бат-Эрдэнэ",
      userName: "bat_erdene",
      avatarUrl: "https://avatar.iran.liara.run/public/1",
      totalXp: 1980,
    },
    {
      id: "2",
      name: "Сарнай",
      userName: "sarnai_g",
      avatarUrl: "https://avatar.iran.liara.run/public/2",
      totalXp: 1350,
    },
    {
      id: "3",
      name: "Түвшин",
      userName: "tuvshin_b",
      avatarUrl: "https://avatar.iran.liara.run/public/3",
      totalXp: 890,
    },
  ];

  return NextResponse.json(mockUsers);
};

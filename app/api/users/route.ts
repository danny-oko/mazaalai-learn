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
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
};

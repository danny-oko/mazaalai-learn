import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/speech-attempts?userId=xxx
export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("userId");
  const attempts = await prisma.speechAttempts.findMany({
    where: userId ? { userId } : undefined,
    include: { target: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(attempts);
};

export const POST = async (req: NextRequest) => {
  const { userId, targetId, transcribedText, wordsRead } = await req.json();
  if (!userId || !targetId || !transcribedText || wordsRead === undefined) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }
  const attempt = await prisma.speechAttempts.create({
    data: { userId, targetId, transcribedText, wordsRead: parseInt(wordsRead) },
  });
  return NextResponse.json(attempt, { status: 201 });
};

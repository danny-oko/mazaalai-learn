import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/progress?userId=xxx
export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ message: "userId required" }, { status: 400 });
  const progress = await prisma.userLessonProgress.findMany({
    where: { userId },
    include: { lesson: true },
  });
  return NextResponse.json(progress);
};

// POST /api/progress
export const POST = async (req: NextRequest) => {
  const { userId, lessonId, status } = await req.json();
  if (!userId || !lessonId) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }
  const progress = await prisma.userLessonProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: { status, completedAt: status === "COMPLETED" ? new Date() : null },
    create: { userId, lessonId, status: status ?? "LOCKED" },
  });
  return NextResponse.json(progress, { status: 201 });
};
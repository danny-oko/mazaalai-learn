import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/tasks
export const GET = async () => {
  const tasks = await prisma.task.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(tasks);
};

// POST /api/tasks
export const POST = async (req: NextRequest) => {
  const {
    lessonId,
    type,
    difficulty,
    xpReward,
    question,
    correctAnswer,
    options,
    order,
  } = await req.json();
  if (
    !lessonId ||
    !type ||
    !difficulty ||
    !xpReward ||
    !question ||
    !correctAnswer ||
    order === undefined
  ) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }
  const task = await prisma.task.create({
    data: {
      lessonId,
      type,
      difficulty,
      xpReward: parseInt(xpReward),
      question,
      correctAnswer,
      options: options ?? null,
      order: parseInt(order),
    },
  });
  return NextResponse.json(task, { status: 201 });
};

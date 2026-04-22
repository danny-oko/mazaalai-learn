import prisma from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

// POST /api/tasks
export const POST = async (req: NextRequest) => {
  const {
    lessonId,
    type,
    difficulty,
    xpReward,
    question,
    correctAnswer,

    order,
  } = await req.json();

  if (
    !lessonId ||
    !type ||
    !difficulty ||
    !xpReward ||
    !question ||
    !correctAnswer ||
    !order
  ) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  const task = await prisma.task.create({
    data: {
      id: crypto.randomUUID(),
      lesson: {
        connect: { id: lessonId },
      },
      type,
      difficulty,
      xpReward: parseInt(xpReward),
      question,
      correctAnswer,
      order: parseInt(order),
    },
  });

  return NextResponse.json(task, { status: 201 });
};

// GET /api/tasks
export const GET = async () => {
  const tasks = await prisma.task.findMany();

  return NextResponse.json(tasks);
};

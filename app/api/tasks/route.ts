import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/tasks
export const GET = async () => {
  const tasks = await prisma.task.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(tasks);
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const {
      lessonId,
      taskType, // Match JSON
      difficulty,
      prompt, // Match JSON
      correctAnswer,
      options, // Match JSON
      orderIndex, // Match JSON
    } = body;

    // Use the exact variable names you just destructured above
    if (!lessonId || !taskType || !prompt || orderIndex === undefined) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const task = await prisma.task.create({
      data: {
        lessonId,
        taskType,
        difficulty: difficulty || "beginner",
        prompt,
        correctAnswer,
        orderIndex: parseInt(orderIndex),
        options: {
          create: options.map((opt: any) => ({
            optionText: opt.optionText || null,
            mediaUrl: opt.mediaUrl || null,
            isCorrect: opt.isCorrect || false,
            orderIndex: opt.orderIndex || 0,
          })),
        },
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
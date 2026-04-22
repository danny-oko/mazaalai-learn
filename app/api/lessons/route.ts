import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// POST /api/lessons
export const POST = async (req: NextRequest) => {
  const { title, description, order, levelId } = await req.json();

  if (!title || !description || !order || !levelId) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  const lesson = await prisma.lesson.create({
    data: {
      id: crypto.randomUUID(),
      title,
      description,
      order: parseInt(order),
      level: {
        connect: {
          id: levelId,
        },
      },
    },
  });
  return NextResponse.json(lesson, { status: 201 });
};

// GET /api/lessons
export const GET = async () => {
  const lessons = await prisma.lesson.findMany();
  return NextResponse.json(lessons);
};

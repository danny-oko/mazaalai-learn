import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/lessons
export const GET = async () => {
  const lessons = await prisma.lesson.findMany({
    include: { content: true, tasks: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(lessons);
};

// POST /api/lessons
export const POST = async (req: NextRequest) => {
  const { title, description, order, levelId } = await req.json();
  if (!title || !order || !levelId) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }
  const lesson = await prisma.lesson.create({
    data: {
      title,
      description,
      order: parseInt(order),
      level: { connect: { id: levelId } },
    },
  });
  return NextResponse.json(lesson, { status: 201 });
};

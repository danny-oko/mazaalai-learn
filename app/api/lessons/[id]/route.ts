import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

// GET /api/lessons/:id
export const GET = async (_req: NextRequest, { params }: Params) => {
  const { id } = await params;
  const lesson = await prisma.lesson.findUnique({ where: { id } });

  if (!lesson)
    return NextResponse.json({ message: "Lesson not found" }, { status: 404 });

  return NextResponse.json(lesson);
};

// PATCH /api/lessons/:id
export const PATCH = async (req: NextRequest, { params }: Params) => {
  const { id } = await params;
  const body = await req.json();

  const lesson = await prisma.lesson.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(lesson);
};

// DELETE /api/lessons/:id
export const DELETE = async (_req: NextRequest, { params }: Params) => {
  const { id } = await params;

  await prisma.lesson.delete({ where: { id } });

  return NextResponse.json({ message: "Lesson deleted" });
};

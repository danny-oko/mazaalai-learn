import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/lessons/:id
export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } },
) => {
  const lesson = await prisma.lesson.findUnique({
    where: { id: params.id },
    include: { content: true, tasks: true, userProgress: true },
  });
  if (!lesson)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(lesson);
};

// PATCH /api/lessons/:id
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const body = await req.json();
  const lesson = await prisma.lesson.update({
    where: { id: params.id },
    data: {
      ...(body.title && { title: body.title }),
      ...(body.description && { description: body.description }),
      ...(body.order !== undefined && { order: parseInt(body.order) }),
      ...(body.isCompleted !== undefined && { isCompleted: body.isCompleted }),
    },
  });
  return NextResponse.json(lesson);
};

// DELETE /api/lessons/:id
export const DELETE = async (
  _: NextRequest,
  { params }: { params: { id: string } },
) => {
  await prisma.lesson.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted" });
};

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

// GET /api/tasks/:id
export const GET = async (_req: NextRequest, { params }: Params) => {
  const { id } = await params;
  const task = await prisma.task.findUnique({ where: { id } });

  if (!task)
    return NextResponse.json({ message: "Task not found" }, { status: 404 });

  return NextResponse.json(task);
};

// PATCH /api/tasks/:id
export const PATCH = async (req: NextRequest, { params }: Params) => {
  const { id } = await params;
  const body = await req.json();

  if (!body || Object.keys(body).length === 0) {
    return NextResponse.json(
      { message: "At least one field is required to update" },
      { status: 400 },
    );
  }

  // Check if task exists
  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json(
      { message: `Task with id "${id}" not found` },
      { status: 404 },
    );
  }

  const task = await prisma.task.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(task, { status: 200 });
};

// DELETE /api/tasks/:id
export const DELETE = async (_req: NextRequest, { params }: Params) => {
  const { id } = await params;

  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json(
      { message: `Task with id "${id}" not found` },
      { status: 404 },
    );
  }

  await prisma.task.delete({ where: { id } });

  return NextResponse.json({ message: "Task deleted" }, { status: 200 });
};

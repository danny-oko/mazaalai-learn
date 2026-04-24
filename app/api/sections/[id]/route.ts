import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/sections/:id
export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } },
) => {
  const section = await prisma.section.findUnique({
    where: { id: params.id },
    include: { lessons: true },
  });
  if (!section)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(section);
};

// PATCH /api/sections/:id
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const body = await req.json();
  const section = await prisma.section.update({
    where: { id: params.id },
    data: {
      ...(body.title && { title: body.title }),
      ...(body.order !== undefined && { order: parseInt(body.order) }),
    },
  });
  return NextResponse.json(section);
};

// DELETE /api/sections/:id
export const DELETE = async (
  _: NextRequest,
  { params }: { params: { id: string } },
) => {
  await prisma.section.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted" });
};

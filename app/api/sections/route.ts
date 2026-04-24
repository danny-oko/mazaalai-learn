import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/sections
export const GET = async () => {
  const sections = await prisma.section.findMany({
    include: { lessons: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(sections);
};

// POST /api/sections
export const POST = async (req: NextRequest) => {
  const { title, order } = await req.json();
  if (!title || order === undefined) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }
  const section = await prisma.section.create({
    data: { title, order: parseInt(order) },
  });
  return NextResponse.json(section, { status: 201 });
};

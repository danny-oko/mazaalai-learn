import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/lesson-contents
export const GET = async () => {
  const contents = await prisma.lessonContent.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(contents);
};

// POST /api/lesson-contents
export const POST = async (req: NextRequest) => {
  const { lessonId, name, text, imageUrl, order } = await req.json();
  if (!lessonId || !name || !text || order === undefined) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }
  const content = await prisma.lessonContent.create({
    data: { lessonId, name, text, imageUrl, order: parseInt(order) },
  });
  return NextResponse.json(content, { status: 201 });
};
// https://res.cloudinary.com/dll1at55f/image/upload/f_auto,q_auto/Screenshot_2026-04-30_at_11.07.43_cszfyp
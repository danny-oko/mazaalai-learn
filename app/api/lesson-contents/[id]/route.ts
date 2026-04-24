import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } },
) => {
  const content = await prisma.lessonContent.findUnique({
    where: { id: params.id },
  });
  if (!content)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(content);
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const body = await req.json();
  const content = await prisma.lessonContent.update({
    where: { id: params.id },
    data: {
      ...(body.name && { name: body.name }),
      ...(body.text && { text: body.text }),
      ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
      ...(body.order !== undefined && { order: parseInt(body.order) }),
    },
  });
  return NextResponse.json(content);
};

export const DELETE = async (
  _: NextRequest,
  { params }: { params: { id: string } },
) => {
  await prisma.lessonContent.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted" });
};

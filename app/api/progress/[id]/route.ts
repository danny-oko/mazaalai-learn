import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const body = await req.json();
  const progress = await prisma.userLessonProgress.update({
    where: { id: params.id },
    data: {
      ...(body.status && { status: body.status }),
      ...(body.mistakeCount !== undefined && { mistakeCount: parseInt(body.mistakeCount) }),
      ...(body.xpEarned !== undefined && { xpEarned: parseInt(body.xpEarned) }),
      ...(body.status === "COMPLETED" && { completedAt: new Date() }),
    },
  });
  return NextResponse.json(progress);
};

export const DELETE = async (_: NextRequest, { params }: { params: { id: string } }) => {
  await prisma.userLessonProgress.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted" });
};
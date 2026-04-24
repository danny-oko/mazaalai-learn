import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const targets = await prisma.speechTargets.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(targets);
};

export const POST = async (req: NextRequest) => {
  const { title, expectedText, wordsCount } = await req.json();
  if (!title || !expectedText || wordsCount === undefined) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }
  const target = await prisma.speechTargets.create({
    data: { title, expectedText, wordsCount: parseInt(wordsCount) },
  });
  return NextResponse.json(target, { status: 201 });
};

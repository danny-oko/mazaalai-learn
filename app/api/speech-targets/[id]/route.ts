import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/speech-attempts?userId=xxx
export const GET = async (req: NextRequest) => {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    const attempts = await prisma.speechAttempt.findMany({
      where: userId ? { userId } : undefined,
      include: {
        target: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(attempts);
  } catch (error) {
    console.error("Failed to fetch speech attempts:", error);

    return NextResponse.json(
      { message: "Failed to fetch speech attempts" },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const {
      userId,
      targetId,
      transcribedText,
      durationSec,
      mistakes,
      accuracy,
      wordsRead,
      charactersRead,
      wpm,
    } = await req.json();

    if (
      !userId ||
      !targetId ||
      !transcribedText ||
      durationSec === undefined ||
      mistakes === undefined ||
      accuracy === undefined ||
      wordsRead === undefined ||
      charactersRead === undefined ||
      wpm === undefined
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const attempt = await prisma.speechAttempt.create({
      data: {
        userId,
        targetId,
        transcribedText,

        durationSec: Number(durationSec),
        mistakes: Number(mistakes),
        accuracy: Number(accuracy),

        wordsRead: Number(wordsRead),
        charactersRead: Number(charactersRead),
        wpm: Number(wpm),
      },
    });

    return NextResponse.json(attempt, { status: 201 });
  } catch (error) {
    console.error("Failed to create speech attempt:", error);

    return NextResponse.json(
      { message: "Failed to create speech attempt" },
      { status: 500 },
    );
  }
};

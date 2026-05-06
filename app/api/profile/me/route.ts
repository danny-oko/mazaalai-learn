import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getCurrentAppUser } from "@/lib/server/get-current-app-user";

export async function GET() {
  const user = await getCurrentAppUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(user);
}

export async function PATCH(req: Request) {
  const user = await getCurrentAppUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as {
    name?: string;
    userName?: string;
    avatarUrl?: string | null;
  };

  const nextName = body.name?.trim();
  const nextUserName = body.userName?.trim();
  const nextAvatar = body.avatarUrl?.trim();

  if (nextName !== undefined && nextName.length === 0) {
    return NextResponse.json({ message: "Name cannot be empty." }, { status: 400 });
  }
  if (nextUserName !== undefined && nextUserName.length < 3) {
    return NextResponse.json(
      { message: "Username must be at least 3 characters." },
      { status: 400 },
    );
  }

  try {
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(nextName !== undefined ? { name: nextName } : {}),
        ...(nextUserName !== undefined ? { userName: nextUserName } : {}),
        ...(body.avatarUrl !== undefined ? { avatarUrl: nextAvatar || null } : {}),
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { message: "Could not update profile. Username may already exist." },
      { status: 400 },
    );
  }
}

import { auth, currentUser } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";

export async function getCurrentAppUser() {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const clerkUser = await currentUser();
  const primaryEmail = clerkUser?.emailAddresses.find(
    (entry) => entry.id === clerkUser.primaryEmailAddressId,
  )?.emailAddress;

  const fallbackEmail = `${userId}@no-email.local`;
  const email = primaryEmail ?? fallbackEmail;
  const username =
    clerkUser?.username ??
    clerkUser?.firstName?.toLowerCase().replace(/\s+/g, "-") ??
    `user-${userId.slice(0, 8)}`;
  const name =
    [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(" ").trim() ||
    username;

  return prisma.user.upsert({
    where: { id: userId },
    update: {
      email,
      userName: username,
      name,
      avatarUrl: clerkUser?.imageUrl ?? undefined,
    },
    create: {
      id: userId,
      email,
      userName: username,
      name,
      avatarUrl: clerkUser?.imageUrl ?? undefined,
    },
  });
}

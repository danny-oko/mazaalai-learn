import prisma from "@/lib/prisma";

type EnsureUserArgs = {
  id: string;
  email?: string | null;
  username?: string | null;
  name?: string | null;
  avatarUrl?: string | null;
};

export async function ensureUser(args: EnsureUserArgs) {
  const { id, email, username, name, avatarUrl } = args;
  const safeEmail = email ?? `${id}@no-email.local`;
  const safeUsername = username ?? name ?? `user-${id.slice(0, 8)}`;

  return prisma.user.upsert({
    where: { id },
    update: {
      ...(email ? { email } : {}),
      ...(username ? { userName: username } : {}),
      ...(name ? { name } : {}),
      ...(avatarUrl ? { avatarUrl } : {}),
    },
    create: {
      id,
      email: safeEmail,
      userName: safeUsername,
      name: name ?? safeUsername,
      avatarUrl: avatarUrl ?? undefined,
    },
  });
}

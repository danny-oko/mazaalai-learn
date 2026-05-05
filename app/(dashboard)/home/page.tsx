import { Header } from "@/app/_components/Bar-Sections/header";
import { HomePath } from "./_components/home-page-client";
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { ensureUser } from "@/lib/server/ensure-user";

function toUtcDateOnly(value: Date) {
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()));
}

function calculateDailyStreak(completedAt: Date[]) {
  const uniqueDays = Array.from(new Set(completedAt.map((d) => toUtcDateOnly(d).getTime()))).sort(
    (a, b) => b - a,
  );
  if (!uniqueDays.length) return 0;

  const oneDayMs = 24 * 60 * 60 * 1000;
  const today = toUtcDateOnly(new Date()).getTime();
  const yesterday = today - oneDayMs;
  if (uniqueDays[0] !== today && uniqueDays[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < uniqueDays.length; i += 1) {
    if (uniqueDays[i - 1] - uniqueDays[i] !== oneDayMs) break;
    streak += 1;
  }

  return streak;
}

export default async function HomeSection() {
  const { userId } = await auth();
  let xp = 0;
  let streak = 0;
  let heartsRemaining = 3;

  if (userId) {
    const clerkUser = await currentUser();
    await ensureUser({
      id: userId,
      email: clerkUser?.emailAddresses[0]?.emailAddress,
      username: clerkUser?.username,
      name:
        [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(" ") ||
        undefined,
      avatarUrl: clerkUser?.imageUrl,
    });

    const [user, completedLessons, progressList] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { totalXp: true },
      }),
      prisma.userLessonProgress.findMany({
        where: { userId, status: "COMPLETED", completedAt: { not: null } },
        select: { completedAt: true },
      }),
      prisma.userLessonProgress.findMany({
        where: { userId },
        select: { mistakeCount: true },
      }),
    ]);

    xp = user?.totalXp ?? 0;
    streak = calculateDailyStreak(
      completedLessons
        .map((item) => item.completedAt)
        .filter((date): date is Date => Boolean(date)),
    );
    heartsRemaining =
      progressList.length > 0
        ? Math.max(
            0,
            Math.min(
              3,
              Math.min(...progressList.map((item) => item.mistakeCount)),
            ),
          )
        : 3;
  }

  return (
    <div className="flex min-h-full flex-col items-center bg-[#F0EDE3] pb-28 font-['Plus_Jakarta_Sans'] md:-ml-20 xl:-ml-65">
      <Header streak={streak} xp={xp} heartsRemaining={heartsRemaining} />
      <div className="flex min-h-0 flex-1 w-full flex-col items-center pt-20 sm:pt-24 md:pt-28">
        <HomePath />
      </div>
    </div>
  );
}

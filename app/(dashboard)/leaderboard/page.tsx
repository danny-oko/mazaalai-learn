import { LeaderboardPageClient } from "./_components/LeaderboardPageClient";

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: Promise<{ me?: string }>;
}) {
  const sp = await searchParams;
  const highlightUserId = sp.me ?? "";

  return <LeaderboardPageClient highlightUserId={highlightUserId} />;
}

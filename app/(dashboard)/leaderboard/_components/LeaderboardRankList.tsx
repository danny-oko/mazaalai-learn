// User list section top3 aas tusdaa //

import { getAvatarPictureUrl } from "./leaderboard-helpers";

export type RankListRow = {
  rank: number;
  name: string;
  title: string;
  xp: number;
  avatar: string | null;
  isCurrentUser: boolean;
};

export function LeaderboardRankList({ rows }: { rows: RankListRow[] }) {
  if (rows.length === 0) return null;

  return (
    <div className="mt-10 w-full max-w-full overflow-x-auto pr-1">
      <div className="mx-auto w-[669.12px] max-w-full">
        {/* header heseg */}
        <div className="mb-3 grid grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1fr)] gap-3 px-3 text-xs font-semibold uppercase tracking-wide text-[#6A758B]">
          <span>Rank</span>
          <span>Nomad Scholar</span>
          <span>Title</span>
          <span className="text-right">Experience</span>
        </div>

        <ul className="flex flex-col gap-2">
          {rows.map((row) => {
            const imgSrc = row.avatar ?? getAvatarPictureUrl(row.name);
            const rowBg = row.isCurrentUser ? "bg-[#FFF3DD]" : "bg-[#F1EADD]";
            const rowHover =
              "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#ECE2D3] hover:shadow-[0_10px_20px_rgba(28,43,74,0.08)]";
            const titleColor = row.isCurrentUser
              ? "text-[#2E8B6F]"
              : "text-[#1C2B4A]/75";

            return (
              <li
                key={row.rank + "-" + row.name}
                className={
                  "grid grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-[#E3D9C9] px-3 py-3 shadow-[0_3px_8px_rgba(28,43,74,0.05)] " +
                  (row.isCurrentUser
                    ? "border-l-4 border-l-[#E8920A] ring-1 ring-[#E8920A]/25 "
                    : "") +
                  rowBg +
                  " " +
                  rowHover
                }
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#1C2B4A]">
                    <img
                      src={imgSrc}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-bold text-[#1C2B4A]">
                    #{row.rank}
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#1C2B4A]">
                    {row.isCurrentUser ? `You (${row.name})` : row.name}
                  </p>
                  {row.isCurrentUser && (
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#7C879A]">
                      Current rank
                    </p>
                  )}
                </div>

                <p
                  className={
                    "min-w-0 wrap-break-word text-sm font-medium " + titleColor
                  }
                >
                  {row.title}
                </p>

                <p
                  className={
                    "text-right text-sm font-bold tabular-nums " +
                    (row.isCurrentUser ? "text-[#2E8B6F]" : "text-[#1C2B4A]")
                  }
                >
                  {row.xp.toLocaleString()}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

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
        <div className="mb-3 grid grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1fr)] gap-3 px-3 text-xs font-semibold uppercase tracking-wide text-[#2F372B]/70">
          <span>Rank</span>
          <span>Nomad Scholar</span>
          <span>Title</span>
          <span className="text-right">Experience</span>
        </div>

        <ul className="flex flex-col gap-2">
          {rows.map((row) => {
            const imgSrc = row.avatar ?? getAvatarPictureUrl(row.name);
            const rowBg = row.isCurrentUser ? "bg-[#C1F0D6]" : "bg-white";
            const rowHover =
              "transition-colors duration-200 ease-out hover:bg-[#AFF4C6] hover:shadow-md";
            const titleColor = row.isCurrentUser
              ? "text-[#1d5d42]"
              : "text-[#1D5B5E]";

            return (
              <li
                key={row.rank + "-" + row.name}
                className={
                  "grid grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1fr)] items-center gap-3 rounded-2xl border-l-4 border-transparent px-3 py-3 shadow-sm hover:border-[#105644] " +
                  rowBg +
                  " " +
                  rowHover
                }
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-black">
                    <img
                      src={imgSrc}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-bold text-[#2F372B]">
                    #{row.rank}
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#2F372B]">
                    {row.isCurrentUser ? `You (${row.name})` : row.name}
                  </p>
                  {row.isCurrentUser && (
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#2F372B]/60">
                      Current rank
                    </p>
                  )}
                </div>

                <p
                  className={
                    "min-w-0 break-words text-sm font-medium " + titleColor
                  }
                >
                  {row.title}
                </p>

                <p className="text-right text-sm font-bold tabular-nums text-[#2F372B]">
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

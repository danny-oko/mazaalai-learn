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

const rowGrid =
  "md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1fr)] md:items-center md:gap-3";

export function LeaderboardRankList({ rows }: { rows: RankListRow[] }) {
  if (rows.length === 0) return null;

  return (
    <div className="mt-8 w-full max-w-full sm:mt-10">
      <div className="mx-auto w-full max-w-[669.12px] px-1 sm:px-0">
        <div
          className={
            "mb-3 hidden px-3 text-xs font-semibold uppercase tracking-wide text-[#2F372B]/70 md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1fr)] md:gap-3"
          }
        >
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
                  "rounded-2xl border-l-4 border-transparent shadow-sm hover:border-[#105644] md:px-3 md:py-3 " +
                  rowBg +
                  " " +
                  rowHover +
                  " " +
                  rowGrid
                }
              >
                <div className="flex flex-col gap-3 p-4 md:contents md:p-0">
                  {/* Mobile */}
                  <div className="flex items-center gap-3 md:hidden">
                    <div className="flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-black">
                      <img
                        src={imgSrc}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span className="text-sm font-bold text-[#2F372B]">
                          #{row.rank}
                        </span>
                        <p className="min-w-0 truncate text-sm font-semibold text-[#2F372B]">
                          {row.isCurrentUser ? `You (${row.name})` : row.name}
                        </p>
                      </div>
                      {row.isCurrentUser && (
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#2F372B]/60">
                          Current rank
                        </p>
                      )}
                    </div>
                    <p className="shrink-0 text-right text-sm font-bold tabular-nums text-[#2F372B]">
                      {row.xp.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-start justify-between gap-2 border-t border-[#2F372B]/10 pt-3 md:hidden">
                    <span className="text-xs font-semibold text-[#2F372B]/60">
                      Title
                    </span>
                    <p
                      className={
                        "max-w-[65%] text-right text-sm font-medium " +
                        titleColor
                      }
                    >
                      {row.title}
                    </p>
                  </div>

                  {/* Desktop  */}
                  <div className="hidden items-center gap-2 md:flex">
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

                  <div className="hidden min-w-0 md:block">
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
                      "hidden min-w-0 wrap-break-word text-sm font-medium md:block " +
                      titleColor
                    }
                  >
                    {row.title}
                  </p>

                  <p className="hidden text-right text-sm font-bold tabular-nums text-[#2F372B] md:block">
                    {row.xp.toLocaleString()}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

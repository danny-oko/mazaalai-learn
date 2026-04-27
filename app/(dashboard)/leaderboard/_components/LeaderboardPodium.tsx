// Top 3 podium heseg //

import { ChessQueen } from "lucide-react";
import { getAvatarPictureUrl } from "./leaderboard-helpers";

export type PodiumPlayer = {
  place: 1 | 2 | 3;
  name: string;
  xp: number;
  avatar: string | null;
};

export function LeaderboardPodium({ players }: { players: PodiumPlayer[] }) {
  return (
    <div className="mx-auto mt-8 w-full max-w-md grid grid-cols-3 items-end gap-4 sm:max-w-lg md:max-w-xl">
      {players.map((player) => {
        const isFirstPlace = player.place === 1;

        let columnOrderClass = "order-3";
        if (player.place === 1) columnOrderClass = "order-2";
        if (player.place === 2) columnOrderClass = "order-1";

        let nameColorClass = "text-black";
        if (isFirstPlace) nameColorClass = "text-[#1d5d42]";

        let xpColorClass = "text-[#1d5d42]";
        if (player.place === 3) xpColorClass = "text-[#9f7772]";

        let xpExtraClass = "";
        if (isFirstPlace) {
          xpExtraClass = "rounded-md bg-[#e2f3dc] px-2 py-0.5";
        }

        let podiumClass = "h-20 rounded-t-[20px] bg-[#ecead9]";
        if (isFirstPlace) {
          podiumClass = "h-28 rounded-t-[26px] bg-[#1d5d42]";
        } else if (player.place === 2) {
          podiumClass = "h-24 rounded-t-[20px] bg-[#ecead9]";
        }

        const avatarUrl = player.avatar ?? getAvatarPictureUrl(player.name);

        let rankBadgeBgClass = "bg-[#b4540a]";
        let rankBadgeTextClass = "text-white";
        if (player.place === 2) {
          rankBadgeBgClass = "bg-[#cbd5e1]";
          rankBadgeTextClass = "text-[#1e293b]";
        }

        return (
          <div
            key={player.place}
            className={
              "flex flex-col items-center overflow-visible " + columnOrderClass
            }
          >
            {isFirstPlace ? (
              <div className="relative flex flex-col items-center">
                <ChessQueen
                  className="mb-1 h-9 w-9 -translate-x-1 translate-y-0.5 text-[#FFC73F] drop-shadow-[2px_3px_3px_rgba(47,55,43,0.1)]"
                  strokeWidth={1.75}
                  aria-hidden
                />

                <div className="relative inline-grid place-items-center overflow-visible pb-2 pr-2">
                  <div
                    className="col-start-1 row-start-1 z-0 h-[6.2rem] w-[6.2rem] translate-x-1.5 translate-y-1.5 rounded-full bg-[#fffdf6]"
                    aria-hidden
                  />

                  <div className="col-start-1 row-start-1 z-10 flex h-24 w-24 shrink-0 overflow-hidden rounded-full border-[5px] border-[#1d5d42] bg-black">
                    <img
                      src={avatarUrl}
                      alt={player.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="absolute bottom-0 right-0 z-20 h-9 w-9">
                    <div
                      className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-[#fffdf6]"
                      style={{ transform: "translate(5px, 5px)" }}
                      aria-hidden
                    />
                    <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-white bg-[#D4AF37]">
                      <span className="text-sm font-bold text-white">1</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative h-20 w-20 shrink-0">
                <div className="flex h-full w-full overflow-hidden rounded-full border-4 border-white bg-black shadow">
                  <img
                    src={avatarUrl}
                    alt={player.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div
                  className={
                    "absolute -bottom-0.5 -right-0.5 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white " +
                    rankBadgeBgClass
                  }
                >
                  <span className={"text-xs font-bold " + rankBadgeTextClass}>
                    {player.place}
                  </span>
                </div>
              </div>
            )}

            <p className={"mt-2 text-sm font-bold " + nameColorClass}>
              {player.name}
            </p>

            <p className={"text-xs " + xpColorClass + " " + xpExtraClass}>
              {player.xp} XP
            </p>

            <div
              className={
                "mt-3 flex w-full items-center justify-center " + podiumClass
              }
            >
              {isFirstPlace && (
                <span className="text-2xl font-bold text-[#4b7e69]">1</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

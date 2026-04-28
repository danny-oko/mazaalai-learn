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

        let nameColorClass = "text-[#1C2B4A]";
        if (isFirstPlace) nameColorClass = "text-[#1C2B4A]";

        let xpColorClass = "text-[#2E8B6F]";
        if (player.place === 3) xpColorClass = "text-[#1C2B4A]/75";

        let xpExtraClass = "";
        if (isFirstPlace) {
          xpExtraClass = "rounded-md bg-[#E5F3EE] px-2 py-0.5";
        }

        let podiumClass =
          "h-20 rounded-t-[20px] bg-[#EFE7DA] shadow-[0_8px_16px_rgba(28,43,74,0.08)]";
        if (isFirstPlace) {
          podiumClass =
            "h-28 rounded-t-[26px] bg-[#1C2B4A] shadow-[0_12px_22px_rgba(28,43,74,0.16)]";
        } else if (player.place === 2) {
          podiumClass =
            "h-24 rounded-t-[20px] bg-[#E6DECF] shadow-[0_10px_18px_rgba(28,43,74,0.1)]";
        }

        const avatarUrl = player.avatar ?? getAvatarPictureUrl(player.name);

        let rankBadgeBgClass = "bg-[#E8920A]";
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
                  className="mb-1 h-9 w-9 -translate-x-1 translate-y-0.5 text-[#E8920A] drop-shadow-[2px_3px_3px_rgba(28,43,74,0.16)]"
                  strokeWidth={1.75}
                  aria-hidden
                />

                <div className="relative inline-grid place-items-center overflow-visible pb-2 pr-2">
                  <div
                    className="col-start-1 row-start-1 z-0 h-[6.2rem] w-[6.2rem] translate-x-1.5 translate-y-1.5 rounded-full bg-[#F7F4EF]"
                    aria-hidden
                  />

                  <div className="col-start-1 row-start-1 z-10 flex h-24 w-24 shrink-0 overflow-hidden rounded-full border-[5px] border-[#1C2B4A] bg-[#1C2B4A]">
                    <img
                      src={avatarUrl}
                      alt={player.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="absolute bottom-0 right-0 z-20 h-9 w-9">
                    <div
                      className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-[#F7F4EF]"
                      style={{ transform: "translate(5px, 5px)" }}
                      aria-hidden
                    />
                    <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-white bg-[#E8920A]">
                      <span className="text-sm font-bold text-white">1</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative h-20 w-20 shrink-0">
                <div className="flex h-full w-full overflow-hidden rounded-full border-4 border-white bg-[#1C2B4A] shadow">
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
                <span className="text-2xl font-bold text-[#E8920A]">1</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

import Image from "next/image";
import { Flame } from "lucide-react";

import StatsCard from "./StatsCard";

type WebUserHeaderCardProps = {
  name: string;
  username: string;
  avatarUrl: string;
  rank: string;
  xp: number;
  leaguePosition: number;
  streak: number;
};

export default function WebUserHeaderCard({
  name,
  username,
  avatarUrl,
  rank,
  xp,
  leaguePosition,
  streak,
}: WebUserHeaderCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm relative overflow-hidden">
      {/* Арын гэрэл */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#F5A623]/10 -translate-y-6 translate-x-6 pointer-events-none" />

      {/* Хэвтээ layout */}
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-24 h-24 rounded-full border-[3px] border-[#E8920A] overflow-hidden bg-black flex items-center justify-center">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={name}
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-white text-3xl font-bold">{name[0]}</span>
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#E8920A] border-2 border-white flex items-center justify-center">
            <span className="text-[10px] text-white">⚡</span>
          </div>
        </div>

        {/* Нэр + rank */}
        <div className="flex flex-col gap-1.5 flex-1">
          <h2 className="text-2xl font-bold text-[#1A1208]">{name}</h2>
          <p className="text-sm text-[#6B5E4A]">@{username}</p>
          <div className="flex items-center gap-1.5 bg-[#EDE8E0] rounded-full px-4 py-1.5 w-fit">
            <span className="text-[#6B5E4A] text-xs">▲</span>
            <span className="text-xs font-bold tracking-widest text-[#6B5E4A]">
              {rank}
            </span>
          </div>
        </div>

        {/* Stats — баруун тал */}
        <div className="flex gap-3 shrink-0">
          <StatsCard value={xp.toLocaleString()} label="XP" />
          <StatsCard value={`#${leaguePosition}`} label="LEAGUE" />
          <StatsCard
            value={
              <span className="inline-flex items-center justify-center gap-0.5">
                {streak}
                <Flame className="size-5 shrink-0" strokeWidth={2.25} aria-hidden />
              </span>
            }
            label="STREAK"
          />
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { Flame } from "lucide-react";

import StatsCard from "./StatsCard";

type UserHeaderCardProps = {
  name: string;
  username: string;
  avatarUrl: string;
  rank: string;
  xp: number;
  leaguePosition: number;
  streak: number;
};

export default function UserHeaderCard({
  name,
  username,
  avatarUrl,
  rank,
  xp,
  leaguePosition,
  streak,
}: UserHeaderCardProps) {
  return (
    <div className="bg-white rounded-3xl p-5 flex flex-col items-center gap-3 shadow-sm relative overflow-hidden">
      {/* Арын гэрэл */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#F5A623]/10 -translate-y-5 translate-x-5 pointer-events-none" />

      {/* Avatar — утасны хэмжээ тогтмол */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-[3px] border-[#E8920A] overflow-hidden bg-black flex items-center justify-center">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-white text-2xl font-bold">{name[0]}</span>
          )}
        </div>
        <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#E8920A] border-2 border-white flex items-center justify-center">
          <span className="text-[9px] text-white">⚡</span>
        </div>
      </div>

      {/* Нэр */}
      <div className="text-center">
        {/* text-xl утас, md-с дээш text-2xl */}
        <h2 className="text-xl md:text-2xl font-bold text-[#1A1208]">{name}</h2>
        <p className="text-sm text-[#6B5E4A] mt-0.5">@{username}</p>
      </div>

      {/* Rank */}
      <div className="flex items-center gap-1.5 bg-[#EDE8E0] rounded-full px-4 py-1.5">
        <span className="text-[#6B5E4A] text-xs">▲</span>
        <span className="text-xs font-bold tracking-widest text-[#6B5E4A]">
          {rank}
        </span>
      </div>

      {/* Stats */}
      <div className="flex gap-2 w-full mt-1">
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
  );
}

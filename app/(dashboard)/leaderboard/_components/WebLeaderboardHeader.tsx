interface WebLeaderboardHeaderProps {
  name: string;
  username: string;
  avatarUrl?: string;
  rank: string;
  streak: number;
  league: string;
  language: string;
  xp: number;
  xpTotal: number;
  xpToPromote: number;
  leaderboardRank: number;
  leadGap: number;
  endsIn: string;
}

export default function WebLeaderboardHeader({
  name,
  username,
  avatarUrl,
  rank,
  streak,
  league,
  language,
  xp,
  xpTotal,
  xpToPromote,
  leaderboardRank,
  leadGap,
  endsIn,
}: WebLeaderboardHeaderProps) {
  const progressPercent = Math.min((xp / xpTotal) * 100, 100);

  return (
    <div className="bg-[#1B2A4A] rounded-2xl p-6 text-white">
      {/* Дээд хэсэг */}
      <div className="flex items-start justify-between gap-4">
        {/* Зүүн: avatar + нэр */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-[#E8940A] flex items-center justify-center text-xl font-bold text-white">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                name[0]
              )}
            </div>
            <div className="absolute -top-1 -right-1 bg-[#E8940A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
              #1 NOW
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold">{name}</h2>
            <p className="text-sm text-gray-400">@{username}</p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="bg-[#2A3F6A] text-xs text-gray-300 px-2 py-0.5 rounded-full">
                🔥 {streak}-day streak
              </span>
              <span className="bg-[#2A3F6A] text-xs text-gray-300 px-2 py-0.5 rounded-full">
                ⭐ {league}
              </span>
              <span className="bg-[#2A3F6A] text-xs text-gray-300 px-2 py-0.5 rounded-full">
                🇲🇳 {language}
              </span>
            </div>
          </div>
        </div>

        {/* Баруун: статистик */}
        <div className="flex items-center gap-6 shrink-0">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#E8940A]">
              {xp.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Your XP
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">#{leaderboardRank}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Rank
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">+{leadGap}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Lead Gap
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{endsIn}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Ends In
            </p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-5">
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>Progress to Gold Steppe League</span>
          <span className="text-[#E8940A] font-semibold">
            {xpToPromote} XP to promote
          </span>
        </div>
        <div className="w-full bg-[#2A3F6A] rounded-full h-2.5">
          <div
            className="bg-[#E8940A] h-2.5 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-right text-xs text-gray-400 mt-1">
          {xp.toLocaleString()} / {xpTotal.toLocaleString()} XP
        </div>
      </div>
    </div>
  );
}

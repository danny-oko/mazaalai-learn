interface LeaderboardHeaderProps {
  title: string;
  streak: number;
}

export default function LeaderboardHeader({
  title,
  streak,
}: LeaderboardHeaderProps) {
  return (
    <div className="flex items-start justify-between px-5 pt-5 pb-3 bg-[#FFF8EE] border-b border-[#E8D9C0]">
      <div className="flex flex-col gap-1">
        <span className="text-sm text-[#888]">☰</span>
        <h1 className="text-lg font-semibold text-[#C47F17] leading-snug whitespace-pre-line">
          {title}
        </h1>
      </div>

      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xl font-bold text-[#C47F17]">{streak}</span>
        <span className="text-lg">🔥</span>
      </div>
    </div>
  );
}

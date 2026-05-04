import { Flame, Star } from "lucide-react";

type HeaderProps = {
  streak: number;
  xp: number;
};

export const Header = ({ streak, xp }: HeaderProps) => {
  return (
    <div className="fixed top-4 z-[100] flex w-full justify-center px-4 pt-[env(safe-area-inset-top)] md:pl-24 lg:pl-60">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between rounded-full border border-[#ead9bb] bg-[#FFF8E7]/95 px-4 py-3 font-balsamiq text-[#3b2f2f] shadow-[0_18px_45px_rgba(122,89,48,0.14)] backdrop-blur-md sm:px-5">
          <h1 className="truncate text-sm font-bold sm:text-base">
            Mazaalai Learn
          </h1>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-[#ead9bb] bg-[#f8e7c7] px-2 py-1.5 text-[#6b4d26] sm:px-3">
              <Flame className="h-4 w-4 fill-[#e8920a] text-[#e8920a]" />
              <span className="text-xs font-black sm:text-sm">{streak}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-[#ead9bb] bg-[#f8e7c7] px-2 py-1.5 text-[#6b4d26] sm:px-3">
              <Star className="h-4 w-4 fill-[#e8920a] text-[#e8920a]" />
              <span className="text-xs font-black sm:text-sm">{xp} XP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

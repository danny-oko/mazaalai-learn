import { Flame, Star } from "lucide-react";

type HeaderProps = {
  streak: number;
  xp: number;
};

export const Header = ({ streak, xp }: HeaderProps) => {
  return (
    <div className="fixed inset-x-0 top-4 z-30 flex w-full justify-center px-4 pt-[env(safe-area-inset-top)]">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between rounded-full bg-[#FEFAE8] px-4 py-3 font-['Plus_Jakarta_Sans'] text-[#0F5238] shadow-xl sm:px-5">
          <h1 className="truncate text-sm font-bold sm:text-base">Mazaalai Learn</h1>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-[#E8DFC8] bg-[#F2EEDD] px-2 py-1.5 sm:px-3">
              <Flame className="h-4 w-4 fill-orange-500 text-orange-500" />
              <span className="text-xs font-black sm:text-sm">{streak}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-[#E8DFC8] bg-[#F2EEDD] px-2 py-1.5 sm:px-3">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-black sm:text-sm">{xp} XP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

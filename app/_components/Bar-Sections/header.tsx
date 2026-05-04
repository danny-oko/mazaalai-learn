import { Flame, Heart } from "lucide-react";

type HeaderProps = {
  mistakeCount?: number;
  streak: number;
  xp: number;
};

const MAX_HEARTS = 3;

export const Header = ({
  mistakeCount = MAX_HEARTS,
  streak,
  xp,
}: HeaderProps) => {
  const safeHeartsRemaining = Math.max(0, Math.min(mistakeCount, MAX_HEARTS));
  const isOutOfHearts = safeHeartsRemaining === 0;
  const isStreakLost = xp === 0;

  return (
    <div className="fixed top-4 z-[100] flex w-full justify-center px-4 pt-[env(safe-area-inset-top)]">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between rounded-full px-4 py-3 font-['Plus_Jakarta_Sans'] text-[#0F5238] shadow-xl sm:px-5">
          <h1 className="truncate text-sm font-bold sm:text-base">
            Mazaalai Learn
          </h1>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-[#E8DFC8] bg-[#F2EEDD] px-2 py-1.5 sm:px-3">
              <Flame className="h-4 w-4 fill-orange-500 text-orange-500" />
              <span className="text-xs font-black sm:text-sm">{streak}</span>
            </div>
            <div className="flex items-center gap-1">
              <img
                src="https://d35aaqx5ub95lt.cloudfront.net/images/goals/2b5a211d830a24fab92e291d50f65d1d.svg"
                alt="XP Icon"
                height={30}
                width={30}
              />
              <span className="text-xs font-black sm:text-sm">
                {xp.toLocaleString()} XP
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//

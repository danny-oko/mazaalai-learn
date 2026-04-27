import { Flame, Star } from "lucide-react";

type HeaderProps = {
  streak: number;
  xp: number;
};

export const Header = ({ streak, xp }: HeaderProps) => {
  return (
    <div className="w-full fixed top-4 z-100 md:w-[40%]">
      <div className="flex items-center justify-between bg-[#FEFAE8] shadow-xl rounded-full px-5 py-3 font-['Plus_Jakarta_Sans'] text-[#0F5238]">
        <h1 className="font-bold text-base">Mazaalai Learn</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#F2EEDD] px-3 py-1.5 rounded-full border border-[#E8DFC8]">
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
            <span className="text-sm font-black">{streak}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#F2EEDD] px-3 py-1.5 rounded-full border border-[#E8DFC8]">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-black">{xp} XP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

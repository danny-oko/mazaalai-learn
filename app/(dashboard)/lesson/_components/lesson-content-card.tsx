import { Volume2 } from "lucide-react";
import { LessonContent } from "./lesson-types";

interface LessonContentCardProps {
  item: LessonContent;
  prompt?: string;
}

export function LessonContentCard({ item }: LessonContentCardProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <div className="w-20 h-24 rounded-2xl bg-[#1F2937] flex items-center justify-center text-5xl shrink-0">
          🧑‍🦰
        </div>
        <div className="flex items-center gap-2">
          <div className="relative px-4 py-3 rounded-2xl bg-[#1F2937] border-2 border-[#374151] text-white font-black text-xl">
            <span className="absolute -left-[9px] top-1/2 -translate-y-1/2 border-t-8 border-b-8 border-r-[10px] border-t-transparent border-b-transparent border-r-[#374151]" />
            {item.text}
          </div>
          <button className="w-9 h-9 rounded-full bg-[#1F2937] text-[#6B7280] hover:text-white transition-colors flex items-center justify-center">
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="h-px bg-[#1F2937]" />
    </div>
  );
}

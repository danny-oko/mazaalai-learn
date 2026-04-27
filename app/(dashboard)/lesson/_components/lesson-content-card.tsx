import { Volume2 } from "lucide-react";
import { LessonContent } from "./lesson-types";

interface LessonContentCardProps {
  item: LessonContent;
}

export function LessonContentCard({ item }: LessonContentCardProps) {
  return (
    <>
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-black text-slate-800">{item.text}</h1>
        <button className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center text-[#0F5238] hover:bg-slate-100 transition-colors">
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      <div>
        <p className="text-lg font-black text-slate-800">
          Select the correct pronunciation
        </p>
        <p className="text-sm text-slate-400 mt-0.5">
          Identify the sound of the vowel above
        </p>
      </div>

      <div
        className="w-full rounded-2xl bg-[#F0EDE3] border border-slate-200 flex items-center justify-center relative overflow-hidden"
        style={{ minHeight: 200 }}
      >
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="max-h-40 object-contain" />
        ) : (
          <div className="flex flex-col items-center gap-2 py-10">
            <div className="w-0.5 h-16 bg-[#0F5238]/30 rounded-full" />
            <p className="absolute bottom-4 right-4 text-sm text-slate-300 italic">
              Classical Mongol Script
            </p>
          </div>
        )}
      </div>
    </>
  );
}

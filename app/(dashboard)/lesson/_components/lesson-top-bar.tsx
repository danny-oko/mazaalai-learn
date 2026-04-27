import { Heart, X } from "lucide-react";

interface LessonTopBarProps {
  progress: number;
  hearts: number;
  onBack: () => void;
}

export function LessonTopBar({ progress, hearts, onBack }: LessonTopBarProps) {
  return (
    <div className="flex items-center gap-4 px-5 pt-6 pb-2">
      <button
        onClick={onBack}
        className="text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: "#8B1A1A" }}
        />
      </div>

      <div className="flex items-center gap-1.5">
        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
        <span className="font-black text-slate-700">{hearts}</span>
      </div>
    </div>
  );
}

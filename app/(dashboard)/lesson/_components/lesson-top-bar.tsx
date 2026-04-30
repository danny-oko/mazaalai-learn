import { Heart, X } from "lucide-react";

interface LessonTopBarProps {
  progress: number;
  hearts: number;
  onBack: () => void;
}

export function LessonTopBar({ progress, hearts, onBack }: LessonTopBarProps) {
  return (
    <div className="flex items-center gap-4 px-4 sm:px-8 pt-5 pb-3">
      <button
        onClick={onBack}
        className="text-[#4B5563] hover:text-[#9CA3AF] transition-colors"
      >
        <X className="w-6 h-6" strokeWidth={2.5} />
      </button>
      <div className="flex-1 h-4 rounded-full overflow-hidden bg-[#ECE8D8]">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${Math.max(progress, 2)}%`, background: "#713638" }}
        />
      </div>
      <div className="flex items-center gap-1.5">
        <Heart className="w-5 h-5 fill-[#FF4B4B] text-[#FF4B4B]" />
        <span className="font-black text-base text-[#FF4B4B]">{hearts}</span>
      </div>
    </div>
  );
}

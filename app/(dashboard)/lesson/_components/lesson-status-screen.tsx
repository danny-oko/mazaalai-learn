interface LessonStatusScreenProps {
  message: string;
  description?: string;
  animated?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

export function LessonStatusScreen({
  message,
  description,
  animated = false,
  actionLabel,
  onAction,
}: LessonStatusScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-screen px-5">
      <div className="w-full max-w-md rounded-2x p-6 text-center">
        <p
          className={`text-[#0F5238] font-bold ${animated ? "animate-pulse" : ""}`}
        >
          {message}
        </p>
        {description ? (
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        ) : null}
        {actionLabel && onAction ? (
          <button
            onClick={onAction}
            className="mt-5 w-full py-3 rounded-xl text-sm font-black tracking-widest uppercase text-white bg-[#0F5238] hover:opacity-95 transition-opacity"
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}

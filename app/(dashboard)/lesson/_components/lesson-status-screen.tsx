interface Props {
  message: string;
  description?: string;
  animated?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

export function LessonStatusScreen({
  message,
  description,
  animated,
  actionLabel,
  onAction,
}: Props) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#111827] px-5">
      <div className="w-full max-w-sm text-center">
        <p
          className={`text-lg font-black text-white ${animated ? "animate-pulse" : ""}`}
        >
          {message}
        </p>
        {description && (
          <p className="mt-2 text-sm text-[#6B7280]">{description}</p>
        )}
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="mt-6 w-full py-4 rounded-2xl text-sm font-black tracking-widest uppercase text-white"
            style={{ background: "#58CC02", boxShadow: "0 4px 0 #3A8C01" }}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

import "@fontsource/plus-jakarta-sans";

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
    <div
      className={`flex items-center justify-center min-h-screen px-5 font-['Plus_Jakarta_Sans']`}
    >
      <div className="w-full max-w-sm text-center flex justify-center">
        <p
          className={`text-lg font-black text-black ${animated ? "animate-pulse" : ""}`}
        >
          <img src="/bear.png" alt="Mazaalai Learn" className="animate-spin" />
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

import { CalendarDays, LockKeyhole, UserRound } from "lucide-react";

type SignUpProgressProps = {
  step: number;
};

const steps = [
  { id: 1, icon: UserRound },
  { id: 2, icon: LockKeyhole },
  { id: 3, icon: CalendarDays },
] as const;

export function SignUpProgress({ step }: SignUpProgressProps) {
  return (
    <div
      className="flex items-center justify-center gap-1.5 sm:gap-2"
      aria-label="Sign-up progress"
    >
      {steps.map((item, index) => {
        const Icon = item.icon;
        const isActive = step === item.id;
        const isDone = step > item.id;

        return (
          <div key={item.id} className="flex items-center gap-1.5 sm:gap-2">
            <div
              className={[
                "flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 sm:h-10 sm:w-10",
                isActive
                  ? "scale-105 border-amber-700 bg-amber-700 text-white shadow-md"
                  : isDone
                    ? "border-amber-600 bg-amber-100 text-amber-800"
                    : "border-amber-200 bg-white text-amber-400",
              ].join(" ")}
            >
              <Icon size={14} className="sm:h-4 sm:w-4" />
            </div>
            {index < steps.length - 1 && (
              <div
                className={[
                  "h-0.5 w-7 transition-colors duration-300 sm:w-10",
                  step > item.id ? "bg-amber-600" : "bg-amber-200",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

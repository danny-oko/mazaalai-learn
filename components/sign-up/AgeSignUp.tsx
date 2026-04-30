import { useEffect, useMemo, useRef } from "react";

import { Field, FieldLabel } from "@/components/ui/field";

type AgeSignUpProps = {
  value: string;
  onChange: (value: string) => void;
};

export function AgeSignUp({ value, onChange }: AgeSignUpProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const settleRef = useRef<number | null>(null);
  const rowHeight = 72;
  const ages = useMemo(() => Array.from({ length: 100 }, (_, i) => i + 1), []);
  const selectedAge = Number(value) > 0 ? Number(value) : 24;

  const clampAge = (n: number) => Math.max(1, Math.min(100, n));
  const setAge = (n: number) => onChange(String(clampAge(n)));
  const prevAge = clampAge(selectedAge - 1);
  const nextAge = clampAge(selectedAge + 1);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const targetTop = (selectedAge - 1) * rowHeight;
    if (Math.abs(list.scrollTop - targetTop) < 2) return;
    list.scrollTo({ top: targetTop, behavior: "smooth" });
  }, [selectedAge]);

  const onScroll = () => {
    const list = listRef.current;
    if (!list) return;
    const nextIdx = Math.round(list.scrollTop / rowHeight);
    const nextAgeValue = clampAge(nextIdx + 1);
    if (nextAgeValue !== selectedAge) setAge(nextAgeValue);

    if (settleRef.current) window.clearTimeout(settleRef.current);
    settleRef.current = window.setTimeout(() => {
      list.scrollTo({
        top: (nextAgeValue - 1) * rowHeight,
        behavior: "smooth",
      });
    }, 80);
  };

  return (
    <div className="animate-in slide-in-from-bottom-3 fade-in-0 space-y-3 duration-300 sm:space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-amber-950 sm:text-3xl">
          How old are you?
        </h1>
      </div>
      <Field>
        <FieldLabel
          htmlFor="age"
          className="text-sm font-semibold tracking-wide text-[#E8920A]"
        >
          Age
        </FieldLabel>
        <div
          className="relative mx-auto w-full max-w-md rounded-[24px] border border-amber-200 bg-[#F8F4E3] px-3 py-4 sm:rounded-[28px] sm:px-5 sm:py-6"
          role="spinbutton"
          aria-label="Age picker"
          aria-valuemin={1}
          aria-valuemax={100}
          aria-valuenow={selectedAge}
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") setAge(selectedAge + 1);
            if (e.key === "ArrowUp") setAge(selectedAge - 1);
          }}
        >
          <div className="pointer-events-none absolute inset-x-3 top-0 z-10 h-14 bg-linear-to-b from-[#F8F4E3] to-transparent" />
          <div className="pointer-events-none absolute inset-x-3 bottom-0 z-10 h-14 bg-linear-to-t from-[#F8F4E3] to-transparent" />
          <div className="text-center text-base text-[#E8920A] sm:text-lg">
            •
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1 py-1 sm:gap-2">
            <div className="text-center text-4xl font-medium tabular-nums text-amber-900/55 sm:text-5xl">
              {prevAge}
            </div>
            <div
              id="age"
              ref={listRef}
              onScroll={onScroll}
              className="mx-auto h-16 w-28 snap-y snap-mandatory overflow-y-auto text-center [scrollbar-width:none] sm:h-19.5 sm:w-35 [&::-webkit-scrollbar]:hidden"
            >
              {ages.map((age) => (
                <div
                  key={age}
                  className={[
                    "flex h-16 snap-center items-center justify-center text-6xl font-semibold leading-none tabular-nums transition-all duration-150 sm:h-18 sm:text-8xl",
                    age === selectedAge
                      ? "text-[#E8920A]"
                      : "text-[#E8920A]/40",
                  ].join(" ")}
                  onClick={() => setAge(age)}
                >
                  {age}
                </div>
              ))}
            </div>
            <div className="text-center text-4xl font-medium tabular-nums text-amber-900/55 sm:text-5xl">
              {nextAge}
            </div>
          </div>
          <div className="text-center text-base text-[#E8920A] sm:text-lg">
            •
          </div>
          <div className="mt-1 text-center text-[10px] font-semibold tracking-[0.16em] text-amber-900/70 sm:mt-2 sm:text-xs sm:tracking-[0.2em]">
            SCROLL TO SELECT
          </div>
        </div>
      </Field>
    </div>
  );
}

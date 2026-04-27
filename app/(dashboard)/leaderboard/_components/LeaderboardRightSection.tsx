import { Medal, Users } from "lucide-react";

export function LeaderboardRightSection() {
  return (
    <aside
      className="hidden w-72 shrink-0 space-y-8 lg:block"
      aria-label="Friends and achievements"
    >
      <section>
        <div className="mb-4 flex items-center gap-2 text-[#1C2B4A]">
          <Users className="h-5 w-5" strokeWidth={2} aria-hidden />
          <h2 className="text-base font-bold">Friends</h2>
        </div>
        <ul className="flex flex-col gap-3">
          <li className="flex items-center gap-3 rounded-2xl bg-[#F1EADD] px-4 py-3 shadow-[0_3px_8px_rgba(28,43,74,0.05)] ring-1 ring-[#E3D9C9] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(28,43,74,0.08)]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E5F3EE] text-sm font-bold text-[#1C2B4A]">
              O
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#1C2B4A]">
                Ochir-Erdene
              </p>
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#7C879A]">
                Lesson 14 complete
              </p>
            </div>
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#2E8B6F]"
              title="Online"
              aria-label="Online"
            />
          </li>
          <li className="flex items-center gap-3 rounded-2xl bg-[#F1EADD] px-4 py-3 shadow-[0_3px_8px_rgba(28,43,74,0.05)] ring-1 ring-[#E3D9C9] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(28,43,74,0.08)]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F4DED0] text-sm font-bold text-[#1C2B4A]">
              Z
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#1C2B4A]">
                Zolboo
              </p>
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#7C879A]">
                Practicing vowels
              </p>
            </div>
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#2E8B6F]"
              title="Online"
              aria-label="Online"
            />
          </li>
        </ul>
      </section>

      <section className="rounded-2xl bg-[#F1EADD] p-4 shadow-[0_3px_8px_rgba(28,43,74,0.05)] ring-1 ring-[#E3D9C9]">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#1C2B4A]">Daily XP</h2>
          <span className="text-[11px] font-medium text-[#7C879A]">Last 7 days</span>
        </div>
        <div className="mb-4 flex h-24 items-end gap-2">
          {[36, 58, 44, 72, 66, 84, 78].map((height, index) => (
            <div
              key={index}
              className={
                "w-full rounded-t-md " +
                (index >= 5 ? "bg-[#E8920A]" : "bg-[#2E8B6F]")
              }
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="space-y-3">
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1C2B4A]">XP Progress</span>
              <span className="font-semibold text-[#1C2B4A]">620 / 900</span>
            </div>
            <div className="h-2.5 rounded-full bg-[#E3D9C9]">
              <div className="h-full w-[69%] rounded-full bg-[#2E8B6F] shadow-[0_2px_6px_rgba(46,139,111,0.35)]" />
            </div>
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1C2B4A]">Streak / Fire</span>
              <span className="font-semibold text-[#1C2B4A]">5 days</span>
            </div>
            <div className="h-2.5 rounded-full bg-[#E3D9C9]">
              <div className="h-full w-[50%] rounded-full bg-[#E8920A] shadow-[0_2px_6px_rgba(232,146,10,0.35)]" />
            </div>
          </div>
        </div>
        <button
          type="button"
          className="mt-4 w-full rounded-xl bg-[#E8920A] px-4 py-2.5 text-sm font-semibold text-[#1C2B4A] shadow-[0_8px_16px_rgba(232,146,10,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D98508] hover:shadow-[0_12px_22px_rgba(232,146,10,0.35)] active:translate-y-0 active:shadow-[0_6px_12px_rgba(232,146,10,0.25)]"
        >
          Continue
        </button>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2 text-[#1C2B4A]">
          <Medal className="h-5 w-5" strokeWidth={2} aria-hidden />
          <h2 className="text-base font-bold">Recent Badges</h2>
        </div>
        <div className="flex gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E5F3EE] text-lg shadow-[0_3px_8px_rgba(28,43,74,0.05)] ring-1 ring-[#E3D9C9]">
            ⭐
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F8E5C2] text-lg shadow-[0_3px_8px_rgba(28,43,74,0.05)] ring-1 ring-[#E3D9C9]">
            ⚡
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EFE7DA] text-lg shadow-[0_3px_8px_rgba(28,43,74,0.05)] ring-1 ring-[#E3D9C9]">
            📋
          </div>
        </div>
      </section>
    </aside>
  );
}

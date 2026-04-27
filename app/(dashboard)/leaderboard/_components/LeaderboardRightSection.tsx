import { Medal, Users } from "lucide-react";

export function LeaderboardRightSection() {
  return (
    <aside
      className="hidden w-72 shrink-0 space-y-8 lg:block"
      aria-label="Friends and achievements"
    >
      <section>
        <div className="mb-4 flex items-center gap-2 text-[#1B4332]">
          <Users className="h-5 w-5" strokeWidth={2} aria-hidden />
          <h2 className="text-base font-bold">Friends</h2>
        </div>
        <ul className="flex flex-col gap-3">
          <li className="flex items-center gap-3 rounded-2xl bg-[#FEFAE8] px-4 py-3 shadow-sm ring-1 ring-[#E8DFC8]/80">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C8EDD9] text-sm font-bold text-[#1B4332]">
              O
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#1B4332]">
                Ochir-Erdene
              </p>
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#2F372B]/60">
                Lesson 14 complete
              </p>
            </div>
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#539f7e]"
              title="Online"
              aria-label="Online"
            />
          </li>
          <li className="flex items-center gap-3 rounded-2xl bg-[#FEFAE8] px-4 py-3 shadow-sm ring-1 ring-[#E8DFC8]/80">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5D0D8] text-sm font-bold text-[#1B4332]">
              Z
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#1B4332]">
                Zolboo
              </p>
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#2F372B]/60">
                Practicing vowels
              </p>
            </div>
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#539f7e]"
              title="Online"
              aria-label="Online"
            />
          </li>
        </ul>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2 text-[#1B4332]">
          <Medal className="h-5 w-5" strokeWidth={2} aria-hidden />
          <h2 className="text-base font-bold">Recent Badges</h2>
        </div>
        <div className="flex gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F5EE] text-lg shadow-sm ring-1 ring-[#E8DFC8]/60">
            ⭐
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F2EEDD] text-lg shadow-sm ring-1 ring-[#E8DFC8]/60">
            ⚡
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ECEAD9] text-lg shadow-sm ring-1 ring-[#E8DFC8]/60">
            📋
          </div>
        </div>
      </section>
    </aside>
  );
}

export default function ProfileLoading() {
  return (
    <div className="profile-page-shell min-h-screen bg-[#FFF8E7] pb-24 md:pb-10">
      <div className="mx-auto w-full max-w-[1220px] px-4 pt-5 md:px-6 md:pt-8">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_320px] md:gap-5">
          <div className="space-y-4 md:space-y-5">
            <div className="h-40 animate-pulse rounded-3xl bg-gradient-to-br from-white to-[#fff0d4] shadow-[0_8px_28px_-12px_rgba(232,146,10,0.2)] ring-1 ring-white/60" />
            <div className="h-24 animate-pulse rounded-3xl bg-gradient-to-br from-white to-[#fff4e0] shadow-md ring-1 ring-[#ead9bb]/40" />
            <div className="h-14 animate-pulse rounded-2xl bg-gradient-to-r from-[#faf3e6] to-[#f5ecda] shadow-inner" />
            <div className="h-56 animate-pulse rounded-3xl bg-gradient-to-br from-white to-[#fff8ec] shadow-md ring-1 ring-white/50" />
          </div>
          <div className="hidden space-y-4 md:block">
            <div className="h-40 animate-pulse rounded-3xl bg-gradient-to-br from-white to-[#fff4dc] shadow-md ring-1 ring-[#ead9bb]/30" />
            <div className="h-40 animate-pulse rounded-3xl bg-gradient-to-br from-white to-[#f8fbff] shadow-md ring-1 ring-[#ead9bb]/30" />
          </div>
        </div>
      </div>
    </div>
  );
}

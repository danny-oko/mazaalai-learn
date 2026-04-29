interface PodiumUser {
  rank: 1 | 2 | 3;
  name: string;
  xp: number;
  avatarUrl?: string;
}

interface PodiumSectionProps {
  users: PodiumUser[];
}

function Avatar({
  rank,
  avatarUrl,
  name,
}: {
  rank: 1 | 2 | 3;
  avatarUrl?: string;
  name: string;
}) {
  const isFirst = rank === 1;

  return (
    <div className="relative">
      <div
        className={`rounded-full bg-[#D3C4A8] flex items-center justify-center overflow-hidden ${
          isFirst
            ? "w-16 h-16 border-[3px] border-[#E8940A]"
            : "w-12 h-12 border-2 border-[#C8B89A]"
        }`}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs text-[#7a6a50]">{name[0]}</span>
        )}
      </div>
      <div
        className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-white ${
          rank === 1 ? "bg-[#E8940A]" : "bg-[#A89070]"
        }`}
      >
        {rank}
      </div>
    </div>
  );
}

function PodiumPerson({ user }: { user: PodiumUser }) {
  const isFirst = user.rank === 1;

  return (
    <div className="flex flex-col items-center gap-1">
      <Avatar rank={user.rank} avatarUrl={user.avatarUrl} name={user.name} />

      <p
        className={`mt-2.5 font-medium text-[#222] ${isFirst ? "text-[15px] font-bold" : "text-xs"}`}
      >
        {user.name}
      </p>

      {isFirst ? (
        <div className="bg-[#E8940A] rounded-2xl px-5 py-2.5 text-center mt-1">
          <div className="text-2xl font-bold text-white">
            {user.xp.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#FDE8BC]">XP</div>
        </div>
      ) : (
        <>
          <div className="text-sm font-bold text-[#E8940A]">
            {user.xp.toLocaleString()}
          </div>
          <div className="text-[10px] text-[#999]">XP</div>
        </>
      )}
    </div>
  );
}

export default function PodiumSection({ users }: PodiumSectionProps) {
  const first = users.find((u) => u.rank === 1)!;
  const second = users.find((u) => u.rank === 2)!;
  const third = users.find((u) => u.rank === 3)!;

  return (
    <div className="mx-4 mt-3 bg-white rounded-2xl border border-[#E8D9C0] px-3 pt-4 pb-5">
      {/* Дээрх ⭐ */}
      <div className="flex justify-center mb-3">
        <div className="w-7 h-7 bg-[#E8940A] rounded-full flex items-center justify-center text-sm">
          ⭐
        </div>
      </div>

      {/* Тавцан */}
      <div className="flex items-end justify-center gap-2">
        <PodiumPerson user={second} />
        <PodiumPerson user={first} />
        <PodiumPerson user={third} />
      </div>
    </div>
  );
}

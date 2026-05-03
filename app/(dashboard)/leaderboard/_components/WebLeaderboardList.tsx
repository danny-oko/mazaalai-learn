interface WebLeaderboardUser {
  rank: number;
  name: string;
  title: string;
  xp: number;
  xpChange?: number;
  avatarUrl?: string;
  isMe?: boolean;
  isNew?: boolean;
}

interface WebLeaderboardListProps {
  users: WebLeaderboardUser[];
  maxXp?: number;
}

function WebListItem({
  user,
  maxXp,
}: {
  user: WebLeaderboardUser;
  maxXp: number;
}) {
  const progressPercent = Math.min((user.xp / maxXp) * 100, 100);

  return (
    <div
      className={`flex items-center gap-4 px-4 py-3 rounded-2xl ${
        user.isMe
          ? "bg-[#EEF7EE] border border-[#A8D5A8]"
          : "bg-white border border-[#E8D9C0]"
      }`}
    >
      {/* Дугаар */}
      <span className="text-sm font-semibold text-[#888] w-5 shrink-0">
        {user.rank}
      </span>

      {/* Avatar */}
      <div
        className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-sm font-bold ${
          user.isMe ? "bg-[#E8940A] text-white" : "bg-[#D3C4A8] text-[#7a6a50]"
        }`}
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          user.name[0]
        )}
      </div>

      {/* Нэр + цол */}
      <div className="w-36 shrink-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold text-[#222] truncate">
            {user.name}
          </p>
          {user.isNew && (
            <span className="bg-green-100 text-green-600 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
              NEW
            </span>
          )}
        </div>
        <p className="text-[10px] text-[#999] uppercase tracking-wide">
          {user.title}
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex-1">
        <div className="w-full bg-[#F4EFE8] rounded-full h-2">
          <div
            className="bg-[#E8940A] h-2 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* XP + өөрчлөлт */}
      <div className="text-right shrink-0 w-20">
        <p className="text-sm font-bold text-[#E8940A]">
          {user.xp.toLocaleString()} XP
        </p>
        {user.xpChange !== undefined && (
          <p
            className={`text-[10px] font-medium ${user.xpChange >= 0 ? "text-green-500" : "text-red-400"}`}
          >
            {user.xpChange >= 0 ? "▲" : "▼"} {Math.abs(user.xpChange)}
          </p>
        )}
      </div>
    </div>
  );
}

export default function WebLeaderboardList({
  users,
  maxXp,
}: WebLeaderboardListProps) {
  const max = maxXp ?? Math.max(...users.map((u) => u.xp));

  return (
    <div className="flex flex-col gap-2">
      {users.map((user) => (
        <WebListItem key={user.rank} user={user} maxXp={max} />
      ))}
    </div>
  );
}

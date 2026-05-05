"use client";

import { useMemo, useState } from "react";

interface LeaderboardUser {
  rank: number;
  name: string;
  title: string;
  xp: number;
  avatarUrl?: string;
  isMe?: boolean;
}

interface LeaderboardListProps {
  users: LeaderboardUser[];
  initialVisibleCount?: number;
  loadStep?: number;
}

function ListItem({ user }: { user: LeaderboardUser }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${
        user.isMe ? "bg-[#E8940A]" : "bg-white border border-[#E8D9C0]"
      }`}
    >
      <span
        className={`text-base font-semibold w-5 shrink-0 ${
          user.isMe ? "text-[#FFF8EE]" : "text-[#888]"
        }`}
      >
        {user.rank}
      </span>

      <div
        className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center overflow-hidden ${
          user.isMe ? "bg-[#C47F17] border-2 border-white" : "bg-[#D3C4A8]"
        }`}
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span
            className={`text-xs font-medium ${user.isMe ? "text-white" : "text-[#7a6a50]"}`}
          >
            {user.name[0]}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-semibold truncate ${user.isMe ? "text-white" : "text-[#222]"}`}
        >
          {user.name}
        </p>
        <p
          className={`text-[10px] font-medium uppercase tracking-wide ${user.isMe ? "text-[#FDE8BC]" : "text-[#999]"}`}
        >
          {user.title}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p
          className={`text-sm font-bold ${user.isMe ? "text-white" : "text-[#E8940A]"}`}
        >
          {user.xp.toLocaleString()}
        </p>
        <p
          className={`text-[10px] ${user.isMe ? "text-[#FDE8BC]" : "text-[#aaa]"}`}
        >
          XP
        </p>
      </div>
    </div>
  );
}

export default function LeaderboardList({
  users,
  initialVisibleCount = 4,
  loadStep = 4,
}: LeaderboardListProps) {
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const visibleUsers = useMemo(
    () => users.slice(0, visibleCount),
    [users, visibleCount],
  );
  const hasMore = visibleCount < users.length;

  return (
    <div className="mx-4 mt-3 flex flex-col gap-2">
      {visibleUsers.map((user) => (
        <ListItem key={user.rank} user={user} />
      ))}
      {hasMore && (
        <button
          type="button"
          onClick={() => setVisibleCount((current) => current + loadStep)}
          className="mt-2 self-center rounded-xl border border-[#D7B680] bg-[#F3E0BD] px-5 py-2 text-sm font-semibold text-[#7A5C2E] transition hover:bg-[#EFD4A2]"
        >
          Load more
        </button>
      )}
    </div>
  );
}

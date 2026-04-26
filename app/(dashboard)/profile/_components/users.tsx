"use client";

import { useEffect, useState } from "react";
import { User } from "../common/types";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Өгөгдөл татахад алдаа гарлаа:", error);
      }
    };

    fetchFavorites();
  }, []);

  if (loading)
    return (
      <p className="text-[#2F372B]" lang="mn">
        Уншиж байна ...
      </p>
    );

  return (
    <div className="mx-auto w-full max-w-lg">
      <h1 className="text-xl font-bold text-[#2D6A4F] sm:text-2xl">Profile</h1>
      <ul className="mt-6 flex flex-col gap-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex gap-4 rounded-2xl border border-[#E8DFC8] bg-[#FEFAE8] p-4 shadow-sm"
          >
            <div className="inline-flex h-14 w-14 shrink-0 overflow-hidden rounded-full border-4 border-[#1d5d42] bg-black sm:h-16 sm:w-16">
              <img
                src={user.avatarUrl ?? ""}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-[#2F372B]">{user.name}</p>
              <p className="truncate text-sm text-[#2F372B]/70">@{user.userName}</p>
              <p className="mt-2 text-sm font-bold text-[#0F5238]">
                {user.totalXp.toLocaleString()} XP
              </p>
              <p className="mt-1 text-sm font-medium text-[#1D5B5E]">{user.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

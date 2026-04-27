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
    <div>
      <h1 className="border border-red-500">Profile</h1>
      {users.map((user) => (
        <div key={user.id}>
          <div className="inline-flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-4 border-[#1d5d42] bg-black">
            <img
              src={user.avatarUrl ?? ""}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          </div>
          <p>{user.name}</p>
          <p>@{user.userName}</p>
          <p>{user.totalXp} XP</p>
          <p className="text-muted-foreground">{user.title}</p>
        </div>
      ))}
    </div>
  );
}

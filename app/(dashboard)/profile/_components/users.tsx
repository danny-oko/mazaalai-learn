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

  if (loading) return <p>Уншиж байна ...</p>;

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <img
            src={user.avatarUrl ?? ""}
            alt={user.name}
            width={40}
            height={40}
          />
          <p>{user.name}</p>
          <p>@{user.userName}</p>
          <p>{user.totalXp} XP</p>
        </div>
      ))}
    </div>
  );
}

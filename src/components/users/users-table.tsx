"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function UserTable() {
  const { data: users, refetch } = useQuery(["users"], async () => {
    const res = await fetch("/api/users");
    return res.json();
  });

  return (
    <div>
      <h1>User Management</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

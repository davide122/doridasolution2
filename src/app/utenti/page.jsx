"use client"
import { useEffect, useState } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            Email: {user.email}, Phone: {user.phone}, Info: {user.info}
          </li>
        ))}
      </ul>
    </div>
  );
}

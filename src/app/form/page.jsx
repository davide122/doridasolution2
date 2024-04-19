"use client"
import { useEffect, useState } from 'react';

export default function FormPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const [info, setInfo] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/form');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data); // Assumi che il JSON ritornato sia un array di utenti
      setError('');
    } catch (error) {
      setError('Failed to fetch users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect per caricare gli utenti quando il componente viene montato
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/form/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, phone, info }),
    });
    if (response.ok) {
      alert('User added successfully!');
      // Reset form or handle accordingly
    } else {
        alert(`Failed to add user: ${errorData.message}`);
    }
  };

  return (
  <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label htmlFor="phone">Phone:</label>
      <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

      <label htmlFor="info">Info:</label>
      <textarea id="info" value={info} onChange={(e) => setInfo(e.target.value)}></textarea>

      <button type="submit">Submit</button>
    </form>

<div>
<h1>User List</h1>
{loading ? (
  <p>Loading...</p>
) : error ? (
  <p style={{ color: 'red' }}>{error}</p>
) : (
  <ul>
    {users.map((user) => (
      <li key={user.id}>
        Email: {user.email}, Phone: {user.phone}, Info: {user.info}
      </li>
    ))}
  </ul>
)}
</div>
  </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png'
export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:4000/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="App">
  <Link to="/home">
    <img src={logo} alt="Logo" className="logo" />
  </Link>
    <Link to="/programare" className="programare-btn">
        <svg
          className="btn-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5C3.9 3 3 .9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
        </svg>
        Programare
      </Link>
  <div className="card">
    <header className="card-header">
      <h1>Contul meu</h1>
    </header>

    {user ? (
      <section className="card-body">
        <dl className="info-list">
          <dt>Nume:</dt>
          <dd>{user.nume}</dd>
          <dt>Prenume:</dt>
          <dd>{user.prenume}</dd>
          <dt>Email:</dt>
          <dd>{user.email}</dd>
        </dl>
      </section>
    ) : (
      <p className="loading">Se încarcă…</p>
    )}
  </div>
</div>
  )
}
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const res = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      
      localStorage.setItem('token', data.token);
      alert('Autentificat cu succes!');
      setEmail('');
      setPassword('');
    } else {
      alert(data.error);
    }
  };

  return (
    <div>
      <h2>Autentificare</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Parolă"
      />
      <button onClick={login}>Autentifică-te</button>
    </div>
  );
}

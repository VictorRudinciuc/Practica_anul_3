import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = password =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);

  const register = async () => {
    if (!validateEmail(email)) {
      alert('Emailul introdus nu este valid , Exemplu: exemplu@mail.com.');
      return;
    }

    if (!validatePassword(password)) {
      alert('Parola trebuie să aibă minim 8 caractere, o literă mare, un număr și un caracter special.');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      alert(data.message || data.error);
    } catch (err) {
      alert('Eroare la conectarea cu serverul.');
    }
  };

  return (
    <div>
      <h2>Înregistrare</h2>
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
      <button onClick={register}>Înregistrează-te</button>
    </div>
  );
}

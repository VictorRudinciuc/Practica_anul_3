import { useState } from 'react';

export default function Register() {
  const [nume, setNume] = useState('');
  const [prenume, setPrenume] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = password =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);

  const register = async () => {
    if (!nume || !prenume) {
      alert('Te rugăm să introduci atât numele, cât și prenumele.');
      return;
    }
    if (!validateEmail(email)) {
      alert('Email invalid. Ex: exemplu@mail.com');
      return;
    }
    if (!validatePassword(password)) {
      alert('Parolă prea slabă. Minim 8 caractere, o majusculă, o cifră și un simbol.');
      return;
    }

    const res = await fetch('http://localhost:4000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nume, prenume, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      
      setNume('');
      setPrenume('');
      setEmail('');
      setPassword('');
    } else {
      alert(data.error);
    }
  };

  return (
    <div>
      <h2>Înregistrare</h2>
      <input
        type="text"
        value={nume}
        onChange={e => setNume(e.target.value)}
        placeholder="Nume"
      />
      <input
        type="text"
        value={prenume}
        onChange={e => setPrenume(e.target.value)}
        placeholder="Prenume"
      />
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

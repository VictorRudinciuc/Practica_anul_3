import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [nume, setNume] = useState('');
  const [prenume, setPrenume] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = password =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);

  const register = async () => {
    if (!nume.trim() || !prenume.trim()) {
      alert('Te rugăm să completezi numele și prenumele.');
      return;
    }
    if (!validateEmail(email)) {
      alert('Te rugăm să introduci un email valid.');
      return;
    }
    if (!validatePassword(password)) {
      alert('Parola trebuie să aibă minim 8 caractere, cel puțin o literă mare, o cifră și un caracter special.');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nume, prenume, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Înregistrare realizată cu succes!');
        navigate('/login');
      } else {
        alert(data.message || 'A apărut o eroare la înregistrare.');
      }
    } catch (err) {
      console.error(err);
      alert('Eroare la înregistrare. Încearcă din nou.');
    }
  };

  return (
    <div className="App">
      <div className="card">
        <h1>Înregistrare</h1>
        <div className="form-group">
          <label htmlFor="nume">Nume</label>
          <input
            id="nume"
            type="text"
            value={nume}
            onChange={e => setNume(e.target.value)}
            placeholder="Nume"
          />
        </div>
        <div className="form-group">
          <label htmlFor="prenume">Prenume</label>
          <input
            id="prenume"
            type="text"
            value={prenume}
            onChange={e => setPrenume(e.target.value)}
            placeholder="Prenume"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Parolă</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Parolă"
          />
        </div>
        <button onClick={register} className="submit-btn">
          Înregistrează-te
        </button>
      </div>
    </div>
  );
}

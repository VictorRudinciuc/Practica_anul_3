import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from './logo.png'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // Salvează tokenul și redirecționează
        localStorage.setItem('token', data.token);
        navigate('/dashboard'); 
      } else {
        // Afișează mesajul de eroare de la server
        alert(data.message || 'Date de autentificare invalide');
      }
    } catch (err) {
      console.error(err);
      alert('Eroare la conectare. Încearcă din nou.');
    }
  };

  return (
    <div className="App">
      <Link to="/home">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <div className="card">
        <h1>Autentificare</h1>
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
        <button onClick={login} className="submit-btn">
          Autentifică-te
        </button>
      </div>
    </div>
  );
}

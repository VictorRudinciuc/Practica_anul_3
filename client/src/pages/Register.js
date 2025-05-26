import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

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
    if (!validateEmail(email)) {
      alert("Email invalid");
      return;
    }
    if (!validatePassword(password)) {
      alert("Parola trebuie să aibă cel puțin 8 caractere, o literă mare, o cifră și un caracter special.");
      return;
    }
    const res = await fetch('http://localhost:4000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nume, prenume, email, password }),
    });
    if (res.ok) {
      alert("Înregistrare reușită!");
      navigate('/login');
    } else {
      alert("A apărut o eroare.");
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Înregistrare
        </Typography>
        <TextField
          fullWidth
          label="Nume"
          value={nume}
          onChange={e => setNume(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Prenume"
          value={prenume}
          onChange={e => setPrenume(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Parolă"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={register}
          fullWidth
        >
          Înregistrează-te
        </Button>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Ai deja un cont?{' '}
            <Button component={RouterLink} to="/login" variant="text">
              Autentifică-te
            </Button>
          </Typography>
          <Typography variant="body2">
            <Button component={RouterLink} to="/home" variant="text">
              Înapoi la Home
            </Button>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

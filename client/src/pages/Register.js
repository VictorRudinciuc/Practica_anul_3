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

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);

  const emailError = email !== '' && !validateEmail(email);
  const passwordError = password !== '' && !validatePassword(password);

  const isFormValid =
    nume.trim() !== '' &&
    prenume.trim() !== '' &&
    validateEmail(email) &&
    validatePassword(password);

  const register = async () => {
    const res = await fetch('http://localhost:4000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nume, prenume, email, password }),
    });
    if (res.ok) {
      navigate('/login');
    } else {
      const err = await res.json();
      alert('A apărut o eroare: ' + (err.error || res.statusText));
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
          required
        />

        <TextField
          fullWidth
          label="Prenume"
          value={prenume}
          onChange={e => setPrenume(e.target.value)}
          sx={{ mb: 2 }}
          required
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          sx={{ mb: 2 }}
          required
          error={emailError}
          helperText={emailError ? 'Introdu un email valid.' : ''}
        />

        <TextField
          fullWidth
          label="Parolă"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{ mb: 2 }}
          required
          error={passwordError}
          helperText={
            passwordError
              ? 'Parola trebuie ≥8 caractere, o literă mare, o cifră şi un caracter special.'
              : ''
          }
        />

        <Button
          variant="contained"
          color="primary"
          onClick={register}
          fullWidth
          disabled={!isFormValid}
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

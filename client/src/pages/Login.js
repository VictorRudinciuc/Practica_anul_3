import React, { useState , useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
  const token = localStorage.getItem('token');
   if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const login = async () => {
    const res = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      const userRes = await fetch('http://localhost:4000/auth', {
        headers: { Authorization: `Bearer ${data.token}` },
     });
      if (userRes.ok) {
        const user = await userRes.json();
        localStorage.setItem('nume', user.nume);
        localStorage.setItem('prenume', user.prenume);
      }
      navigate('/dashboard');
    } else {
      alert("E-mail sau parolă incorectă.");
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Autentificare
        </Typography>
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
          onClick={login}
          fullWidth
        >
          Autentifică-te
        </Button>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Nu ai un cont?{' '}
            <Button component={RouterLink} to="/register" variant="text">
              Înregistrează-te
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

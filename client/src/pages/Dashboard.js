import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/home');
  };

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Contul meu
        </Typography>
        {user ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Nume:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{user.nume}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Prenume:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{user.prenume}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2">Email:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{user.email}</Typography>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
              sx={{ mt: 2 }}
            >
              Deconectare
            </Button>
          </>
        ) : (
          <Typography>Se încarcă…</Typography>
        )}
      </CardContent>
    </Card>
  );
}

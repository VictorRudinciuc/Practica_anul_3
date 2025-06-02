import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [programari, setProgramari] = useState([]);
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
      } else {
        navigate('/home');
      }
    };
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchProgramari = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:4000/programari/mine', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProgramari(data);
      }
    };
    fetchProgramari();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/home');
  };

  return (
    <Card sx={{ p: 3, maxWidth: 700, m: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Contul meu
        </Typography>

        {user ? (
          <>
            <Grid container spacing={2} mb={3}>
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

            <Typography variant="h6" gutterBottom>
              Programările mele
            </Typography>
            {programari.length > 0 ? (
              <List>
                {programari.map((p) => (
                  <React.Fragment key={p.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={`${p.serviciu} - ${p.locatie}`}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              Data: {new Date(p.data_programare).toLocaleDateString('ro-RO')}
                            </Typography>
                            {' — '}
                            <Typography component="span" variant="body2">
                              Ora: {p.ora.substring(0,5)}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography>Nu ai nicio programare.</Typography>
            )}

            <Grid container spacing={2} mt={3}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogout}
                >
                  Deconectare
                </Button>
              </Grid>
              {user.is_admin && (
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/admin')}
                  >
                    Panou Admin
                  </Button>
                </Grid>
              )}
            </Grid>
          </>
        ) : (
          <Typography>Se încarcă…</Typography>
        )}
      </CardContent>
    </Card>
  );
}

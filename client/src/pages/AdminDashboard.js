import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardContent, Typography,
  List, ListItem, Button,
} from '@mui/material';

export default function AdminDashboard() {
  const [programari, setProgramari] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:4000/programari/all', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => setProgramari(data))
    .catch(() => navigate('/login'));
  }, [navigate, token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Șterge această programare?')) return;
    await fetch(`http://localhost:4000/programari/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setProgramari(p => p.filter(x => x.id !== id));
  };

  return (
    <Card sx={{ maxWidth: 600, m: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5">Panou Admin</Typography>
        <List>
          {programari.map((p) => (
  <ListItem
    key={p.id}
    secondaryAction={
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(`/admin/edit/${p.id}`)}
        >
          Editează
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(p.id)}
        >
          Șterge
        </Button>
      </div>
    }
  >
    <Typography>
      {p.data_programare} @ {p.ora} — {p.nume} {p.prenume}
    </Typography>
  </ListItem>
))}

    
        </List>
      </CardContent>
    </Card>
  );
}

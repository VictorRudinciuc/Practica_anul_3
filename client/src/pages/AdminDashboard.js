
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const ProgramareRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export default function AdminDashboard() {
  const [programari, setProgramari] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:4000/programari/all', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
          return [];
        }
        return res.json();
      })
      .then((data) => {
        setProgramari(data);
      })
      .catch((err) => {
        console.error('Eroare la fetch programări:', err);
        navigate('/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate, token]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Șterge această programare?');
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:4000/programari/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setProgramari((prev) => prev.filter((p) => p.id !== id));
      } else {
        console.error('Eroare la ștergerea programării:', await res.text());
        alert('Nu s‑a putut șterge programarea.');
      }
    } catch (err) {
      console.error(err);
      alert('Eroare de comunicare cu serverul.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 700,
        margin: 'auto',
        mt: 4,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Panou Admin
        </Typography>

        {loading ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : programari.length === 0 ? (
          <Typography sx={{ mt: 2 }}>Nu există programări.</Typography>
        ) : (
          <Box>
            {programari.map((p) => (
              <React.Fragment key={p.id}>
                <ProgramareRow>
                  <Box>
                    <Typography>
                      {p.data_programare} @ {p.ora} — {p.nume} {p.prenume}
                    </Typography>
                  </Box>

                  <Box>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleEdit(p.id)}
                        >
                          Editează
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(p.id)}
                        >
                          Șterge
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </ProgramareRow>
              </React.Fragment>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

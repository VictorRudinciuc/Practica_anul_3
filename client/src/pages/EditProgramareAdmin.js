import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Grid,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

export default function EditProgramareAdmin() {
  const { id } = useParams();         
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [form, setForm] = useState({
    idnp: '',
    nume: '',
    prenume: '',
    dataNasterii: null,
    telefon: '',
    serviciu: '',
    locatie: '',
    data: null,  
    ora: '',
  });

  const [takenSlots, setTakenSlots] = useState([]);

  const services = [
    'Buletin de identitate',
    'Pașaport simplu',
    'Pașaport diplomatic',
  ];
  const locations = [
    'Chișinău – Centru',
    'Chișinău – Buiucani',
    'Bălți',
    'Cahul',
  ];
  const allTimes = [
    '08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'
  ];

  useEffect(() => {
    fetch(`http://localhost:4000/programari/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (res.status === 403 || res.status === 401) {
          navigate('/dashboard');
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (!data) return;
        setForm({
          idnp: data.idnp,
          nume: data.nume,
          prenume: data.prenume,
          dataNasterii: new Date(data.data_nasterii),
          telefon: data.telefon,
          serviciu: data.serviciu,
          locatie: data.locatie,
          data: new Date(data.data_programare),
          ora: data.ora,
        });
      })
      .catch(() => navigate('/dashboard'));
  }, [id, navigate, token]);

  useEffect(() => {
    if (!form.data || !form.serviciu) return;
    const dateStr = format(new Date(form.data), 'yyyy-MM-dd');
    fetch(
      `http://localhost:4000/programari?data=${dateStr}&serviciu=${encodeURIComponent(form.serviciu)}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then(res => res.json())
      .then(data => setTakenSlots(data.map(r => r.ora)))
      .catch(console.error);
  }, [form.data, form.serviciu, token]);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };
  const handleDate = (field) => (date) => {
    setForm({ ...form, [field]: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      dataNasterii: format(new Date(form.dataNasterii), 'yyyy-MM-dd'),
      data: format(new Date(form.data), 'yyyy-MM-dd'),
    };

    try {
      const res = await fetch(`http://localhost:4000/programari/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        navigate('/admin');
      } else {
        const err = await res.json();
        alert(`Eroare la actualizare: ${err.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('Eroare server.');
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Editează Programarea #{id}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="IDNP"
                fullWidth
                required
                value={form.idnp}
                onChange={handleChange('idnp')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nume"
                fullWidth
                required
                value={form.nume}
                onChange={handleChange('nume')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Prenume"
                fullWidth
                required
                value={form.prenume}
                onChange={handleChange('prenume')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Telefon"
                fullWidth
                required
                value={form.telefon}
                onChange={handleChange('telefon')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data nașterii"
                  value={form.dataNasterii}
                  onChange={handleDate('dataNasterii')}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth required />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Serviciul solicitat"
                fullWidth
                required
                value={form.serviciu}
                onChange={handleChange('serviciu')}
              >
                {services.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Locație"
                fullWidth
                required
                value={form.locatie}
                onChange={handleChange('locatie')}
              >
                {locations.map((loc) => (
                  <MenuItem key={loc} value={loc}>
                    {loc}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data programării"
                  value={form.data}
                  onChange={handleDate('data')}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth required />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Ora"
                fullWidth
                required
                value={form.ora}
                onChange={handleChange('ora')}
              >
                {allTimes.map((t) => (
                  <MenuItem
                    key={t}
                    value={t}
                    disabled={
                      takenSlots.includes(t) && t !== form.ora
                    }
                  >
                    {t}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit" fullWidth>
                Salvare modificări
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/admin')}
              >
                Anulează
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

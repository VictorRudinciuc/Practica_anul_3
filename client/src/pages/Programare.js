import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function Programare() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetch('http://localhost:4000/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (res.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);

  useEffect(() => {
    if (form.data && form.serviciu && !loading) {
      const dateStr = format(form.data, 'yyyy-MM-dd');
      fetch(
        `http://localhost:4000/programari?data=${dateStr}&serviciu=${encodeURIComponent(
          form.serviciu
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setTakenSlots(data.map((r) => r.ora));
        })
        .catch(console.error);
    }
  }, [form.data, form.serviciu, loading]);

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
      dataNasterii: format(form.dataNasterii, 'yyyy-MM-dd'),
      data: format(form.data, 'yyyy-MM-dd'),
    };
    const res = await fetch('http://localhost:4000/programari', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      navigate('/dashboard');
      alert('Programare creată cu succes!');
      setForm({
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
    } else if (res.status === 401) {
      localStorage.removeItem('token');
      navigate('/login');
    } else {
      const err = await res.json();
      alert('Eroare: ' + err.error);
    }
  };

  if (loading) {
    return (
      <Card sx={{ p: 3 }}>
        <CardContent>
          <Typography>Se verifică autentificarea…</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Programare Servicii Publice
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {[
              { label: 'IDNP', field: 'idnp' },
              { label: 'Nume', field: 'nume' },
              { label: 'Prenume', field: 'prenume' },
              { label: 'Telefon', field: 'telefon' },
            ].map(({ label, field }) => (
              <Grid item xs={12} sm={6} key={field}>
                <TextField
                  label={label}
                  fullWidth
                  required
                  value={form[field]}
                  onChange={handleChange(field)}
                />
              </Grid>
            ))}

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
                label="Locația"
                fullWidth
                required
                value={form.locatie}
                onChange={handleChange('locatie')}
              >
                {locations.map((l) => (
                  <MenuItem key={l} value={l}>
                    {l}
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
                  <MenuItem key={t} value={t} disabled={takenSlots.includes(t)}>
                    {t} {takenSlots.includes(t) && '(ocupat)'}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                Trimite programare
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

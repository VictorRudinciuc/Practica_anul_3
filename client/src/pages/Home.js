import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <Card sx={{ p: 3, textAlign: 'center' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Servicii Publice
        </Typography>
        <Button
          component={Link}
          to="/register"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 1 }}
        >
          Înregistrează-te
        </Button>
        <Button
          component={Link}
          to="/login"
          variant="outlined"
          color="primary"
          fullWidth
        >
          Autentifică-te
        </Button>
      </CardContent>
    </Card>
  );
}

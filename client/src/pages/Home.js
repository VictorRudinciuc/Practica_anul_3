import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

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
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => {
            const token = localStorage.getItem('token');
            if (token) {
              navigate('/dashboard');
            } else {
              navigate('/login');
            }
          }}
        >
          Autentifică-te
        </Button>
      </CardContent>
    </Card>
  );
}

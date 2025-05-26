import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Programare() {
  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Pagina Programare
        </Typography>
        <Typography>
          Aici veți putea programa serviciile publice.
        </Typography>
      </CardContent>
    </Card>
  );
}

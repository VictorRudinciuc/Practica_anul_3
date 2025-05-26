
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Programare from './pages/Programare';
import logo from './pages/logo.png'; 

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button component="a" href="/home" sx={{ p: 0 }}>
            <img src={logo} alt="Logo" style={{ width: 40, marginRight: 8 }} />
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Servicii Publice
          </Typography>
          <Button color="inherit" href="/programare">
            Programează
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/programare" element={<Programare />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

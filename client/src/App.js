import React, { useState, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { getTheme } from './Theme';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Programare from './pages/Programare';
import logo from './pages/logo.png';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => getTheme(mode), [mode]);


  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button component="a" href="/home" sx={{ p: 0 }}>
              <img src={logo} alt="Logo" style={{ width: 40, marginRight: 8 }} />
            </Button>
            <Typography variant="h6">Servicii Publice</Typography>
            
          </div>
          <div>
            <IconButton color="inherit" onClick={toggleMode}>
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <Button color="inherit" href="/programare">
              Programează
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/programare" element={<Programare />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
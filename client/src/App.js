import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './index.css';
import './App.css';

import Home     from './pages/Home';
import Register from './pages/Register';
import Login    from './pages/Login';
import Dashboard from './pages/Dashboard';
import Programare from './pages/Programare';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home"     element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login"    element={<Login />} />
      <Route path="/dashboard"element={<Dashboard/>} />
      <Route path="/programare"element={<Programare/>} />
    </Routes>
  );
}

export default App;

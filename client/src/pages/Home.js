// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png'
export default function Home() {
  return (
    
    <div className="App">
      <Link to="/home">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <div className="card">
        <h1>Servicii Publice</h1>
        <div className="button-group">
          <Link to="/register">
            <button className="btn btn-primary">Înregistrează-te</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-secondary">Autentifică-te</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

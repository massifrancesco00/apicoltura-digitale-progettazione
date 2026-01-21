// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SceltaApiario from './SceltaApiario';
import Home from './Home';
import Valore from './Valore';
import Impostazioni from './Impostazioni';
import Errore from './Errore';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/selezione" element={<SceltaApiario />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dettaglio/:type" element={<Valore />} />
        <Route path="/impostazioni" element={<Impostazioni />} />
        <Route path="*" element={<Errore />} />
      </Routes>
    </Router>
  );
}
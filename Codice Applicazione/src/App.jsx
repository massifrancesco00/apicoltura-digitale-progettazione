import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa TUTTE le pagine
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
        {/* Pagina Iniziale (Login) */}
        <Route path="/" element={<Login />} />

        {/* Pagina successiva al Login */}
        <Route path="/selezione" element={<SceltaApiario />} />

        {/* Dashboard principale */}
        <Route path="/home" element={<Home />} />

        {/* Dettaglio grafici */}
        <Route path="/dettaglio/:type" element={<Valore />} />

        {/* Impostazioni */}
        <Route path="/impostazioni" element={<Impostazioni />} />

        {/* Pagina 404 per indirizzi sbagliati */}
        <Route path="*" element={<Errore />} />
      </Routes>
    </Router>
  );
}
import React, { useState } from 'react';
import BarraLaterale from './components/BarraLaterale';
import Intestazione from './components/Intestazione';
import PannelloControllo from './components/PannelloControllo';
import VistaGrafici from './components/VistaGrafici';
import VistaImpostazioni from './components/VistaImpostazioni';
import ModaleErrore from './components/ModaleErrore';
import './App.css';

function App() {
  const [vistaCorrente, setVistaCorrente] = useState('home');
  const [utenteCorrente, setUtenteCorrente] = useState('Utente');
  const [mostraErrore, setMostraErrore] = useState(false);
  const [barraLateraleAperta, setBarraLateraleAperta] = useState(true);

  return (
    <div className="app">
      <BarraLaterale 
        vistaCorrente={vistaCorrente}
        onCambioVista={setVistaCorrente}
        aperta={barraLateraleAperta}
        onToggle={() => setBarraLateraleAperta(!barraLateraleAperta)}
      />
      
      <div className={`contenuto-principale ${!barraLateraleAperta ? 'barra-chiusa' : ''}`}>
        <Intestazione utenteCorrente={utenteCorrente} />
        
        <div className="area-contenuto">
          {vistaCorrente === 'home' && <PannelloControllo />}
          {vistaCorrente === 'grafici' && <VistaGrafici />}
          {vistaCorrente === 'impostazioni' && <VistaImpostazioni />}
        </div>
      </div>

      {mostraErrore && (
        <ModaleErrore 
          onRiprova={() => setMostraErrore(false)}
          onEsci={() => setMostraErrore(false)}
        />
      )}
    </div>
  );
}

export default App;
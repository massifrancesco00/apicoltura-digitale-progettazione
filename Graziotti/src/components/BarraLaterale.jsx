import React from 'react';
import { Home, BarChart2, Settings, LogOut } from 'lucide-react';
import './BarraLaterale.css';

function BarraLaterale({ vistaCorrente, onCambioVista, aperta, onToggle }) {
  const vociMenu = [
    { id: 'home', icona: Home, etichetta: 'Home' },
    { id: 'grafici', icona: BarChart2, etichetta: 'Grafici' },
    { id: 'impostazioni', icona: Settings, etichetta: 'Impostazioni' }
  ];

  return (
    <div className={`barra-laterale ${aperta ? 'aperta' : 'chiusa'}`}>
      <div className="intestazione-barra">
        <button className="pulsante-toggle" onClick={onToggle}>
          ☰
        </button>
        {aperta && <h2>Menu</h2>}
      </div>

      <nav className="navigazione-barra">
        {vociMenu.map(voce => (
          <button
            key={voce.id}
            className={`voce-nav ${vistaCorrente === voce.id ? 'attiva' : ''}`}
            onClick={() => onCambioVista(voce.id)}
          >
            <voce.icona size={24} />
            {aperta && <span>{voce.etichetta}</span>}
          </button>
        ))}
      </nav>

      <div className="pie-barra">
        <button className="voce-nav logout">
          <LogOut size={24} />
          {aperta && <span>LOGOUT</span>}
        </button>
      </div>

      {aperta && (
        <div className="info-barra">
          <div className="elemento-info">
            <span className="etichetta-info">VERSIONE ATTUALE</span>
            <span className="valore-info">1.0.0</span>
          </div>
          <div className="elemento-info">
            <span className="etichetta-info">REPOSITORY REMOTA</span>
            <span className="valore-info">GitHub</span>
          </div>
          <div className="elemento-info">
            <span className="etichetta-info">MESSAGGIO DELL'ULTIMO COMMIT</span>
            <span className="valore-info">Initial release</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default BarraLaterale;
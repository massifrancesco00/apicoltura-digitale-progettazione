import React from 'react';
import { AlertTriangle } from 'lucide-react';
import './ModaleErrore.css';

function ModaleErrore({ onRiprova, onEsci }) {
  return (
    <div className="overlay-modale">
      <div className="modale-errore">
        <div className="icona-errore">
          <AlertTriangle size={64} color="#E74C3C" />
        </div>
        <h2>Tipo Errore</h2>
        <p>Si è verificato un errore imprevisto</p>
        
        <div className="pulsanti-modale">
          <button className="pulsante-riprova" onClick={onRiprova}>
            Riprova
          </button>
          <button className="pulsante-esci" onClick={onEsci}>
            Esci
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModaleErrore;
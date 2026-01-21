import React from 'react';
import { Droplet, Flame, Scale } from 'lucide-react';
import './PannelloControllo.css';

function PannelloControllo() {
  return (
    <div className="pannello-controllo">
      <div className="griglia-sensori">
        <CardSensore 
          icona={Droplet}
          titolo="Umidità"
          colorIcona="#4A90E2"
        />
        <CardSensore 
          icona={Flame}
          titolo="Temperatura"
          colorIcona="#E74C3C"
        />
        <CardSensore 
          icona={Scale}
          titolo="Peso"
          colorIcona="#95A5A6"
        />
      </div>

      <div className="sezione-registro">
        <h3>Ultimi valori registrati</h3>
        <div className="placeholder-registro">
          <p>Nessun dato disponibile</p>
        </div>
      </div>
    </div>
  );
}

function CardSensore({ icona: Icona, titolo, colorIcona }) {
  return (
    <div className="card-sensore">
      <div className="icona-sensore" style={{ color: colorIcona }}>
        <Icona size={48} />
      </div>
      <h3>{titolo}</h3>
    </div>
  );
}

export default PannelloControllo;
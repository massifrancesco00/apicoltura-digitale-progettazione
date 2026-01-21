import React from 'react';
import { TrendingUp } from 'lucide-react';
import './VistaGrafici.css';

function VistaGrafici() {
  return (
    <div className="vista-grafici">
      <h2>Grafici</h2>
      
      <div className="sezione-grafico">
        <h3>Umidità (%)</h3>
        <div className="controlli-grafico">
          <div className="gruppo-controllo">
            <label>Min</label>
            <input type="number" defaultValue="0" />
          </div>
          <div className="gruppo-controllo">
            <label>Max</label>
            <input type="number" defaultValue="100" />
          </div>
          <button className="pulsante-grafico">
            <TrendingUp size={16} />
          </button>
        </div>
      </div>

      <div className="sezione-grafico">
        <h3>Peso (Kg)</h3>
        <div className="controlli-grafico">
          <div className="gruppo-controllo">
            <label>Min</label>
            <input type="number" defaultValue="0" />
          </div>
          <div className="gruppo-controllo">
            <label>Max</label>
            <input type="number" defaultValue="100" />
          </div>
          <button className="pulsante-grafico">
            <TrendingUp size={16} />
          </button>
        </div>
      </div>

      <div className="sezione-grafico">
        <h3>Temperatura (°C)</h3>
        <div className="controlli-grafico">
          <div className="gruppo-controllo">
            <label>Min</label>
            <input type="number" defaultValue="0" />
          </div>
          <div className="gruppo-controllo">
            <label>Max</label>
            <input type="number" defaultValue="100" />
          </div>
          <button className="pulsante-grafico">
            <TrendingUp size={16} />
          </button>
        </div>
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

export default VistaGrafici;
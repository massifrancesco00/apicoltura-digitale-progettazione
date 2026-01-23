import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaHistory } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { theme, styles, chartData } from './theme';

const Valore = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const config = { 
    umidita: { c: theme.accentBlue, label: 'Umidità', unit: '%', key: 'hum' }, 
    temperatura: { c: theme.accentRed, label: 'Temperatura', unit: '°C', key: 'temp' }, 
    peso: { c: theme.warmOrange, label: 'Peso', unit: 'kg', key: 'weight' } 
  };
  
  const current = config[type] || config.umidita;

  return (
    <div style={{
      ...styles.container, 
      padding: '15px', 
      height: '100vh',      // Altezza esatta dello schermo
      width: '100vw',       // Larghezza esatta dello schermo
      overflow: 'hidden',   // BLOCCA lo scroll della pagina
      display: 'flex', 
      flexDirection: 'column',
      boxSizing: 'border-box' // Importante: include padding nelle dimensioni
    }}>
      
      {/* Header compatto */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px', flexShrink: 0 }}>
        <button 
          onClick={() => navigate('/home')} 
          className="menu-btn-hover" 
          style={{...styles.menuButton, position:'static', width: '35px', height: '35px', display:'flex', alignItems:'center', justifyContent:'center'}}
        >
          <FaArrowLeft size={16} />
        </button>
        <h2 style={{ margin: 0, color: theme.deepHoney, fontSize: '1.3rem' }}>Dettaglio {current.label}</h2>
      </div>

      {/* Grid Contenuti */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1.8fr 1.2fr', 
        gap: '15px', 
        flex: 1,            // Occupa tutto lo spazio rimanente
        minHeight: 0,       // Permette ai figli di ridimensionarsi
        marginBottom: '5px'
      }}>
        
        {/* COLONNA GRAFICO */}
        <div style={{...styles.amberCard, display: 'flex', flexDirection: 'column', padding: '15px', overflow: 'hidden'}}>
          <h4 style={{ color: current.c, marginTop: 0, marginBottom: '5px' }}>Analisi Temporale</h4>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" /> 
                <XAxis dataKey="time" stroke={theme.deepHoney} tick={{fontSize: 11}} /> 
                <YAxis stroke={theme.deepHoney} tick={{fontSize: 11}} /> 
                <Tooltip contentStyle={{ borderRadius: '10px', fontSize: '12px' }} />
                <Line type="monotone" dataKey={current.key} stroke={current.c} strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* COLONNA STORICO */}
        <div style={{...styles.amberCard, background: '#FFFDE7', display: 'flex', flexDirection: 'column', padding: '15px', overflow: 'hidden'}}>
          <h4 style={{ marginTop: 0, marginBottom: '10px', color: theme.deepHoney }}>
             Log Recenti
          </h4>
          
          <div style={{ overflowY: 'auto', overflowX: 'hidden', flex: 1, paddingRight: '5px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', tableLayout: 'fixed' }}>
              <thead style={{ position: 'sticky', top: 0, background: '#FFFDE7', zIndex: 5 }}>
                <tr style={{ textAlign: 'left', borderBottom: `1px solid ${current.c}44`, color: theme.deepHoney }}>
                  <th style={{ padding: '8px 0' }}>Ora</th>
                  <th style={{ padding: '8px 0', textAlign: 'right' }}>Valore</th>
                </tr>
              </thead>
              <tbody>
                {[...chartData].reverse().map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                    <td style={{ padding: '8px 0', color: '#5D4037' }}>{item.time}</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', color: current.c, fontWeight: 'bold' }}>
                      {item[current.key]}{current.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Media */}
          <div style={{ marginTop: '10px', padding: '8px', background: 'white', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', border: `1px solid ${current.c}22` }}>
            <span style={{ fontSize: '0.7rem', color: '#888' }}>MEDIA:</span>
            <span style={{ fontSize: '1rem', fontWeight: 'bold', color: theme.deepHoney }}>
              {(chartData.reduce((acc, val) => acc + val[current.key], 0) / chartData.length).toFixed(1)}{current.unit}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Valore;
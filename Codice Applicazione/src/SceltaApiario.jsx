import React from 'react';
import { useNavigate } from 'react-router-dom';
import { theme, styles } from './theme'; // Importante: deve importare theme e styles

const SceltaApiario = () => {
  const navigate = useNavigate();
  return (
    <div style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
      <div className="honeycomb-bg"></div>
      
      <div style={{ ...styles.amberCard, width: '350px', zIndex: 2, textAlign: 'center' }}>
        <h2 style={{ color: theme.deepHoney, marginTop: 0 }}>Seleziona Obiettivo</h2>
        
        <div style={{ textAlign: 'left', marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold', color: theme.deepHoney, fontSize: '0.9rem' }}>Luogo Apiario</label>
            <select style={styles.warmInput}>
                <option>🌼 Campo Fiorito (Roma)</option>
                <option>🌲 Bosco Nord (Milano)</option>
            </select>
        </div>
        
        <div style={{ textAlign: 'left', marginBottom: '25px' }}>
            <label style={{ fontWeight: 'bold', color: theme.deepHoney, fontSize: '0.9rem' }}>Arnia Specifica</label>
            <select style={styles.warmInput}>
                <option>🐝 Arnia Regina 01</option>
                <option>🐝 Arnia Regina 02</option>
            </select>
        </div>
        
        <button 
            onClick={() => navigate('/home')} 
            className="honey-btn-hover" 
            style={styles.honeyButton}
        >
          VISUALIZZA DATI
        </button>
      </div>
    </div>
  );
};

export default SceltaApiario;
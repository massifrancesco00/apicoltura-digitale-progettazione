import React from 'react';
import { useNavigate } from 'react-router-dom';
import { theme, styles } from './theme';

const SceltaApiario = () => {
  const navigate = useNavigate();
  return (
    <div style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
      <div className="honeycomb-bg"></div>
      <div style={{ ...styles.amberCard, width: '350px', zIndex: 2 }}>
        <h2 style={{ textAlign: 'center', color: theme.deepHoney }}>Seleziona Obiettivo</h2>
        <select style={styles.warmInput}><option>🌼 Campo Fiorito (Roma)</option></select>
        <select style={styles.warmInput}><option>🐝 Arnia Regina 01</option></select>
        <button onClick={() => navigate('/home')} className="honey-btn-hover" style={styles.honeyButton}>VISUALIZZA DATI</button>
      </div>
    </div>
  );
};

export default SceltaApiario;
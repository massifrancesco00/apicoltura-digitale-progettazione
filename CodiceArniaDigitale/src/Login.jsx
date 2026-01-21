import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBug, FaExclamationCircle } from 'react-icons/fa';
import { theme, styles } from './theme';

// --- CONFIGURAZIONE PASSWORD ---
const VALID_PASSKEYS = [
  "123456", 
  "API001", 
  "MIELE9",
  "ABCDEF"
];

const Login = () => {
  const navigate = useNavigate();
  
  // Stati per gestire cosa scrive l'utente e gli errori
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // 1. Resetta errori e pulisci spazi
    setError('');
    const cleanPass = password.trim(); 

    // 2. Controllo Lunghezza (Esattamente 6 caratteri)
    if (cleanPass.length !== 6) {
      setError('⚠️ La password deve essere di 6 caratteri.');
      return;
    }

    // 3. Controllo se la password esiste nella lista
    if (!VALID_PASSKEYS.includes(cleanPass)) {
      setError('🚫 Password errata. Riprova.');
      return;
    }

    // 4. Se tutto ok, vai alla selezione
    navigate('/selezione');
  };

  // Permette di premere INVIO sulla tastiera
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
      <div className="honeycomb-bg"></div>
      
      <div style={{ ...styles.amberCard, width: '320px', textAlign: 'center', zIndex: 2 }}>
        
        {/* Icona Grande */}
        <div style={{ color: theme.deepHoney, fontSize: '3.5rem', marginBottom: '10px' }}>
          <FaBug />
        </div>
        
        {/* Titolo */}
        <h1 style={{ color: theme.deepHoney, margin: '0 0 20px 0' }}>BeeMonitor</h1>
        
        {/* Input Password */}
        <input 
          type="password" 
          placeholder="Password Arnia (es. 123456)" 
          style={{
            ...styles.warmInput,
            border: error ? `2px solid ${theme.accentRed}` : styles.warmInput.border
          }} 
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(''); // Toglie l'errore appena scrivi
          }}
          onKeyDown={handleKeyDown}
          maxLength={6}
        />

        {/* Messaggio di Errore (appare solo se c'è un problema) */}
        {error && (
          <div style={{ 
            color: theme.accentRed, 
            fontSize: '0.9rem', 
            fontWeight: 'bold', 
            marginBottom: '15px',
            background: '#FFEBEE', padding: '8px', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'
          }}>
            <FaExclamationCircle /> {error}
          </div>
        )}

        {/* Bottone Login */}
        <button 
          onClick={handleLogin} 
          className="honey-btn-hover" 
          style={styles.honeyButton}
        >
          ENTRA
        </button>
      </div>
    </div>
  );
};

export default Login;
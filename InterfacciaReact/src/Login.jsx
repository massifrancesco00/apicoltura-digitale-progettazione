import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBug } from 'react-icons/fa';
import { theme, styles } from './theme';

const Login = () => {
  const RESTDB_URL = import.meta.env.VITE_API_URL;
  const API_KEY =  import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errore, setErrore] = useState('');

  const handleLogin = async () => {
    if (!password.trim()) {
      setErrore('Inserisci una password');
      return;
    }

    setLoading(true);
    setErrore('');

    try {
      const response = await fetch(`${RESTDB_URL}/utenti`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': API_KEY,
          'cache-control': 'no-cache'
        }
      });

      const utenti = await response.json();
      
      // Verifica se esiste un utente con la password inserita
      const utenteValido = utenti.find(u => u.ute_password === password);

      if (utenteValido) {
        // Password corretta - vai alla selezione apiario
        console.log('✅ Login effettuato:', utenteValido.ute_username);
        navigate('/selezione', { 
          state: { 
            utente: utenteValido 
          } 
        });
      } else {
        // Password errata
        setErrore('Password non valida');
        setPassword('');
      }
    } catch (error) {
      console.error('❌ Errore durante il login:', error);
      setErrore('Errore di connessione al database');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
      <div className="honeycomb-bg"></div>
      <div style={{ ...styles.amberCard, width: '320px', textAlign: 'center', zIndex: 2 }}>
        <div style={{ color: theme.deepHoney, fontSize: '3.5rem' }}>
          <FaBug />
        </div>
        <h1 style={{ color: theme.deepHoney }}>BeeMonitor</h1>
        
        <input 
          type="password" 
          placeholder="Password Arnia" 
          style={styles.warmInput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        
        {errore && (
          <div style={{ 
            color: '#d32f2f', 
            fontSize: '12px', 
            marginTop: '8px',
            marginBottom: '8px',
            padding: '8px',
            background: 'rgba(211, 47, 47, 0.1)',
            borderRadius: '4px'
          }}>
            ⚠️ {errore}
          </div>
        )}
        
        <button 
          onClick={handleLogin} 
          className="honey-btn-hover" 
          style={{
            ...styles.honeyButton,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'wait' : 'pointer'
          }}
          disabled={loading}
        >
          {loading ? 'VERIFICA...' : 'ENTRA'}
        </button>

        <div style={{ 
          marginTop: '15px', 
          fontSize: '11px', 
          color: '#666',
          fontStyle: 'italic'
        }}>
          🔐 Accesso sicuro al sistema
        </div>
      </div>
    </div>
  );
};

export default Login;
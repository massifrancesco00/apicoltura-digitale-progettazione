import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBug, FaExclamationCircle } from 'react-icons/fa';
// NOTA BENE: Le graffe { } sono obbligatorie qui sotto!
import { theme, styles } from './theme';

const VALID_PASSKEYS = ["123456", "API001", "MIELE9"];

const Login = () => {
  console.log("Login Component sta renderizzando..."); // CONTROLLA LA CONSOLE (F12)
  
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    const cleanPass = password.trim(); 
    if (cleanPass.length !== 6) {
      setError('⚠️ La password deve essere di esattamente 6 caratteri.');
      return;
    }
    if (!VALID_PASSKEYS.includes(cleanPass)) {
      setError('🚫 Password errata.');
      return;
    }
    navigate('/selezione');
  };

  return (
    <div style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
      <div className="honeycomb-bg"></div>
      <div style={{ ...styles.amberCard, width: '320px', textAlign: 'center', zIndex: 2 }}>
        <div style={{ color: theme.deepHoney, fontSize: '3.5rem' }}><FaBug /></div>
        <h1 style={{ color: theme.deepHoney }}>BeeMonitor</h1>
        
        <input 
          type="password" 
          placeholder="Password (es. 123456)" 
          style={styles.warmInput} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={6}
        />

        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

        <button onClick={handleLogin} style={styles.honeyButton}>ENTRA</button>
      </div>
    </div>
  );
};

export default Login;
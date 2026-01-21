import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBug } from 'react-icons/fa';
import { theme, styles } from './theme';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
      <div className="honeycomb-bg"></div>
      <div style={{ ...styles.amberCard, width: '320px', textAlign: 'center', zIndex: 2 }}>
        <div style={{ color: theme.deepHoney, fontSize: '3.5rem' }}><FaBug /></div>
        <h1 style={{ color: theme.deepHoney }}>BeeMonitor</h1>
        <input type="password" placeholder="Password Arnia" style={styles.warmInput} />
        <button onClick={() => navigate('/selezione')} className="honey-btn-hover" style={styles.honeyButton}>ENTRA</button>
      </div>
    </div>
  );
};

export default Login;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from './theme';

const Errore = () => {
  const navigate = useNavigate();
  return (
     <div style={{...styles.container, justifyContent:'center', alignItems:'center'}}>
        <h1>404</h1>
        <button onClick={() => navigate('/')} style={styles.honeyButton}>Torna Home</button>
     </div>
  );
};

export default Errore;
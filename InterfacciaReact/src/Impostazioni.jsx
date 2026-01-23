import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { theme, styles } from './theme';
import HoneyMultiSlider from './components/HoneyMultiSlider';

const Impostazioni = () => {
    const arniaId = localStorage.getItem('arniaSelezionata');
    console.log('ID arnia salvato:', arniaId);
    const navigate = useNavigate();
    const [humValues, setHumValues] = useState([40, 55, 75]);
    const [tempValues, setTempValues] = useState([18, 24, 35]);

  return (
    <div style={{...styles.container, padding:'30px', justifyContent:'center', alignItems:'center'}}>
      <div className="honeycomb-bg"></div>
      <div style={{...styles.amberCard, width:'420px', position:'relative', zIndex:2}}>
        <div style={{display:'flex', alignItems:'center', marginBottom:'30px'}}>
            <button onClick={() => navigate('/home')} className="menu-btn-hover" style={{...styles.menuButton, position:'static', marginRight:'20px', width:'40px', height:'40px'}}>
                <FaHome />
            </button>
            <h2 style={{margin:0, color: theme.deepHoney}}>Calibrazione</h2>
        </div>
        
        <div style={{marginBottom:'40px'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'30px', fontWeight:'bold', color: theme.deepHoney}}>
                <span>UMIDITÀ (%)</span>
                <span style={{color: theme.accentBlue}}>{humValues.join(' - ')}</span>
            </div>
            <HoneyMultiSlider 
                values={humValues} 
                min={0} max={100} 
                onChange={setHumValues} 
                colors={[theme.accentBlue, theme.accentGreen, theme.accentRed]} 
            />
        </div>

        <div style={{marginBottom:'20px'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'30px', fontWeight:'bold', color: theme.deepHoney}}>
                <span>TEMPERATURA (°C)</span>
                <span style={{color: theme.accentRed}}>{tempValues.join(' - ')}</span>
            </div>
            <HoneyMultiSlider 
                values={tempValues} 
                min={0} max={50} 
                onChange={setTempValues} 
                colors={[theme.accentBlue, theme.accentGreen, theme.accentRed]}
            />
        </div>

        <button className="honey-btn-hover" style={{...styles.honeyButton, marginTop:'35px'}}>
            SALVA CONFIGURAZIONE
        </button>
      </div>
    </div>
  );
};

export default Impostazioni;
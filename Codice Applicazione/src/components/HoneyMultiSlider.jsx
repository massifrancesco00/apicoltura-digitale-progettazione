// src/HoneyMultiSlider.jsx
import React, { useState, useEffect } from 'react';
import { theme } from '../theme';

const HoneyMultiSlider = ({ values, min, max, onChange, colors }) => {
  const [localValues, setLocalValues] = useState(values);

  useEffect(() => { setLocalValues(values); }, [values]);

  const handleChange = (index, newVal) => {
    const newValues = [...localValues];
    newValues[index] = Number(newVal);
    newValues.sort((a, b) => a - b);
    setLocalValues(newValues);
    onChange(newValues);
  };

  const getPercent = (value) => ((value - min) / (max - min)) * 100;

  return (
    <div style={{ position: 'relative', width: '100%', height: '40px', display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', width: '100%', height: '8px', background: 'rgba(192, 86, 0, 0.1)', borderRadius: '4px', border: '1px solid rgba(192,86,0,0.2)' }}></div>
      
      <div style={{
        position: 'absolute',
        height: '8px',
        background: `linear-gradient(to right, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
        borderRadius: '4px',
        left: `${getPercent(localValues[0])}%`,
        width: `${getPercent(localValues[2]) - getPercent(localValues[0])}%`,
        opacity: 0.6
      }}></div>

      {localValues.map((val, i) => (
        <React.Fragment key={i}>
          <div style={{
            position: 'absolute',
            left: `${getPercent(val)}%`,
            transform: 'translateX(-50%)',
            width: '24px', height: '24px',
            borderRadius: '50%',
            background: colors[i],
            border: '3px solid white',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            pointerEvents: 'none',
            zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
             <div style={{
                 position:'absolute', top:'-30px',
                 fontSize:'0.7rem', fontWeight:'bold', color: theme.deepHoney, 
                 background:'rgba(255,255,255,0.9)', padding:'2px 6px', borderRadius:'6px',
                 boxShadow: '0 2px 4px rgba(0,0,0,0.1)', whiteSpace: 'nowrap'
             }}>
                 {i === 0 ? 'MIN' : i === 1 ? 'IDEAL' : 'MAX'}
             </div>
          </div>
          
          <input
            type="range"
            min={min} max={max}
            value={val}
            onChange={(e) => handleChange(i, e.target.value)}
            className="multi-range-slider"
            style={{ zIndex: 3 + i }}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default HoneyMultiSlider;
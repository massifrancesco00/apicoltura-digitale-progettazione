import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { theme, styles, chartData } from './theme';

const Valore = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const config = { umidita: { c: theme.accentBlue }, temperatura: { c: theme.accentRed }, peso: { c: theme.warmOrange } };
  const current = config[type] || config.umidita;

  return (
    <div style={{...styles.container, padding: '30px'}}>
       <button onClick={() => navigate('/home')} className="menu-btn-hover" style={{...styles.menuButton, position:'static', marginBottom:'20px'}}><FaHome /></button>
       <div style={{...styles.amberCard, height: '400px'}}>
         <h2 style={{color: current.c}}>{type.toUpperCase()}</h2>
         <ResponsiveContainer width="100%" height="100%">
             <LineChart data={chartData}>
               <CartesianGrid strokeDasharray="3 3" /> <XAxis dataKey="time" /> <YAxis /> <Tooltip />
               <Line type="monotone" dataKey={type === 'peso' ? 'weight' : type === 'umidita' ? 'hum' : 'temp'} stroke={current.c} strokeWidth={4} />
             </LineChart>
         </ResponsiveContainer>
       </div>
    </div>
  );
};

export default Valore;
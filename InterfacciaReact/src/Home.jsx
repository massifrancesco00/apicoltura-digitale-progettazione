import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTint, FaThermometerHalf, FaBalanceScale, FaBars, FaTimes, FaHive, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { theme, styles, chartData } from './theme';

const Home = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const messages = ["🌼 Attività intensa", "🌡️ Temp. ottimale", "⚖️ Aumento peso", "✅ Check OK"];

  return (
    <div style={styles.container}>
      <div className="honeycomb-bg"></div>
      <button style={styles.menuButton} className="menu-btn-hover" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {menuOpen && (
        <div style={styles.dropdown}>
          <div style={styles.menuItem} onClick={() => navigate('/impostazioni')}><FaCog color={theme.deepHoney}/> Impostazioni</div>
          <div style={styles.menuItem} onClick={() => navigate('/selezione')}><FaHive color={theme.warmOrange}/> Cambia Arnia</div>
          <div style={{...styles.menuItem, color: theme.accentRed}} onClick={() => navigate('/')}><FaSignOutAlt /> Esci</div>
        </div>
      )}

      <div style={{ marginLeft: '90px', marginTop: '25px', marginRight: '20px', background: theme.creamBg, borderRadius: '50px', padding: '10px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: theme.honeyShadow, border: `2px solid ${theme.warmOrange}` }}>
        <div style={{fontWeight: '700', color: theme.deepHoney, display:'flex', alignItems:'center', gap:'8px'}}><FaHive size={20} /> ARNIA: 01-R</div>
        <div style={{ fontWeight: '600', color: theme.accentGreen }}>Online</div>
      </div>

      <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '25px' }}>
          <div onClick={() => navigate('/dettaglio/umidita')} style={styles.hexIconBtn} className="hex-hover"><FaTint size={32} color={theme.accentBlue} /></div>
          <div onClick={() => navigate('/dettaglio/temperatura')} style={styles.hexIconBtn} className="hex-hover"><FaThermometerHalf size={32} color={theme.accentRed} /></div>
          <div onClick={() => navigate('/dettaglio/peso')} style={styles.hexIconBtn} className="hex-hover"><FaBalanceScale size={32} color={theme.warmOrange} /></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', flex: 1, minHeight: '350px' }}>
          <div style={{...styles.amberCard, display:'flex', flexDirection:'column', padding: '20px'}}>
            <h3 style={{ marginTop: 0, color: theme.deepHoney }}><FaChartLine /> Andamento</h3>
            <div style={{ flex: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={theme.accentRed} stopOpacity={0.4}/><stop offset="95%" stopColor={theme.accentRed} stopOpacity={0}/></linearGradient>
                    <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={theme.accentBlue} stopOpacity={0.4}/><stop offset="95%" stopColor={theme.accentBlue} stopOpacity={0}/></linearGradient>
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={theme.warmOrange} stopOpacity={0.4}/><stop offset="95%" stopColor={theme.warmOrange} stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(192, 86, 0, 0.1)" vertical={false} />
                  <XAxis dataKey="time" /> <YAxis /> 
                  <Tooltip contentStyle={{ background: '#FFF8E1', border: `2px solid ${theme.warmOrange}`, borderRadius: '10px' }}/>
                  
                  <Area type="monotone" dataKey="weight" name="Peso (Kg)" stroke={theme.warmOrange} fill="url(#colorWeight)" strokeWidth={3} />
                  <Area type="monotone" dataKey="temp" name="Temp (°C)" stroke={theme.accentRed} fill="url(#colorTemp)" strokeWidth={3} />
                  <Area type="monotone" dataKey="hum" name="Umid (%)" stroke={theme.accentBlue} fill="url(#colorHum)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{...styles.amberCard, background: '#FFFDE7'}}>
             <h3 style={{ marginTop: 0, color: theme.deepHoney }}>Note</h3>
             {messages.map((msg, i) => (
               <div key={i} style={{ padding: '12px', marginBottom: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.7)', borderLeft: `4px solid ${theme.goldenYellow}` }}>{msg}</div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
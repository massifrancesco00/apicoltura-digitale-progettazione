import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaTint, FaThermometerHalf, FaBalanceScale, FaBars, 
  FaTimes, FaHive, FaChartLine, FaCog, FaSignOutAlt, FaHistory 
} from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { theme, styles, chartData } from './theme';

const Home = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Messaggi/Note (ora spostati sotto lo storico o integrati)
  const messages = ["🌼 Attività intensa", "🌡️ Temp. ottimale", "✅ Check OK"];

  return (
    <div style={styles.container}>
      <div className="honeycomb-bg"></div>
      
      {/* Menu Button */}
      <button style={styles.menuButton} className="menu-btn-hover" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div style={styles.dropdown}>
          <div style={styles.menuItem} onClick={() => navigate('/impostazioni')}><FaCog color={theme.deepHoney}/> Impostazioni</div>
          <div style={styles.menuItem} onClick={() => navigate('/selezione')}><FaHive color={theme.warmOrange}/> Cambia Arnia</div>
          <div style={{...styles.menuItem, color: theme.accentRed}} onClick={() => navigate('/')}><FaSignOutAlt /> Esci</div>
        </div>
      )}

      {/* Header Arnia */}
      <div style={{ marginLeft: '90px', marginTop: '25px', marginRight: '20px', background: theme.creamBg, borderRadius: '50px', padding: '10px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: theme.honeyShadow, border: `2px solid ${theme.warmOrange}` }}>
        <div style={{fontWeight: '700', color: theme.deepHoney, display:'flex', alignItems:'center', gap:'8px'}}><FaHive size={20} /> ARNIA: 01-R</div>
        <div style={{ fontWeight: '600', color: theme.accentGreen }}>Online</div>
      </div>

      <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Pulsanti Rapidi (Esagoni) */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '25px' }}>
          <div onClick={() => navigate('/dettaglio/umidita')} style={styles.hexIconBtn} className="hex-hover"><FaTint size={32} color={theme.accentBlue} /></div>
          <div onClick={() => navigate('/dettaglio/temperatura')} style={styles.hexIconBtn} className="hex-hover"><FaThermometerHalf size={32} color={theme.accentRed} /></div>
          <div onClick={() => navigate('/dettaglio/peso')} style={styles.hexIconBtn} className="hex-hover"><FaBalanceScale size={32} color={theme.warmOrange} /></div>
        </div>

        {/* Dashboard Principale: Grafico + Storico */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '20px', flex: 1, minHeight: '400px' }}>
          
          {/* SEZIONE GRAFICO */}
          <div style={{...styles.amberCard, display:'flex', flexDirection:'column', padding: '20px'}}>
            <h3 style={{ marginTop: 0, color: theme.deepHoney, display:'flex', alignItems:'center', gap:'10px' }}>
                <FaChartLine /> Andamento Temporale
            </h3>
            <div style={{ flex: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={theme.accentRed} stopOpacity={0.4}/><stop offset="95%" stopColor={theme.accentRed} stopOpacity={0}/></linearGradient>
                    <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={theme.accentBlue} stopOpacity={0.4}/><stop offset="95%" stopColor={theme.accentBlue} stopOpacity={0}/></linearGradient>
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={theme.warmOrange} stopOpacity={0.4}/><stop offset="95%" stopColor={theme.warmOrange} stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(192, 86, 0, 0.1)" vertical={false} />
                  <XAxis dataKey="time" stroke={theme.deepHoney} /> 
                  <YAxis stroke={theme.deepHoney} /> 
                  <Tooltip contentStyle={{ background: '#FFF8E1', border: `2px solid ${theme.warmOrange}`, borderRadius: '10px' }}/>
                  
                  <Area type="monotone" dataKey="weight" name="Peso (Kg)" stroke={theme.warmOrange} fill="url(#colorWeight)" strokeWidth={3} />
                  <Area type="monotone" dataKey="temp" name="Temp (°C)" stroke={theme.accentRed} fill="url(#colorTemp)" strokeWidth={3} />
                  <Area type="monotone" dataKey="hum" name="Umid (%)" stroke={theme.accentBlue} fill="url(#colorHum)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SEZIONE STORICO RILEVAZIONI */}
          <div style={{...styles.amberCard, background: '#FFFDE7', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
            <h3 style={{ marginTop: 0, color: theme.deepHoney, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaHistory /> Storico Rilevazioni
            </h3>
            
            {/* Tabella Scrollabile */}
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ position: 'sticky', top: 0, background: '#FFFDE7', zIndex: 10 }}>
                  <tr style={{ borderBottom: `2px solid ${theme.goldenYellow}`, color: theme.deepHoney, fontSize: '0.85rem' }}>
                    <th style={{ padding: '10px 5px' }}>Ora</th>
                    <th style={{ padding: '10px 5px' }}>KG</th>
                    <th style={{ padding: '10px 5px' }}>°C</th>
                    <th style={{ padding: '10px 5px' }}>%</th>
                  </tr>
                </thead>
                <tbody>
                  {[...chartData].reverse().map((reg, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(192, 86, 0, 0.08)', fontSize: '0.9rem', color: '#5D4037' }}>
                      <td style={{ padding: '12px 5px', fontWeight: '600' }}>{reg.time}</td>
                      <td style={{ padding: '12px 5px', color: theme.warmOrange }}>{reg.weight}</td>
                      <td style={{ padding: '12px 5px', color: theme.accentRed }}>{reg.temp}</td>
                      <td style={{ padding: '12px 5px', color: theme.accentBlue }}>{reg.hum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Note rapide in fondo allo storico */}
            <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
               <h4 style={{ margin: '0 0 5px 0', fontSize: '0.8rem', color: theme.deepHoney, textTransform: 'uppercase' }}>Stato Arnia</h4>
               {messages.map((msg, i) => (
                 <div key={i} style={{ fontSize: '0.8rem', padding: '6px 12px', borderRadius: '8px', background: 'white', borderLeft: `3px solid ${theme.goldenYellow}`, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                   {msg}
                 </div>
               ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { FaTint, FaThermometerHalf, FaBalanceScale, FaHome, FaBars, FaTimes, FaBug, FaHive, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';

// --- TEMA "HONEY & AMBER" ---
const theme = {
  warmOrange: '#FF9F1C',
  deepHoney: '#C05600',
  goldenYellow: '#FFD700',
  creamBg: 'rgba(255, 250, 240, 0.90)',
  textDark: '#3E2723',
  textLight: '#FFF8E1',
  accentBlue: '#29B6F6',
  accentRed: '#EF5350',
  accentGreen: '#66BB6A',
  honeyShadow: '0 8px 20px rgba(192, 86, 0, 0.2)',
  goldenBorder: '2px solid #FFD700',
};

const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    background: `radial-gradient(circle at 50% 30%, ${theme.goldenYellow}, ${theme.warmOrange}, ${theme.deepHoney})`,
    fontFamily: "'Segoe UI', 'Roboto', sans-serif",
    color: theme.textDark,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflowX: 'hidden',
  },
  amberCard: {
    background: theme.creamBg,
    boxShadow: theme.honeyShadow,
    backdropFilter: 'blur(10px)',
    borderRadius: '25px',
    border: `1px solid rgba(255, 215, 0, 0.3)`,
    padding: '30px',
  },
  warmInput: {
    width: '100%',
    padding: '15px',
    background: '#FFF8E1',
    border: '2px solid #FFC107',
    borderRadius: '15px',
    color: theme.textDark,
    outline: 'none',
    marginBottom: '15px',
    fontSize: '1rem',
    fontWeight: '500',
  },
  honeyButton: {
    width: '100%',
    padding: '15px 20px',
    background: `linear-gradient(135deg, ${theme.goldenYellow}, ${theme.warmOrange})`,
    border: theme.goldenBorder,
    borderRadius: '30px',
    color: theme.textDark,
    fontWeight: '800',
    fontSize: '1.1rem',
    cursor: 'pointer',
    boxShadow: '0 6px 15px rgba(192, 86, 0, 0.3), inset 0 3px 5px rgba(255,255,255,0.4)',
    textShadow: '0 1px 1px rgba(255,255,255,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
  },
  menuButton: {
    position: 'fixed',
    top: '20px', left: '20px', zIndex: 1000,
    background: theme.creamBg,
    border: theme.goldenBorder,
    borderRadius: '50%',
    width: '50px', height: '50px',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: theme.deepHoney,
    boxShadow: theme.honeyShadow,
  },
  dropdown: {
    position: 'fixed', top: '80px', left: '20px',
    background: theme.creamBg,
    backdropFilter: 'blur(10px)',
    border: theme.goldenBorder,
    borderRadius: '20px',
    width: '240px',
    boxShadow: theme.honeyShadow,
    zIndex: 999,
    padding: '10px',
  },
  menuItem: {
    padding: '12px 15px',
    cursor: 'pointer',
    borderRadius: '10px',
    color: theme.textDark,
    display: 'flex', alignItems: 'center', gap: '15px',
    fontWeight: '600',
  },
  hexIconBtn: {
    width: '80px', height: '80px',
    background: `linear-gradient(135deg, #FFF, #FFE0B2)`,
    border: '2px solid #FFB74D',
    clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 10px 20px rgba(192, 86, 0, 0.15)',
  }
};

// --- COMPONENTE SLIDER MULTIPLO (CORRETTO) ---
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
      
      {/* Track Sfondo */}
      <div style={{ position: 'absolute', width: '100%', height: '8px', background: 'rgba(192, 86, 0, 0.1)', borderRadius: '4px', border: '1px solid rgba(192,86,0,0.2)' }}></div>
      
      {/* Track Colorata (da Min a Max) */}
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
          {/* PALLINO VISIVO */}
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
          
          {/* INPUT INVISIBILE (Interattivo) */}
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

// --- DATI FINTI ---
// Nota: weight è incluso qui
const chartData = [
  { time: '08:00', temp: 22, hum: 60, weight: 22.0 },
  { time: '10:00', temp: 26, hum: 55, weight: 22.5 },
  { time: '12:00', temp: 31, hum: 45, weight: 23.0 },
  { time: '14:00', temp: 33, hum: 40, weight: 23.2 },
  { time: '16:00', temp: 29, hum: 50, weight: 23.1 },
];

const messages = ["🌼 Attività intensa", "🌡️ Temp. ottimale", "⚖️ Aumento peso", "✅ Check OK"];

// --- PAGINE ---

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

const Selection = () => {
  const navigate = useNavigate();
  return (
    <div style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
      <div className="honeycomb-bg"></div>
      <div style={{ ...styles.amberCard, width: '350px', zIndex: 2 }}>
        <h2 style={{ textAlign: 'center', color: theme.deepHoney }}>Seleziona Obiettivo</h2>
        <select style={styles.warmInput}><option>🌼 Campo Fiorito (Roma)</option></select>
        <select style={styles.warmInput}><option>🐝 Arnia Regina 01</option></select>
        <button onClick={() => navigate('/dashboard')} className="honey-btn-hover" style={styles.honeyButton}>VISUALIZZA DATI</button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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
                    {/* Nuovo gradiente per il Peso (Miele/Oro) */}
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={theme.warmOrange} stopOpacity={0.4}/><stop offset="95%" stopColor={theme.warmOrange} stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(192, 86, 0, 0.1)" vertical={false} />
                  <XAxis dataKey="time" /> <YAxis /> 
                  <Tooltip contentStyle={{ background: '#FFF8E1', border: `2px solid ${theme.warmOrange}`, borderRadius: '10px' }}/>
                  
                  {/* --- Aggiunto il PESO qui --- */}
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

const MetricDetail = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const config = { umidita: { c: theme.accentBlue }, temperatura: { c: theme.accentRed }, peso: { c: theme.warmOrange } };
  const current = config[type] || config.umidita;

  return (
    <div style={{...styles.container, padding: '30px'}}>
       <button onClick={() => navigate('/dashboard')} className="menu-btn-hover" style={{...styles.menuButton, position:'static', marginBottom:'20px'}}><FaHome /></button>
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

const Settings = () => {
  const navigate = useNavigate();
  const [humValues, setHumValues] = useState([40, 55, 75]);
  const [tempValues, setTempValues] = useState([18, 24, 35]);

  return (
    <div style={{...styles.container, padding:'30px', justifyContent:'center', alignItems:'center'}}>
      <div className="honeycomb-bg"></div>
      <div style={{...styles.amberCard, width:'420px', position:'relative', zIndex:2}}>
        <div style={{display:'flex', alignItems:'center', marginBottom:'30px'}}>
            <button onClick={() => navigate('/dashboard')} className="menu-btn-hover" style={{...styles.menuButton, position:'static', marginRight:'20px', width:'40px', height:'40px'}}>
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

const ErrorPage = () => { 
  const navigate = useNavigate();
  return (
     <div style={{...styles.container, justifyContent:'center', alignItems:'center'}}>
        <h1>404</h1>
        <button onClick={() => navigate('/')}>Torna Home</button>
     </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/selezione" element={<Selection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dettaglio/:type" element={<MetricDetail />} />
        <Route path="/impostazioni" element={<Settings />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <style>{`
        body { margin: 0; }
        .honeycomb-bg {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100L0 84L0 50L28 34L56 50L56 84L28 100L28 66Z' fill='%23FFD700' fill-opacity='0.08'/%3E%3C/svg%3E");
            pointer-events: none; z-index: 1;
        }
        .honey-btn-hover:hover { transform: translateY(-3px); filter: brightness(1.1); }
        .hex-hover:hover { transform: translateY(-5px); }
        .menu-btn-hover:hover { transform: rotate(90deg); }

        /* --- CSS SLIDER MULTIPLO --- */
        .multi-range-slider {
            position: absolute;
            pointer-events: none;
            -webkit-appearance: none; 
            width: 100%; height: 100%;
            background: transparent;
            margin: 0; top: 0; left: 0;
        }
        .multi-range-slider::-webkit-slider-thumb {
            pointer-events: auto;
            -webkit-appearance: none;
            width: 30px; height: 30px;
            border-radius: 50%;
            background: red; 
            opacity: 0;
            cursor: pointer;
            position: relative;
            z-index: 10;
        }
        .multi-range-slider::-moz-range-thumb {
            pointer-events: auto;
            width: 30px; height: 30px;
            border: none; border-radius: 50%;
            background: red; opacity: 0;
            cursor: pointer;
            position: relative; z-index: 10;
        }
      `}</style>
    </Router>
  );
}
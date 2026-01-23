import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaTint, FaThermometerHalf, FaBalanceScale, FaBars, 
  FaTimes, FaHive, FaChartLine, FaCog, FaSignOutAlt, FaHistory 
} from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { theme, styles, chartData } from './theme';

const Home = () => {
  const RESTDB_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [rilevazioni, setRilevazioni] = useState([]);
  const [sensori, setSensori] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Messaggi/Note (ora spostati sotto lo storico o integrati)
  const messages = ["🌼 Attività intensa", "🌡️ Temp. ottimale", "✅ Check OK"];

  // Recupera le rilevazioni dal database
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const arniaId = localStorage.getItem('arniaSelezionata');
        if (!arniaId) {
          setIsLoading(false);
          return;
        }

        // Recupera i sensori dell'arnia per fare il mapping dei tipi
        const sensorResponse = await fetch(
          `${RESTDB_URL}/sensoriarnia?q={"sea_arn_id":${arniaId}}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-apikey': API_KEY,
              'cache-control': 'no-cache'
            },
            mode: 'cors'
          }
        );

        if (sensorResponse.ok) {
          const sensoriData = await sensorResponse.json();
          setSensori(sensoriData);
        }

        // Recupera le rilevazioni
        const rilResponse = await fetch(
          `${RESTDB_URL}/rilevazioni?sort={"ril_dataOra":-1}&limit=100`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-apikey': API_KEY,
              'cache-control': 'no-cache'
            },
            mode: 'cors'
          }
        );

        if (rilResponse.ok) {
          const data = await rilResponse.json();
          setRilevazioni(data);
        }
      } catch (error) {
        console.error('Errore recupero dati:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Funzione per verificare lo stato dei sensori
  const verificaStatoSensori = () => {
    const stati = [];
    
    // Trova l'ultima rilevazione per ogni tipo di sensore
    const tipiSensore = [
      { id: 10, nome: 'Umidità', simbolo: '%', genere: 'f' },
      { id: 11, nome: 'Peso', simbolo: 'Kg', genere: 'm' },
      { id: 12, nome: 'Temperatura', simbolo: '°C', genere: 'f' }
    ];

    tipiSensore.forEach(tipo => {
      // Trova il sensore di questo tipo
      const sensore = sensori.find(s => s.sea_tip_id === tipo.id);
      if (!sensore) return;

      // Trova l'ultima rilevazione di questo sensore
      const ultimaRilevazione = rilevazioni.find(r => r.ril_sea_id === sensore.sea_id);
      if (!ultimaRilevazione) {
        stati.push({
          tipo: tipo.nome,
          stato: 'warning',
          messaggio: `${tipo.nome}: Nessun dato disponibile`,
          colore: '#FF9800'
        });
        return;
      }

      const valore = ultimaRilevazione.ril_dato;
      const basso = tipo.genere === 'f' ? 'bassa' : 'basso';
      const alto = tipo.genere === 'f' ? 'alta' : 'alto';
      
      // Verifica le soglie
      if (valore < sensore.sea_min) {
        stati.push({
          tipo: tipo.nome,
          stato: 'danger',
          messaggio: `${tipo.nome} troppo ${basso} (${valore.toFixed(1)}${tipo.simbolo})`,
          colore: '#D32F2F'
        });
      } else if (valore > sensore.sea_max) {
        stati.push({
          tipo: tipo.nome,
          stato: 'danger',
          messaggio: `${tipo.nome} troppo ${alto} (${valore.toFixed(1)}${tipo.simbolo})`,
          colore: '#D32F2F'
        });
      } else {
        stati.push({
          tipo: tipo.nome,
          stato: 'ok',
          messaggio: `${tipo.nome} Ottimale`,
          colore: theme.accentGreen
        });
      }
    });

    return stati;
  };

  const statiSensori = verificaStatoSensori();

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
                  {isLoading ? (
                    <tr>
                      <td colSpan="4" style={{ padding: '30px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                          <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            border: `4px solid ${theme.goldenYellow}`, 
                            borderTop: `4px solid ${theme.warmOrange}`,
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                          }}></div>
                          <span style={{ color: theme.deepHoney, fontSize: '0.9rem' }}>Caricamento dati...</span>
                        </div>
                      </td>
                    </tr>
                  ) : rilevazioni.length > 0 ? (
                    rilevazioni.map((ril, i) => {
                      // Trova il sensore corrispondente
                      const sensore = sensori.find(s => s.sea_id === ril.ril_sea_id);
                      const tipoSensore = sensore?.sea_tip_id;
                      
                      return (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(192, 86, 0, 0.08)', fontSize: '0.9rem', color: '#5D4037' }}>
                          <td style={{ padding: '12px 5px', fontWeight: '600' }}>
                            {new Date(ril.ril_dataOra).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          {/* Peso (sea_tip_id = 11) */}
                          <td style={{ padding: '12px 5px', color: theme.warmOrange }}>
                            {tipoSensore === 11 ? ril.ril_dato?.toFixed(2) : '-'}
                          </td>
                          {/* Temperatura (sea_tip_id = 12) */}
                          <td style={{ padding: '12px 5px', color: theme.accentRed }}>
                            {tipoSensore === 12 ? ril.ril_dato?.toFixed(1) : '-'}
                          </td>
                          {/* Umidità (sea_tip_id = 10) */}
                          <td style={{ padding: '12px 5px', color: theme.accentBlue }}>
                            {tipoSensore === 10 ? ril.ril_dato?.toFixed(0) : '-'}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                        Nessuna rilevazione disponibile
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Stato Arnia in fondo allo storico */}
            <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
               <h4 style={{ margin: '0 0 5px 0', fontSize: '0.8rem', color: theme.deepHoney, textTransform: 'uppercase' }}>Stato Arnia</h4>
               {statiSensori.map((stato, i) => (
                 <div key={i} style={{ 
                   fontSize: '0.8rem', 
                   padding: '6px 12px', 
                   borderRadius: '8px', 
                   background: 'white', 
                   borderLeft: `3px solid ${stato.colore}`, 
                   boxShadow: '0 2px 4px rgba(0,0,0,0.05)', 
                   color: stato.colore, 
                   fontWeight: '600',
                   display: 'flex',
                   alignItems: 'center',
                   gap: '5px'
                 }}>
                   {stato.stato === 'ok' ? '✓' : stato.stato === 'danger' ? '⚠' : '○'} {stato.messaggio}
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
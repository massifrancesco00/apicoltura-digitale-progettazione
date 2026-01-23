import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme, styles } from './theme';

const SceltaApiario = () => {
  const navigate = useNavigate();
  
  // --- STATI PER I DATI ---
  const [apiari, setApiari] = useState([]);
  const [arnieTutte, setArnieTutte] = useState([]); // Database completo arnie
  const [arnieFiltrate, setArnieFiltrate] = useState([]); // Arnie filtrate per apiario
  const [apiarioSelezionato, setApiarioSelezionato] = useState('');
  const [arniaSelezionata, setArniaSelezionata] = useState('');
  const [loading, setLoading] = useState(true);

  // Configurazione RestDB
  const RESTDB_URL = 'https://databaseleopoldo56-45cd.restdb.io/rest';
  const API_KEY = '6971ef3e3731f7e0e33fd81c';

  // --- FUNZIONI DI RECUPERO DATI (FETCH) ---

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const headers = {
        'Content-Type': 'application/json',
        'x-apikey': API_KEY,
        'cache-control': 'no-cache'
      };

      // Caricamento parallelo di apiari e arnie
      const [resApiari, resArnie] = await Promise.all([
        fetch(`${RESTDB_URL}/apiari`, { method: 'GET', headers }),
        fetch(`${RESTDB_URL}/arnie`, { method: 'GET', headers })
      ]);

      const dataApiari = await resApiari.json();
      const dataArnie = await resArnie.json();

      setApiari(dataApiari);
      setArnieTutte(dataArnie);

      // Inizializzazione: seleziona il primo apiario disponibile
      if (dataApiari.length > 0) {
        const primoId = dataApiari[0].api_id || dataApiari[0]._id;
        setApiarioSelezionato(primoId);
      }
      
      console.log('✅ Dati caricati correttamente');
    } catch (error) {
      console.error('❌ Errore durante il fetch:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- LOGICA DI FILTRAGGIO (Il fix per il secondo apiario) ---

  useEffect(() => {
    if (apiarioSelezionato) {
      console.log('🔍 Filtro arnie per apiario ID:', apiarioSelezionato);
      
      // Filtriamo assicurandoci che i tipi coincidano (stringa)
      const filtrate = arnieTutte.filter(arnia => 
        String(arnia.arn_api_id) === String(apiarioSelezionato)
      );

      setArnieFiltrate(filtrate);

      // Se ci sono arnie, seleziona la prima, altrimenti svuota
      if (filtrate.length > 0) {
        setArniaSelezionata(filtrate[0]._id);
      } else {
        setArniaSelezionata('');
      }
    }
  }, [apiarioSelezionato, arnieTutte]);

  // --- GESTORI EVENTI ---

  const handleApiarioChange = (e) => {
    setApiarioSelezionato(e.target.value);
  };

  const handleVisualizzaDati = () => {
    if (apiarioSelezionato && arniaSelezionata) {
      const apiarioData = apiari.find(a => (a.api_id || a._id) === apiarioSelezionato);
      const arniaData = arnieFiltrate.find(a => a._id === arniaSelezionata);
      
      // Salva l'arn_id dell'arnia in localStorage
      try {
        const arnId = arniaData?.arn_id || arniaSelezionata;
        localStorage.setItem('arniaSelezionata', arnId);
        console.log('✅ arn_id salvato in localStorage:', arnId);
      } catch (error) {
        console.error('❌ Errore nel salvataggio in localStorage:', error);
      }
      
      navigate('/home', {
        state: {
          apiarioId: apiarioSelezionato,
          arniaId: arniaSelezionata,
          apiario: apiarioData,
          arnia: arniaData
        }
      });
    } else {
      alert('Seleziona un apiario e un\'arnia');
    }
  };

  const getArniaNome = (arnia) => {
    const mac = arnia.arn_MacAddress || 'N/A';
    const shortMac = mac.split(':').slice(-2).join(':');
    return `Arnia [..${shortMac}] - ${arnia.arn_piena === 'true' ? '🍯 Piena' : '📦 Disponibile'}`;
  };

  if (loading) {
    return (
      <div style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
        <div style={styles.amberCard}>
          <p style={{ color: theme.deepHoney }}>🐝 Caricamento apiari in corso...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
      <div className="honeycomb-bg"></div>
      
      <div style={{ ...styles.amberCard, width: '400px', zIndex: 2 }}>
        <h2 style={{ textAlign: 'center', color: theme.deepHoney, marginBottom: '24px' }}>
          Seleziona Obiettivo
        </h2>

        {/* Menu Apiario */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: theme.deepHoney, fontSize: '14px', fontWeight: 'bold' }}>
            📍 Scegli Apiario
          </label>
          <select 
            style={styles.warmInput}
            value={apiarioSelezionato}
            onChange={handleApiarioChange}
          >
            {apiari.map((api) => (
              <option key={api._id} value={api.api_id || api._id}>
                🌼 {api.api_nome} ({api.api_luogo})
              </option>
            ))}
          </select>
        </div>

        {/* Menu Arnia */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: theme.deepHoney, fontSize: '14px', fontWeight: 'bold' }}>
            🐝 Scegli Arnia
          </label>
          <select 
            style={styles.warmInput}
            value={arniaSelezionata}
            onChange={(e) => setArniaSelezionata(e.target.value)}
            disabled={arnieFiltrate.length === 0}
          >
            {arnieFiltrate.length === 0 ? (
              <option>Nessuna arnia presente</option>
            ) : (
              arnieFiltrate.map((arnia) => (
                <option key={arnia._id} value={arnia._id}>
                  {getArniaNome(arnia)}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Box Info Selezionata */}
        {arniaSelezionata && (
          <div style={{ background: 'rgba(255,255,255,0.4)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
            <strong>Dettaglio Arnia:</strong><br/>
            MAC: {arnieFiltrate.find(a => a._id === arniaSelezionata)?.arn_MacAddress}<br/>
            Stato: {arnieFiltrate.find(a => a._id === arniaSelezionata)?.arn_piena === 'true' ? 'Miele pronto' : 'In lavorazione'}
          </div>
        )}

        <button 
          onClick={handleVisualizzaDati} 
          className="honey-btn-hover" 
          style={{
            ...styles.honeyButton,
            opacity: (!apiarioSelezionato || !arniaSelezionata) ? 0.5 : 1,
            cursor: (!apiarioSelezionato || !arniaSelezionata) ? 'not-allowed' : 'pointer'
          }}
          disabled={!apiarioSelezionato || !arniaSelezionata}
        >
          ANALIZZA DATI
        </button>

        <div style={{ marginTop: '15px', fontSize: '11px', textAlign: 'center', color: '#666' }}>
          Sistema collegato: {arnieTutte.length} arnie totali rilevate
        </div>
      </div>
    </div>
  );
};

export default SceltaApiario;
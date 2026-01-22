import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme, styles } from './theme';

const SceltaApiario = () => {
  const navigate = useNavigate();
  
  // Stati per i dati
  const [apiari, setApiari] = useState([]);
  const [arnieTutte, setArnieTutte] = useState([]); // Tutte le arnie dal DB
  const [arnieFiltrate, setArnieFiltrate] = useState([]); // Arnie filtrate per apiario
  const [apiarioSelezionato, setApiarioSelezionato] = useState('');
  const [arniaSelezionata, setArniaSelezionata] = useState('');
  const [loading, setLoading] = useState(true);

  // Configurazione RestDB. io
  const RESTDB_URL = 'https://databaseleopoldo56-45cd.restdb.io/rest';
  const API_KEY = '6971ef3e3731f7e0e33fd81c';

  // Carica apiari all'avvio
  useEffect(() => {
    fetchApiari();
    fetchArnie();
  }, []);

  // Filtra le arnie quando cambia l'apiario selezionato
  useEffect(() => {
    if (apiarioSelezionato) {
      filtraArniePerApiario(apiarioSelezionato);
    }
  }, [apiarioSelezionato, arnieTutte]);

  // Funzione per recuperare gli apiari
  const fetchApiari = async () => {
    try {
      setLoading(true);
      
      const url = `${RESTDB_URL}/apiari`;
      console.log('📡 Chiamata apiari:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': API_KEY,
          'cache-control': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response. status}`);
      }
      
      const data = await response. json();
      console.log('✅ Apiari ricevuti:', data);
      
      setApiari(Array.isArray(data) ? data : []);
      
      // Seleziona il primo apiario di default
      if (data.length > 0) {
        setApiarioSelezionato(data[0]. api_id || data[0]._id);
      }
    } catch (error) {
      console.error('❌ Errore nel caricamento degli apiari:', error);
      
      // Dati di esempio in caso di errore
      const apiariEsempio = [
        { 
          _id: '1',
          api_id: 'API001', 
          api_nome: 'Campo Fiorito',
          api_luogo: 'Roma',
          api_lat: 41.9028,
          api_lon: 12.4964
        },
        { 
          _id: '2',
          api_id: 'API002', 
          api_nome: 'Bosco Verde',
          api_luogo:  'Milano',
          api_lat: 45.4642,
          api_lon: 9.1900
        }
      ];
      setApiari(apiariEsempio);
      setApiarioSelezionato('API001');
    } finally {
      setLoading(false);
    }
  };

  // Funzione per recuperare TUTTE le arnie
  const fetchArnie = async () => {
    try {
      const url = `${RESTDB_URL}/arnie`;
      console.log('📡 Chiamata arnie:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': API_KEY,
          'cache-control':  'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Arnie ricevute:', data);
      
      setArnieTutte(Array. isArray(data) ? data : []);
    } catch (error) {
      console.error('❌ Errore nel caricamento delle arnie:', error);
      
      // Dati di esempio in caso di errore
      const arnieEsempio = [
        { 
          _id: 'a1',
          arn_api_id: 'API001',
          arn_MacAddress: 'ce:d3:00:6a:c4:9e',
          arn_dataInst: '2025-01-15',
          arn_piena: 'false'
        },
        { 
          _id: 'a2',
          arn_api_id: 'API001',
          arn_MacAddress: 'aa:bb:cc:dd:ee:ff',
          arn_dataInst: '2025-01-10',
          arn_piena: 'false'
        },
        { 
          _id: 'a3',
          arn_api_id: 'API002',
          arn_MacAddress: 'ff:ee:dd:cc:bb:aa',
          arn_dataInst: '2025-01-12',
          arn_piena: 'true'
        }
      ];
      setArnieTutte(arnieEsempio);
    }
  };

  // Filtra arnie in base all'api_id dell'apiario selezionato
  const filtraArniePerApiario = (apiId) => {
    console.log('🔍 Filtro arnie per api_id:', apiId);
    
    const filtrate = arnieTutte.filter(arnia => {
      const match = arnia.arn_api_id === apiId;
      console.log(`Arnia ${arnia._id}:  arn_api_id=${arnia.arn_api_id}, match=${match}`);
      return match;
    });
    
    console.log('✅ Arnie filtrate:', filtrate);
    setArnieFiltrate(filtrate);
    
    // Seleziona la prima arnia filtrata
    if (filtrate. length > 0) {
      setArniaSelezionata(filtrate[0]._id);
    } else {
      setArniaSelezionata('');
      console.log('⚠️ Nessuna arnia trovata per questo apiario');
    }
  };

  // Gestisci cambio apiario
  const handleApiarioChange = (e) => {
    const nuovoApiId = e.target.value;
    console.log('🔄 Cambio apiario a:', nuovoApiId);
    setApiarioSelezionato(nuovoApiId);
  };

  // Gestisci il click su "Visualizza Dati"
  const handleVisualizzaDati = () => {
    if (apiarioSelezionato && arniaSelezionata) {
      // Trova i dati completi selezionati
      const apiarioData = apiari.find(a => (a.api_id || a._id) === apiarioSelezionato);
      const arniaData = arnieFiltrate.find(a => a._id === arniaSelezionata);
      
      console.log('📊 Navigazione con dati:', { apiarioData, arniaData });
      
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

  // Funzione helper per formattare il nome dell'arnia
  const getArniaNome = (arnia) => {
    const mac = arnia.arn_MacAddress || 'N/A';
    const shortMac = mac.split(':').slice(-3).join(':');
    const piena = arnia.arn_piena === 'true' ? '🍯 Piena' : '📦 Disponibile';
    
    return `Arnia ${shortMac} - ${piena}`;
  };

  if (loading) {
    return (
      <div style={{ ... styles.container, justifyContent: 'center', alignItems: 'center' }}>
        <div className="honeycomb-bg"></div>
        <div style={{ ...styles.amberCard, width: '350px', zIndex: 2 }}>
          <p style={{ textAlign: 'center', color: theme.deepHoney }}>🐝 Caricamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...styles. container, justifyContent: 'center', alignItems: 'center' }}>
      <div className="honeycomb-bg"></div>
      <div style={{ ... styles.amberCard, width: '400px', zIndex: 2, maxHeight: '90vh', overflowY: 'auto' }}>
        <h2 style={{ textAlign: 'center', color: theme.deepHoney, marginBottom: '24px' }}>
          Seleziona Obiettivo
        </h2>
        
        {/* Select Apiario */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            color: theme.deepHoney,
            fontSize: '14px',
            fontWeight: '500'
          }}>
            📍 Apiario
          </label>
          <select 
            style={styles.warmInput}
            value={apiarioSelezionato}
            onChange={handleApiarioChange}
          >
            {apiari.length === 0 ? (
              <option>Nessun apiario disponibile</option>
            ) : (
              apiari.map((apiario) => (
                <option key={apiario._id} value={apiario. api_id || apiario._id}>
                  🌼 {apiario.api_nome} ({apiario.api_luogo})
                </option>
              ))
            )}
          </select>
        </div>

        {/* Select Arnia */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            color: theme.deepHoney,
            fontSize: '14px',
            fontWeight: '500'
          }}>
            🐝 Arnia
          </label>
          <select 
            style={styles.warmInput}
            value={arniaSelezionata}
            onChange={(e) => setArniaSelezionata(e.target. value)}
            disabled={arnieFiltrate.length === 0}
          >
            {arnieFiltrate.length === 0 ? (
              <option>Nessuna arnia per questo apiario</option>
            ) : (
              arnieFiltrate.map((arnia) => (
                <option key={arnia._id} value={arnia._id}>
                  🐝 {getArniaNome(arnia)}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Info dettagliate arnia selezionata */}
        {arniaSelezionata && arnieFiltrate.length > 0 && (
          <div style={{
            background: '#F3F4F6',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '13px',
            color: '#374151'
          }}>
            <div style={{ marginBottom: '8px' }}>
              <strong>📍 MAC Address:</strong><br />
              <code style={{ 
                background: '#E5E7EB', 
                padding: '4px 8px', 
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                {arnieFiltrate.find(a => a._id === arniaSelezionata)?.arn_MacAddress}
              </code>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <strong>🔗 API ID:</strong><br />
              <code style={{ 
                background: '#E5E7EB', 
                padding: '4px 8px', 
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                {arnieFiltrate.find(a => a._id === arniaSelezionata)?.arn_api_id}
              </code>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <strong>📅 Data Installazione:</strong><br />
              {arnieFiltrate.find(a => a._id === arniaSelezionata)?.arn_dataInst ?  
                new Date(arnieFiltrate. find(a => a._id === arniaSelezionata)?.arn_dataInst).toLocaleDateString('it-IT', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                }) : 'N/A'}
            </div>
            <div>
              <strong>📦 Stato: </strong><br />
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '12px',
                background: arnieFiltrate.find(a => a._id === arniaSelezionata)?.arn_piena === 'true' ?  '#FEE2E2' : '#D1FAE5',
                color: arnieFiltrate.find(a => a._id === arniaSelezionata)?.arn_piena === 'true' ?  '#991B1B' : '#065F46',
                fontSize: '12px',
                fontWeight: '500',
                marginTop: '4px'
              }}>
                {arnieFiltrate.find(a => a._id === arniaSelezionata)?.arn_piena === 'true' ? '🍯 Arnia Piena' : '✅ Disponibile'}
              </span>
            </div>
          </div>
        )}

        {/* Info selezione */}
        {apiarioSelezionato && arniaSelezionata && (
          <div style={{
            background: '#FEF3C7',
            padding:  '12px',
            borderRadius: '8px',
            marginBottom:  '16px',
            fontSize:  '14px',
            color: theme.deepHoney
          }}>
            <strong>✓ Selezione: </strong><br />
            {apiari.find(a => (a.api_id || a._id) === apiarioSelezionato)?.api_nome} → {' '}
            {getArniaNome(arnieFiltrate.find(a => a._id === arniaSelezionata))}
          </div>
        )}

        <button 
          onClick={handleVisualizzaDati} 
          className="honey-btn-hover" 
          style={{
            ...styles.honeyButton,
            opacity: (! apiarioSelezionato || ! arniaSelezionata) ? 0.5 : 1,
            cursor: (!apiarioSelezionato || !arniaSelezionata) ? 'not-allowed' : 'pointer'
          }}
          disabled={! apiarioSelezionato || ! arniaSelezionata}
        >
          VISUALIZZA DATI
        </button>

        {/* Info totali */}
        <div style={{
          marginTop: '20px',
          padding: '12px',
          background: '#F9FAFB',
          borderRadius: '8px',
          fontSize: '12px',
          color: '#6B7280',
          textAlign: 'center'
        }}>
          📊 {apiari.length} Apiari • {arnieFiltrate.length} Arnie per questo apiario ({arnieTutte.length} totali)
        </div>
      </div>
    </div>
  );
};

export default SceltaApiario;
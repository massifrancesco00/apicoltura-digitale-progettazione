import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { theme, styles } from './theme';
import HoneyMultiSlider from './components/HoneyMultiSlider';

const Impostazioni = () => {
    const RESTDB_URL = 'sonicmellicoclocorot-c202.restdb.io/rest';
    const API_KEY = '69733a683731f776753fd874';
    const arniaId = localStorage.getItem('arniaSelezionata');
    console.log('ID arnia salvato:', arniaId);
    const navigate = useNavigate();
    const [humValues, setHumValues] = useState([40, 55, 75]);
    const [tempValues, setTempValues] = useState([18, 24, 35]);
    const [weightValues, setWeightValues] = useState([10, 25, 40]);
    const [isSaving, setIsSaving] = useState(false);

    const salvaConfigurazione = async () => {
        if (!arniaId) {
            alert('Errore: ID arnia non trovato');
            return;
        }

        setIsSaving(true);

        try {
            // 1. Recupera tutti i sensori dell'arnia
            const response = await fetch(
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

            if (!response.ok) {
                throw new Error('Errore nel recupero dei sensori');
            }

            const sensori = await response.json();
            console.log('Sensori trovati:', sensori);

            if (!sensori || sensori.length === 0) {
                alert('Nessun sensore trovato per questa arnia');
                setIsSaving(false);
                return;
            }

            // 2. Aggiorna ogni sensore con i nuovi valori min e max
            for (const sensore of sensori) {
                let sea_min, sea_max;

                // Determina i valori min e max in base al tipo di sensore
                switch (sensore.sea_tip_id) {
                    case 10: // Umidità
                        sea_min = humValues[0];
                        sea_max = humValues[2];
                        break;
                    case 11: // Peso
                        sea_min = weightValues[0];
                        sea_max = weightValues[2];
                        break;
                    case 12: // Temperatura
                        sea_min = tempValues[0];
                        sea_max = tempValues[2];
                        break;
                    default:
                        // Se il tipo non corrisponde, salta l'aggiornamento
                        console.log(`Tipo sensore non riconosciuto: ${sensore.sea_tip_id}`);
                        continue;
                }

                console.log(`Aggiornamento sensore sea_id ${sensore.sea_id} (tipo ${sensore.sea_tip_id}): min=${sea_min}, max=${sea_max}`);

                // Prepara il body con la struttura corretta includendo sea_id
                const updateBody = {
                    sea_id: sensore.sea_id,
                    sea_stato: sensore.sea_stato,
                    sea_min: sea_min,
                    sea_max: sea_max,
                    sea_arn_id: sensore.sea_arn_id,
                    sea_tip_id: sensore.sea_tip_id
                };

                console.log('Body da inviare:', updateBody);

                // Esegui la PUT per aggiornare il sensore usando l'_id MongoDB
                const updateResponse = await fetch(
                    `${RESTDB_URL}/sensoriarnia/${sensore._id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-apikey': API_KEY,
                            'cache-control': 'no-cache'
                        },
                        mode: 'cors',
                        body: JSON.stringify(updateBody)
                    }
                );

                if (!updateResponse.ok) {
                    const errorText = await updateResponse.text();
                    console.error(`Errore aggiornamento sensore ${sensore.sea_id}:`, errorText);
                    throw new Error(`Errore nell'aggiornamento del sensore ${sensore.sea_id}`);
                }

                const result = await updateResponse.json();
                console.log(`Sensore ${sensore.sea_id} aggiornato:`, result);
            }

            alert('Configurazione salvata con successo!');
        } catch (error) {
            console.error('Errore durante il salvataggio:', error);
            alert(`Errore durante il salvataggio: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

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

        <div style={{marginBottom:'20px'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'30px', fontWeight:'bold', color: theme.deepHoney}}>
                <span>PESO (Kg)</span>
                <span style={{color: theme.accentRed}}>{weightValues.join(' - ')}</span>
            </div>
            <HoneyMultiSlider 
                values={weightValues} 
                min={0} max={50} 
                onChange={setWeightValues} 
                colors={[theme.accentBlue, theme.accentGreen, theme.accentRed]}
            />
        </div>

        <button 
            className="honey-btn-hover" 
            style={{...styles.honeyButton, marginTop:'35px'}}
            onClick={salvaConfigurazione}
            disabled={isSaving}
        >
            {isSaving ? 'SALVATAGGIO...' : 'SALVA CONFIGURAZIONE'}
        </button>
      </div>
    </div>
  );
};

export default Impostazioni;
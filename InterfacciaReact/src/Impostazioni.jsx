import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { theme, styles } from './theme';
import HoneyMultiSlider from './components/HoneyMultiSlider';

const Impostazioni = () => {
    const RESTDB_URL = import.meta.env.VITE_API_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;
    const arniaId = localStorage.getItem('arniaSelezionata');
    console.log('ID arnia salvato:', arniaId);
    const navigate = useNavigate();
    const [humValues, setHumValues] = useState([40, 75]);
    const [tempValues, setTempValues] = useState([18, 35]);
    const [weightValues, setWeightValues] = useState([10, 40]);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Carica le soglie dal database all'avvio
    useEffect(() => {
        const caricaSoglie = async () => {
            if (!arniaId) {
                setIsLoading(false);
                return;
            }

            try {
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

                if (response.ok) {
                    const sensori = await response.json();
                    console.log('Sensori caricati:', sensori);

                    sensori.forEach(sensore => {
                        const min = sensore.sea_min || 0;
                        const max = sensore.sea_max || 100;

                        switch (sensore.sea_tip_id) {
                            case 10: // Umidità
                                setHumValues([min, max]);
                                break;
                            case 11: // Peso
                                setWeightValues([min, max]);
                                break;
                            case 12: // Temperatura
                                setTempValues([min, max]);
                                break;
                        }
                    });
                }
            } catch (error) {
                console.error('Errore caricamento soglie:', error);
            } finally {
                setIsLoading(false);
            }
        };

        caricaSoglie();
    }, [arniaId]);

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
                        sea_min = Number(humValues[0]);
                        sea_max = Number(humValues[1]);
                        break;
                    case 11: // Peso
                        sea_min = Number(weightValues[0]);
                        sea_max = Number(weightValues[1]);
                        break;
                    case 12: // Temperatura
                        sea_min = Number(tempValues[0]);
                        sea_max = Number(tempValues[1]);
                        break;
                    default:
                        // Se il tipo non corrisponde, salta l'aggiornamento
                        console.log(`Tipo sensore non riconosciuto: ${sensore.sea_tip_id}`);
                        continue;
                }

                console.log(`Aggiornamento sensore sea_id ${sensore.sea_id} (tipo ${sensore.sea_tip_id}): min=${sea_min}, max=${sea_max}`);

                // Prepara il body con TUTTI i campi richiesti dal database
                const updateBody = {
                    sea_id: Number(sensore.sea_id),
                    sea_arn_id: Number(sensore.sea_arn_id),
                    sea_tip_id: Number(sensore.sea_tip_id),
                    sea_stato: sensore.sea_stato,
                    sea_min: sea_min,
                    sea_max: sea_max
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

    if (isLoading) {
        return (
            <div style={{ ...styles.container, padding: '30px', justifyContent: 'center', alignItems: 'center' }}>
                <div className="honeycomb-bg"></div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                        width: '50px', 
                        height: '50px', 
                        border: `5px solid ${theme.goldenYellow}`, 
                        borderTop: `5px solid ${theme.warmOrange}`,
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 20px'
                    }}></div>
                    <p style={{ color: theme.deepHoney, fontSize: '1.1rem' }}>Caricamento impostazioni...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ ...styles.container, padding: '30px', justifyContent: 'center', alignItems: 'center' }}>
            <div className="honeycomb-bg"></div>
            <div style={{ ...styles.amberCard, width: '420px', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                    <button onClick={() => navigate('/home')} className="menu-btn-hover" style={{ ...styles.menuButton, position: 'static', marginRight: '20px', width: '40px', height: '40px' }}>
                        <FaHome />
                    </button>
                    <h2 style={{ margin: 0, color: theme.deepHoney }}>Calibrazione Soglie</h2>
                </div>

                <div style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: 'bold', color: theme.deepHoney }}>
                        <span>UMIDITÀ (%)</span>
                        <span style={{ color: theme.accentBlue }}>Min: {humValues[0]} - Max: {humValues[1]}</span>
                    </div>
                    <HoneyMultiSlider
                        values={humValues}
                        min={0} max={100}
                        onChange={setHumValues}
                        colors={[theme.accentBlue, theme.accentRed]}
                    />
                </div>

                <div style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: 'bold', color: theme.deepHoney }}>
                        <span>TEMPERATURA (°C)</span>
                        <span style={{ color: theme.accentRed }}>Min: {tempValues[0]} - Max: {tempValues[1]}</span>
                    </div>
                    <HoneyMultiSlider
                        values={tempValues}
                        min={0} max={50}
                        onChange={setTempValues}
                        colors={[theme.accentBlue, theme.accentRed]}
                    />
                </div>

                <div style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: 'bold', color: theme.deepHoney }}>
                        <span>PESO (Kg)</span>
                        <span style={{ color: theme.warmOrange }}>Min: {weightValues[0]} - Max: {weightValues[1]}</span>
                    </div>
                    <HoneyMultiSlider
                        values={weightValues}
                        min={0} max={50}
                        onChange={setWeightValues}
                        colors={[theme.accentBlue, theme.accentRed]}
                    />
                </div>

                <button
                    className="honey-btn-hover"
                    style={{ ...styles.honeyButton, marginTop: '35px' }}
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
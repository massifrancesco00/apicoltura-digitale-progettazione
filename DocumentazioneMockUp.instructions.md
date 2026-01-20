SCOPO
Documento unico di analisi “da informatico” delle schermate: componenti UI, pattern di navigazione, stati, e implicazioni tecniche (routing, permessi, validazioni, gestione errori).

CONVENZIONI
Shell applicativa: struttura ricorrente composta da menu laterale/drawer + header/top bar + area contenuto.
Stati contenuto consigliati: loading | empty | error | data.
Errori: distinguere tra messaggio “client-safe” (mostrato) e dettagli tecnici (solo log).

Selezione profilo/ruolo (2 opzioni)
Descrizione UI
Sfondo arancione.
Card centrale con due scelte: Docente, Alunno.
Componenti (ipotetici)
Container/Scaffold con background arancione
Card centrata (ombra/elevation)
2 pulsanti/list item selezionabili
Funzione
Schermata iniziale: selezione ruolo e instradamento verso flussi diversi.
Note tecniche
Accessibilità: area cliccabile adeguata, contrasto testo/sfondo.
Selezione profilo/ruolo (3 opzioni)
Descrizione UI :
Stesso pattern della schermata precedente.
Card centrale con: Alunno, Docente, Genitore.
Implicazioni tecniche :
Permessi e visibilità feature devono essere coerenti:
UI: mostra/nasconde sezioni
Backend: valida autorizzazioni sulle API.
Dashboard/Home con sidebar + header + contenuto
Descrizione UI
Layout “app completa”:
Sidebar sinistra (menu verticale con icone e voci)
Header/top bar (azioni rapide: notifiche/profilo)
Area contenuto centrale (pannello/card con placeholder tipo “benvenuto”).
Pattern UI:
Stile admin panel/desktop: sidebar fissa + content flessibile.
Note tecniche :
Routing interno: click su voce sidebar → cambia route e aggiorna il contenuto.
Evidenziare la voce attiva (active route).
Responsività: su schermi piccoli la sidebar dovrebbe collassare in drawer.
Variante responsive/mobile con drawer + contenuto su card
Descrizione UI
Variante più “mobile” della shell:
Drawer/side menu (aperto o estraibile)
Contenuto su card/sheet, scrollabile
Header in alto; può comparire un badge/etichetta (es. “Assistente”).
Pattern UI
AppBar + Drawer navigation + contenuto sovrapposto/affiancato in base al breakpoint.
Shell con tab/segment in header + contenuto “vuoto”
Descrizione UI
Shell con:
mini drawer/sidebar a sinistra
header con selettore (tab/segment) al centro
card contenuto centrale con placeholder (stato “nessun elemento”).
Pattern UI
Header usato come filtro di vista (es. Attivi/Archiviati, Oggi/Settimana, ecc.).
Note tecniche
Cambio tab → ricarica dati → aggiornamento UI con stati: loading, empty, error, data.
Evitare chiamate duplicate: caching o debounce quando si cambiano filtri rapidamente.
Variante della precedente con contesto “Assistente” (badge) + tab diverso
Descrizione UI
Stessa struttura della schermata precedente.
Presente badge “Assistente”.
Il selettore/tab appare in stato differente (tab attivo differente).
Implicazioni tecniche
“Assistente” sembra un contesto applicativo: modulo attivo, modalità, o feature abilitata.
Form “Nuovo blog” (creazione contenuto)
Descrizione UI
Pagina con titolo “Nuovo blog”.
Form con campi a sinistra (es. Titolo, Testo/Descrizione, altri) e controlli a destra (probabili checkbox/toggle/azioni).
Elemento centrale evidenziato che sembra una sezione/step o un controllo contestuale.
Componenti (ipotetici)
Form
Campo Titolo (TextField)
Campo Contenuto (TextArea)
Switch/Checkbox per opzioni (visibilità, bozza/pubblicato, commenti, ecc.)
Azioni: Salva / Pubblica / Annulla (tipiche del contesto)
Validazioni consigliate
Titolo: obbligatorio, lunghezza max (80–120)
Contenuto: obbligatorio o minimo caratteri
Sanitizzazione lato server (se HTML/Markdown) + prevenzione XSS
Errori: gestione field-level (422) + messaggio generale (banner/toast)
Flusso tecnico
Submit → POST /blogs (o endpoint equivalente)
Success → redirect a lista/dettaglio
Error → mostra errori e mantiene i dati inseriti.
Schermata di errore con “Riprova” / “Esci” (messaggio dinamico)
Descrizione UI
Sfondo arancione con pannello centrale.
Titolo grande (placeholder): “Tipo Errore”.
Due pulsanti principali: “Riprova” e “Esci”.
Contenuto dinamico
Titolo breve (es. “Errore di rete”, “Accesso negato”, “Servizio non disponibile”)
Dettaglio opzionale non sensibile (se serve)
Componenti (ipotetici)
Container/Scaffold con background arancione
Card/Panel centrale con bordi arrotondati
Text dinamico per errore
2 pulsanti (primary/secondary)
Comportamento (logica)
Riprova: riesegue l’ultima operazione fallita (API/caricamento), passa a loading e poi data oppure error. Consigliato retry con limite tentativi e backoff (1s, 2s, 4s).
Esci: ritorna a una schermata “sicura” (precedente o Home). In caso di sessione scaduta può reindirizzare al login.
Linee guida sicurezza
Non mostrare dettagli sensibili (stack trace, token, payload completi, ID interni).
Mappare errori tecnici a messaggi client-safe:
Timeout/rete → “Connessione non disponibile. Riprova.”
401/403 → “Sessione scaduta / Accesso non autorizzato.”
SINTESI ARCHITETTURALE (IMPLICITA)
Navigazione
Selezione ruolo (schermate 1–2)
Entrata nella shell applicativa (schermate 3–6)
Sezioni operative/CRUD (schermata 7 come create; le altre viste possono essere list/empty)
Gestione errori bloccanti con pagina dedicata (schermata 8) o error banner per errori non bloccanti
Questa è una documentazione tecnica strutturata del diagramma di flusso (funzionigramma) caricato, che descrive il percorso utente e le funzionalità di un'applicazione per la gestione di apiari e arnie.

----------

## 1. Accesso al Sistema (Schermata Login)

Il punto di ingresso dell'applicazione è gestito tramite le **API Digitali** che alimentano la **Schermata Login**. In questa fase, l'utente interagisce con il sistema di autenticazione:

-   **Pulsante ACCEDI (1.1):** Consente il passaggio alla fase operativa dell'app solo dopo la verifica delle credenziali inserite. Se le credenziali sono corrette, l'utente viene indirizzato alla selezione delle risorse.
    

## 2. Selezione Risorse (Schermata Selezione Apiario e Arnia)

Una volta autenticato, l'utente accede alla gestione gerarchica delle strutture:

-   **Pulsante VISUALIZZA (2.1):** Permette di scegliere un'arnia specifica all'interno di un apiario tramite un menu a tendina (combo box). L'azione conferma la selezione e carica i dati relativi alla **Schermata Gestione Arnia**.
    

## 3. Gestione e Navigazione Arnia (Schermata Gestione Arnia)

Questa è la sezione centrale dell'applicazione, dove l'utente può monitorare i dati e navigare verso altre funzionalità:

-   **Pulsante LOGOUT (3.1):** Permette l'uscita immediata dall'account, riportando l'utente alla schermata di Login iniziale.
    
-   **Pulsante CAMBIA APIARIO (3.2):** Consente di tornare indietro alla schermata di selezione per scegliere un'altra arnia o un altro apiario senza disconnettersi.
    
-   **Pulsante VALORE (3.3.1 3.3.2 3.3.3):** Apre la sezione dedicata alla telemetria e ai sensori (Umidità, Temperatura, Peso).
    
-   **Pulsante IMPOSTA ARNIA (3.4):** Indirizza l'utente alla configurazione dei parametri di controllo.
    

## 4. Visualizzazione Notifiche e Dati (Schermata Notifiche Valore)

In questa sezione, l'utente visualizza i dati in tempo reale o le notifiche relative allo stato di salute dell'alveare:

-   **Parametri monitorati:** Umidità, Temperatura e Peso.
    
-   **Pulsante INDIETRO (4.1):** Permette di chiudere la visualizzazione dei valori e tornare alla Schermata di Gestione Arnia principale.
    

## 5. Configurazione Soglie (Schermata Gestione Soglie)

L'utente ha la possibilità di personalizzare gli allarmi e i limiti operativi dell'arnia:

-   **Funzionalità:** Permette di impostare e gestire le soglie dei valori critici (ad esempio, alert se la temperatura scende sotto un certo livello).
    
-   **Pulsante INDIETRO (4.1):** Consente di salvare o uscire dalla configurazione tornando alla Schermata di Gestione Arnia.
-   **Schermata Notifiche Valore:** Visualizza il dettaglio dei dati raccolti. Anche qui, un **Pulsante INDIETRO** garantisce la navigazione di ritorno alla schermata di gestione arnia.

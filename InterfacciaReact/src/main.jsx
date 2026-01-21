// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Assicurati che il file con il codice grosso si chiami App.jsx

// Questo cerca il <div id="root"> nell'HTML e ci infila dentro la tua app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
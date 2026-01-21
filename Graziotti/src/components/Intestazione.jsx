import React from 'react';
import './Intestazione.css';

function Intestazione({ utenteCorrente }) {
  return (
    <div className="intestazione">
      <div className="badge-utente">
        Utente: <span className="nome-utente">{utenteCorrente}</span>
      </div>
    </div>
  );
}

export default Intestazione;
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>💰 Convertisseur de Devises</h1>
        <p>Déployé avec succès sur Vercel !</p>
        <p>Application React fonctionnelle - Prête pour le développement</p>
        <div style={{ marginTop: '20px', fontSize: '14px', color: '#61dafb' }}>
          <p>Prochaines étapes :</p>
          <ul style={{ textAlign: 'left', display: 'inline-block' }}>
            <li>Ajouter l'API de taux de change</li>
            <li>Créer l'interface de conversion</li>
            <li>Configurer un domaine personnalisé</li>
          </ul>
        </div>
        <a
          className="App-link"
          href="https://github.com/pedrolitoto94350/currency-converter"
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir le code sur GitHub
        </a>
      </header>
    </div>
  );
}

export default App;
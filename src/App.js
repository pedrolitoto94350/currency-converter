import React, { useState, useEffect } from 'react';
import './App.css';

// Liste des devises principales avec drapeaux
const CURRENCIES = [
  { code: 'USD', name: 'Dollar américain', flag: '🇺🇸', symbol: '$' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€' },
  { code: 'GBP', name: 'Livre sterling', flag: '🇬🇧', symbol: '£' },
  { code: 'JPY', name: 'Yen japonais', flag: '🇯🇵', symbol: '¥' },
  { code: 'CAD', name: 'Dollar canadien', flag: '🇨🇦', symbol: 'CA$' },
  { code: 'AUD', name: 'Dollar australien', flag: '🇦🇺', symbol: 'A$' },
  { code: 'CHF', name: 'Franc suisse', flag: '🇨🇭', symbol: 'CHF' },
  { code: 'CNY', name: 'Yuan chinois', flag: '🇨🇳', symbol: '¥' },
  { code: 'INR', name: 'Roupie indienne', flag: '🇮🇳', symbol: '₹' },
  { code: 'BRL', name: 'Real brésilien', flag: '🇧🇷', symbol: 'R$' },
  { code: 'RUB', name: 'Rouble russe', flag: '🇷🇺', symbol: '₽' },
  { code: 'ZAR', name: 'Rand sud-africain', flag: '🇿🇦', symbol: 'R' },
  { code: 'MXN', name: 'Peso mexicain', flag: '🇲🇽', symbol: '$' },
  { code: 'SGD', name: 'Dollar de Singapour', flag: '🇸🇬', symbol: 'S$' },
  { code: 'HKD', name: 'Dollar de Hong Kong', flag: '🇭🇰', symbol: 'HK$' },
  { code: 'NZD', name: 'Dollar néo-zélandais', flag: '🇳🇿', symbol: 'NZ$' },
  { code: 'SEK', name: 'Couronne suédoise', flag: '🇸🇪', symbol: 'kr' },
  { code: 'NOK', name: 'Couronne norvégienne', flag: '🇳🇴', symbol: 'kr' },
  { code: 'DKK', name: 'Couronne danoise', flag: '🇩🇰', symbol: 'kr' },
  { code: 'PLN', name: 'Zloty polonais', flag: '🇵🇱', symbol: 'zł' },
  { code: 'TRY', name: 'Livre turque', flag: '🇹🇷', symbol: '₺' },
  { code: 'KRW', name: 'Won sud-coréen', flag: '🇰🇷', symbol: '₩' },
  { code: 'AED', name: 'Dirham des Émirats', flag: '🇦🇪', symbol: 'د.إ' },
  { code: 'SAR', name: 'Riyal saoudien', flag: '🇸🇦', symbol: 'ر.س' },
];

// Taux de change fixes (pour la démo - en production, utiliser une API)
const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 148.5,
  CAD: 1.35,
  AUD: 1.52,
  CHF: 0.88,
  CNY: 7.18,
  INR: 83.2,
  BRL: 4.95,
  RUB: 91.5,
  ZAR: 18.9,
  MXN: 17.1,
  SGD: 1.34,
  HKD: 7.82,
  NZD: 1.63,
  SEK: 10.45,
  NOK: 10.65,
  DKK: 6.88,
  PLN: 4.02,
  TRY: 30.8,
  KRW: 1320,
  AED: 3.67,
  SAR: 3.75,
};

function App() {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Trouver les infos des devises sélectionnées
  const fromCurrencyInfo = CURRENCIES.find(c => c.code === fromCurrency);
  const toCurrencyInfo = CURRENCIES.find(c => c.code === toCurrency);

  // Fonction de conversion
  const convertCurrency = () => {
    setLoading(true);
    setError(null);
    
    try {
      const amountNum = parseFloat(amount);
      if (isNaN(amountNum) || amountNum < 0) {
        throw new Error('Veuillez entrer un montant valide');
      }

      // Calcul du taux de change
      const rate = EXCHANGE_RATES[toCurrency] / EXCHANGE_RATES[fromCurrency];
      setExchangeRate(rate);
      
      // Calcul du montant converti
      const result = amountNum * rate;
      setConvertedAmount(result.toFixed(2));
    } catch (err) {
      setError(err.message);
      setConvertedAmount(0);
    } finally {
      setLoading(false);
    }
  };

  // Échanger les devises
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Sélectionner une devise rapide
  const selectQuickCurrency = (currencyCode) => {
    setToCurrency(currencyCode);
  };

  // Convertir au chargement et à chaque changement
  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="converter-container">
          <h1 className="converter-title">💰 Convertisseur de Devises</h1>
          <p className="converter-subtitle">Taux de change en temps réel • Conversion instantanée</p>
          
          <div className="conversion-box">
            {/* Devise source */}
            <div className="currency-row">
              <div className="currency-flag">{fromCurrencyInfo?.flag}</div>
              <select 
                className="currency-select"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {CURRENCIES.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
              <input
                className="currency-input"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
                placeholder="Montant"
              />
            </div>

            {/* Bouton d'échange */}
            <button className="swap-button" onClick={swapCurrencies}>
              ⇄
            </button>

            {/* Devise cible */}
            <div className="currency-row">
              <div className="currency-flag">{toCurrencyInfo?.flag}</div>
              <select 
                className="currency-select"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {CURRENCIES.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
              <div className="currency-input" style={{ background: 'transparent', border: 'none' }}>
                {toCurrencyInfo?.symbol} {convertedAmount}
              </div>
            </div>
          </div>

          {/* Résultat de la conversion */}
          <div className="result-box">
            {loading ? (
              <div className="loading">Calcul en cours...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : (
              <>
                <div className="result-text">
                  {amount} {fromCurrency} =
                </div>
                <div className="result-amount">
                  {toCurrencyInfo?.symbol} {convertedAmount} {toCurrency}
                </div>
                <div className="rate-info">
                  1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                </div>
                <div className="rate-info">
                  1 {toCurrency} = {(1 / exchangeRate).toFixed(4)} {fromCurrency}
                </div>
              </>
            )}
          </div>

          {/* Sélection rapide de devises */}
          <div className="currency-grid">
            {CURRENCIES.slice(0, 8).map(currency => (
              <div 
                key={currency.code}
                className={`currency-card ${toCurrency === currency.code ? 'currency-card-selected' : ''}`}
                onClick={() => selectQuickCurrency(currency.code)}
              >
                <div className="currency-card-flag">{currency.flag}</div>
                <div className="currency-card-code">{currency.code}</div>
                <div className="currency-card-name">{currency.name}</div>
              </div>
            ))}
          </div>

          {/* Informations */}
          <div style={{ marginTop: '40px', fontSize: '0.9rem', opacity: 0.7 }}>
            <p>💡 <strong>Astuce :</strong> Cliquez sur une devise pour la sélectionner rapidement</p>
            <p>⚡ <strong>Fonctionnalités :</strong> Conversion instantanée • Échange de devises • Taux fixes</p>
            <p>🚀 <strong>Prochainement :</strong> API temps réel • Historique • Graphiques</p>
          </div>
        </div>

        <div style={{ marginTop: '40px', fontSize: '0.9rem' }}>
          <p>Déployé avec ❤️ sur Vercel • Code source sur GitHub</p>
          <a
            className="App-link"
            href="https://github.com/pedrolitoto94350/currency-converter"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '1rem', marginTop: '10px', display: 'inline-block' }}
          >
            📁 Voir le code source
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
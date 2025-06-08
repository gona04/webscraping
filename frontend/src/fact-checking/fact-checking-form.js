import React, { useState } from 'react';
import './fact-checking-form.css';
const API_URL = process.env.REACT_APP_API_URL;

function FactCheckForm() {
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/api/classify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Something went wrong.' });
    }
    setLoading(false);
  };

  return (
    <div className="app-container fact-form-container">
      <h2 className="fact-form-title">Fact Check a Statement</h2>
      <form className="fact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="fact-input"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          placeholder="Enter your statement"
        />
        <button className="button fact-submit" type="submit" disabled={loading || !userInput}>
          {loading ? 'Checking...' : 'Check'}
        </button>
      </form>
      {result && (
        <div className="fact-result">
          {result.error && <div className="fact-error">{result.error}</div>}
          {result.matches && (
            <div className="fact-matches">
              <h3>Top Matches:</h3>
              <ul>
                {result.matches.map((m, i) => (
                  <li className="fact-match-item" key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}
          {result.result && (
            <pre className="fact-output">{result.result}</pre>
          )}
        </div>
      )}
    </div>
  );
}

export default FactCheckForm;
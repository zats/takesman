'use client';

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const sendPing = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: 'Failed to reach server' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>Ping Pong API Test</h1>
      <div style={{ marginTop: '2rem' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a message"
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            width: '300px',
            marginRight: '1rem',
          }}
        />
        <button
          onClick={sendPing}
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Sending...' : 'Send Ping'}
        </button>
      </div>
      {response && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Server Response:</h2>
          <pre style={{
            background: '#f4f4f4',
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

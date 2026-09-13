import React, { useState, useEffect } from 'react';
import { Button } from './Button';

export const TemplateFetcher = ({ onSelectTemplate }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWritingPrompt = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dummyjson.com/quotes/random');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      console.warn('REST API fetch error, using fallback template:', err);
      // REST API Error Handling with local fallback
      setData({
        quote: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
      });
      setError('Using offline writing inspiration');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWritingPrompt();
  }, []);

  return (
    <div
      style={{
        padding: '1rem 1.25rem',
        background: 'rgba(99, 102, 241, 0.08)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}
    >
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          💡 Daily Writing Inspiration
        </div>
        {loading ? (
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Loading writing prompt from REST API...
          </p>
        ) : (
          <p style={{ fontSize: '0.925rem', fontStyle: 'italic', marginTop: '0.25rem' }}>
            "{data?.quote}" — <strong>{data?.author}</strong>
          </p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button variant="secondary" onClick={fetchWritingPrompt} disabled={loading}>
          {loading ? 'Fetching...' : 'New Prompt'}
        </Button>
      </div>
    </div>
  );
};

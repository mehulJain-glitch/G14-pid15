import React, { useState, useEffect } from 'react';
import { Button } from './Button';

export const TemplateFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWritingPrompt = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://dummyjson.com/quotes/random');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      console.warn('REST API fetch error, using fallback template:', err);
      setData({
        quote: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWritingPrompt();
  }, []);

  return (
    <div
      className="glass-card scroll-slide-up sassy-card-border-glow"
      style={{
        padding: '1.1rem 1.4rem',
        background: 'rgba(25, 34, 52, 0.75)',
        border: '1px solid rgba(108, 99, 255, 0.28)',
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
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2EC4B6', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span>💡</span>
          <span>Daily Writing Inspiration • REST API</span>
        </div>
        {loading ? (
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Fetching creative quote from REST API...
          </p>
        ) : (
          <p style={{ fontSize: '0.95rem', fontStyle: 'italic', marginTop: '0.35rem', color: 'var(--text-main)' }}>
            "{data?.quote}" — <strong style={{ color: '#6C63FF' }}>{data?.author}</strong>
          </p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button
          variant="secondary"
          onClick={fetchWritingPrompt}
          disabled={loading}
          className="animated-btn-press"
          style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
        >
          {loading ? 'Fetching...' : '✦ New Prompt'}
        </Button>
      </div>
    </div>
  );
};

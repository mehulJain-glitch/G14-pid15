import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { ToastContainer } from '../components/Toast';
import { useAppStore } from '../store/appStore';

export const Settings = () => {
  const toasts = useAppStore((state) => state.toasts);
  const addToast = useAppStore((state) => state.addToast);
  const removeToast = useAppStore((state) => state.removeToast);

  const [theme, setTheme] = useState('dark');
  const [autoSave, setAutoSave] = useState('1s');
  const [notifications, setNotifications] = useState(true);

  const handleSaveSettings = () => {
    addToast('Application preferences saved', 'success');
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <div className="page-container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Application Settings
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Customize your Team Titans preferences and editor workspace
          </p>

          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* Appearance Section */}
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Appearance</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Select your preferred color theme
              </p>
              <select
                className="input-field"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="dark">SaaS Midnight (Dark Default)</option>
                <option value="slate">Deep Slate</option>
              </select>
            </div>

            {/* Editor Preferences */}
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Editor Preferences</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Auto-save sync delay
              </p>
              <select
                className="input-field"
                value={autoSave}
                onChange={(e) => setAutoSave(e.target.value)}
              >
                <option value="1s">1 second (Recommended)</option>
                <option value="2s">2 seconds</option>
                <option value="manual">Manual save only</option>
              </select>
            </div>

            {/* Notifications */}
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Notifications</h3>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: 'var(--primary)' }}
                />
                <span style={{ fontSize: '0.9rem' }}>
                  Show toast notifications for comments and version updates
                </span>
              </label>
            </div>

            <div>
              <Button variant="primary" onClick={handleSaveSettings}>
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      </main>

      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};

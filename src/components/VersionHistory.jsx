import React from 'react';
import { Button } from './Button';
import { useAppStore } from '../store/appStore';

export const VersionHistory = ({ document }) => {
  const updateDocument = useAppStore((state) => state.updateDocument);
  const addToast = useAppStore((state) => state.addToast);

  if (!document) return null;

  const versions = document.versions || [];

  const handleRestore = (version) => {
    // Create new current snapshot before restoring
    const newVersionObj = {
      id: `v-${Date.now()}`,
      versionNumber: versions.length + 1,
      title: `Snapshot before restore to v${version.versionNumber}`,
      timestamp: new Date().toISOString(),
      content: document.content
    };

    updateDocument(document.id, {
      content: version.content,
      versions: [newVersionObj, ...versions]
    });

    addToast(`Restored to Version ${version.versionNumber}`, 'success');
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        Saved snapshots for this document.
      </div>

      {!versions.length ? (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textAlign: 'center', padding: '1rem 0' }}>
          No older versions recorded yet.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {versions.map((ver) => (
            <div
              key={ver.id}
              style={{
                padding: '0.75rem',
                background: 'var(--bg-hover)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  Version {ver.versionNumber}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                  {new Date(ver.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {new Date(ver.timestamp).toLocaleDateString()}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.625rem' }}>
                <Button
                  variant="secondary"
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                  onClick={() => handleRestore(ver)}
                >
                  Restore
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

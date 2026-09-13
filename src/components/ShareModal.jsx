import React, { useState } from 'react';
import { Modal } from './Modal';
import { Input } from './Input';
import { Button } from './Button';
import { useAppStore } from '../store/appStore';

export const ShareModal = ({ isOpen, onClose, document }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Editor');
  const updateDocument = useAppStore((state) => state.updateDocument);
  const addToast = useAppStore((state) => state.addToast);

  if (!document) return null;

  const handleShare = (e) => {
    e.preventDefault();
    if (!email) return;

    const currentPermissions = document.permissions || [];
    // Check if user already in list
    const existingIndex = currentPermissions.findIndex((p) => p.email.toLowerCase() === email.toLowerCase());
    
    let updatedPermissions;
    if (existingIndex >= 0) {
      updatedPermissions = currentPermissions.map((p, idx) =>
        idx === existingIndex ? { ...p, role } : p
      );
    } else {
      updatedPermissions = [
        ...currentPermissions,
        { email, role, name: email.split('@')[0] }
      ];
    }

    updateDocument(document.id, { permissions: updatedPermissions });
    addToast(`Shared "${document.title}" with ${email} as ${role}`, 'success');
    setEmail('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Share "${document.title}"`}>
      <form onSubmit={handleShare} style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <Input
              label="User Email"
              type="email"
              placeholder="Enter user email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group" style={{ width: '130px', marginBottom: '1rem' }}>
            <label className="input-label">Role</label>
            <select
              className="input-field"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Editor">Editor</option>
              <option value="Commenter">Commenter</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <Button type="submit" variant="primary">
              Share
            </Button>
          </div>
        </div>
      </form>

      <div>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
          People with access
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {/* Owner */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.5rem 0.75rem',
              background: 'var(--bg-hover)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                {document.owner?.name || 'Owner'} (You)
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                {document.owner?.email || 'owner@example.com'}
              </div>
            </div>
            <span className="badge badge-editor">Owner</span>
          </div>

          {/* Shared users */}
          {(document.permissions || []).map((perm, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem 0.75rem',
                background: 'var(--bg-hover)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div>
                <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>
                  {perm.name || perm.email}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  {perm.email}
                </div>
              </div>
              <span className={`badge badge-${perm.role.toLowerCase()}`}>
                {perm.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

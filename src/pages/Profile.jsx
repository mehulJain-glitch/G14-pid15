import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { ToastContainer } from '../components/Toast';
import { useAppStore } from '../store/appStore';

export const Profile = () => {
  const user = useAppStore((state) => state.user);
  const documents = useAppStore((state) => state.documents);
  const updateProfile = useAppStore((state) => state.updateProfile);
  const toasts = useAppStore((state) => state.toasts);
  const addToast = useAppStore((state) => state.addToast);
  const removeToast = useAppStore((state) => state.removeToast);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const totalDocs = documents.length;
  const sharedDocs = documents.filter(
    (d) => d.owner?.email !== user?.email || (d.permissions && d.permissions.length > 1)
  ).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      email: formData.email,
      avatar: formData.name.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2)
    });
    addToast('Profile updated successfully', 'success');
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <div className="page-container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            User Profile
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Manage your personal profile information and settings
          </p>

          <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
              <div
                className="avatar"
                style={{ width: 72, height: 72, fontSize: '1.75rem', fontWeight: 700 }}
              >
                {user?.avatar || 'VK'}
              </div>
              <div>
                <h2 style={{ fontSize: '1.4rem' }}>{user?.name || 'Vasudev Sharma'}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  {user?.email || 'vasudev@example.com'}
                </p>
                <span className="badge badge-editor" style={{ marginTop: '0.5rem', display: 'inline-block' }}>
                  Student Account
                </span>
              </div>
            </div>

            {/* Profile Statistics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                padding: '1rem',
                background: 'var(--bg-hover)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '2rem'
              }}
            >
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{totalDocs}</div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  Total Documents
                </div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{sharedDocs}</div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  Shared Documents
                </div>
              </div>
            </div>

            {/* Edit Profile Form */}
            <form onSubmit={handleSubmit}>
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <Button type="submit" variant="primary">
                Save Profile Changes
              </Button>
            </form>
          </div>
        </div>
      </main>

      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};

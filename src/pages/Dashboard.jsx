import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { DocumentList } from '../components/DocumentList';
import { ShareModal } from '../components/ShareModal';
import { ToastContainer } from '../components/Toast';
import { TemplateFetcher } from '../components/TemplateFetcher';
import { IconFileText, IconUsers, IconStar, IconHardDrive } from '../components/Icons';
import { useAppStore } from '../store/appStore';
import { useScrollAnimation, handle3DTiltMouseMove, handle3DTiltMouseLeave } from '../hooks/useScrollAnimation';

export const Dashboard = () => {
  const [sharingDoc, setSharingDoc] = useState(null);

  const user = useAppStore((state) => state.user);
  const documents = useAppStore((state) => state.documents);
  const searchQuery = useAppStore((state) => state.searchQuery);
  const toasts = useAppStore((state) => state.toasts);
  const removeToast = useAppStore((state) => state.removeToast);

  // Activate scroll-triggered 3D sliding, rolling & cascade entrance animations
  useScrollAnimation();

  // Compute greeting based on local time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // Statistics calculation
  const totalDocs = documents.length;
  const sharedDocs = documents.filter((d) => d.owner?.email !== user?.email || (d.permissions && d.permissions.length > 1)).length;
  const starredDocs = documents.filter((d) => d.starred).length;

  // Filtered documents based on search
  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <div className="page-container">
          <div className="scroll-slide-up" style={{ marginBottom: '2rem' }}>
            <span className="sassy-pill" style={{ marginBottom: '0.65rem' }}>✦ CLASSY DASHBOARD</span>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginTop: '0.4rem' }}>
              {greeting}, <span className="sassy-gradient-text">{user?.name || 'Vasudev'}</span> 👋
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.35rem' }}>
              Real-time overview of your documents, instant PC local storage snapshots, and team collaboration.
            </p>
          </div>

          {/* REST API Inspiration Component */}
          <TemplateFetcher />

          {/* Statistics Grid with 3D Mouse Tilt & Scroll Animations */}
          <div className="stats-grid" style={{ marginBottom: '2.5rem' }}>
            <div
              className="glass-card stat-card scroll-slide-left delay-1 sassy-card-border-glow"
              onMouseMove={handle3DTiltMouseMove}
              onMouseLeave={handle3DTiltMouseLeave}
            >
              <div className="stat-icon" style={{ background: 'rgba(108, 99, 255, 0.2)', color: '#6C63FF' }}>
                <IconFileText size={26} />
              </div>
              <div>
                <div className="stat-val">{totalDocs}</div>
                <div className="stat-label">Total Documents</div>
              </div>
            </div>

            <div
              className="glass-card stat-card scroll-slide-up delay-2 sassy-card-border-glow"
              onMouseMove={handle3DTiltMouseMove}
              onMouseLeave={handle3DTiltMouseLeave}
            >
              <div className="stat-icon" style={{ background: 'rgba(46, 196, 182, 0.2)', color: '#2EC4B6' }}>
                <IconUsers size={26} />
              </div>
              <div>
                <div className="stat-val">{sharedDocs}</div>
                <div className="stat-label">Shared Documents</div>
              </div>
            </div>

            <div
              className="glass-card stat-card scroll-slide-up delay-3 sassy-card-border-glow"
              onMouseMove={handle3DTiltMouseMove}
              onMouseLeave={handle3DTiltMouseLeave}
            >
              <div className="stat-icon" style={{ background: 'rgba(251, 191, 36, 0.2)', color: 'var(--warning)' }}>
                <IconStar size={26} />
              </div>
              <div>
                <div className="stat-val">{starredDocs}</div>
                <div className="stat-label">Starred Documents</div>
              </div>
            </div>

            <div
              className="glass-card stat-card scroll-slide-right delay-4 sassy-card-border-glow"
              onMouseMove={handle3DTiltMouseMove}
              onMouseLeave={handle3DTiltMouseLeave}
            >
              <div className="stat-icon" style={{ background: 'rgba(46, 196, 182, 0.2)', color: '#2EC4B6' }}>
                <IconHardDrive size={26} />
              </div>
              <div>
                <div className="stat-val" style={{ color: '#2EC4B6' }}>Online</div>
                <div className="stat-label">PC Local Storage Synced</div>
              </div>
            </div>
          </div>

          {/* Recent Documents Section */}
          <div className="scroll-slide-up" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Recent Documents</h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600 }}>
              ● {filteredDocuments.length} Documents in PC Storage
            </span>
          </div>

          <DocumentList
            documents={filteredDocuments}
            onShare={(doc) => setSharingDoc(doc)}
            emptyTitle="No documents found"
          />
        </div>
      </main>

      <ShareModal
        isOpen={!!sharingDoc}
        onClose={() => setSharingDoc(null)}
        document={sharingDoc}
      />

      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};

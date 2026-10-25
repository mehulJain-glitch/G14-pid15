import React, { useState, useMemo } from 'react';
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
  const [dashboardFilter, setDashboardFilter] = useState('all');

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

  // Filtered documents based on search and quick tabs
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (dashboardFilter === 'starred') return doc.starred;
      if (dashboardFilter === 'shared') {
        return doc.owner?.email !== user?.email || (doc.permissions && doc.permissions.length > 1);
      }
      if (dashboardFilter === 'owned') {
        return doc.owner?.email === user?.email;
      }
      return true;
    });
  }, [documents, searchQuery, dashboardFilter, user]);

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

          {/* Quick Filter Tabs */}
          <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: '📂 All Documents' },
              { id: 'starred', label: '⭐ Starred' },
              { id: 'shared', label: '👥 Shared with Me' },
              { id: 'owned', label: '👤 Owned by Me' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`tab-btn animated-btn-press ${dashboardFilter === tab.id ? 'active' : ''}`}
                style={{
                  padding: '0.45rem 1.15rem',
                  borderRadius: 'var(--radius-xl)',
                  fontSize: '0.85rem',
                  background: dashboardFilter === tab.id ? 'rgba(108, 99, 255, 0.25)' : 'rgba(25, 34, 52, 0.65)',
                  border: dashboardFilter === tab.id ? '1px solid #6C63FF' : '1px solid var(--border-color)',
                  color: dashboardFilter === tab.id ? '#2EC4B6' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  boxShadow: dashboardFilter === tab.id ? '0 0 15px rgba(108, 99, 255, 0.3)' : 'none',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setDashboardFilter(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Recent Documents Section */}
          <div className="scroll-slide-up" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              {dashboardFilter === 'starred' ? 'Starred Documents' :
               dashboardFilter === 'shared' ? 'Shared Documents' :
               dashboardFilter === 'owned' ? 'Owned Documents' : 'Recent Documents'}
            </h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600 }}>
              ● {filteredDocuments.length} Documents in PC Storage
            </span>
          </div>

          <DocumentList
            documents={filteredDocuments}
            onShare={(doc) => setSharingDoc(doc)}
            emptyTitle={`No ${dashboardFilter !== 'all' ? dashboardFilter : ''} documents found`}
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

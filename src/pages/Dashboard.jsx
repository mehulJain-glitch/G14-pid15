import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { DocumentList } from '../components/DocumentList';
import { ShareModal } from '../components/ShareModal';
import { ToastContainer } from '../components/Toast';
import { TemplateFetcher } from '../components/TemplateFetcher';
import { IconFileText, IconUsers, IconStar, IconHistory } from '../components/Icons';
import { useAppStore } from '../store/appStore';
import { useScrollAnimation, handle3DTiltMouseMove, handle3DTiltMouseLeave } from '../hooks/useScrollAnimation';

export const Dashboard = () => {
  const [sharingDoc, setSharingDoc] = useState(null);

  const user = useAppStore((state) => state.user);
  const documents = useAppStore((state) => state.documents);
  const searchQuery = useAppStore((state) => state.searchQuery);
  const toasts = useAppStore((state) => state.toasts);
  const removeToast = useAppStore((state) => state.removeToast);

  // Activate scroll-triggered 3D sliding & rolling animations
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
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
              {greeting}, {user?.name || 'Vasudev'} 👋
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.25rem' }}>
              Here is an overview of your recent documents and collaboration activity.
            </p>
          </div>

          {/* REST API Inspiration Component */}
          <TemplateFetcher />

          {/* Statistics Grid with 3D Mouse Tilt & Scroll Animations */}
          <div className="stats-grid">
            <div
              className="glass-card stat-card scroll-slide-left delay-1"
              onMouseMove={handle3DTiltMouseMove}
              onMouseLeave={handle3DTiltMouseLeave}
            >
              <div className="stat-icon">
                <IconFileText size={26} />
              </div>
              <div>
                <div className="stat-val">{totalDocs}</div>
                <div className="stat-label">Total Documents</div>
              </div>
            </div>

            <div
              className="glass-card stat-card scroll-slide-up delay-2"
              onMouseMove={handle3DTiltMouseMove}
              onMouseLeave={handle3DTiltMouseLeave}
            >
              <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.2)', color: 'var(--accent)' }}>
                <IconUsers size={26} />
              </div>
              <div>
                <div className="stat-val">{sharedDocs}</div>
                <div className="stat-label">Shared Documents</div>
              </div>
            </div>

            <div
              className="glass-card stat-card scroll-slide-up delay-3"
              onMouseMove={handle3DTiltMouseMove}
              onMouseLeave={handle3DTiltMouseLeave}
            >
              <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--warning)' }}>
                <IconStar size={26} />
              </div>
              <div>
                <div className="stat-val">{starredDocs}</div>
                <div className="stat-label">Starred Documents</div>
              </div>
            </div>

            <div
              className="glass-card stat-card scroll-slide-right delay-4"
              onMouseMove={handle3DTiltMouseMove}
              onMouseLeave={handle3DTiltMouseLeave}
            >
              <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)' }}>
                <IconHistory size={26} />
              </div>
              <div>
                <div className="stat-val">Active</div>
                <div className="stat-label">Recent Sync Status</div>
              </div>
            </div>
          </div>

          {/* Recent Documents Section */}
          <div className="scroll-slide-up" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Recent Documents</h2>
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

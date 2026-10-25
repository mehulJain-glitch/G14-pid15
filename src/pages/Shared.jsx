import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { DocumentList } from '../components/DocumentList';
import { ShareModal } from '../components/ShareModal';
import { ToastContainer } from '../components/Toast';
import { WorkspaceFooter } from '../components/WorkspaceFooter';
import { useAppStore } from '../store/appStore';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Shared = () => {
  const [sharingDoc, setSharingDoc] = useState(null);

  const user = useAppStore((state) => state.user);
  const documents = useAppStore((state) => state.documents);
  const searchQuery = useAppStore((state) => state.searchQuery);
  const toasts = useAppStore((state) => state.toasts);
  const removeToast = useAppStore((state) => state.removeToast);

  // Activate scroll animations
  useScrollAnimation();

  const sharedDocuments = documents.filter((doc) => {
    const isShared = doc.owner?.email !== user?.email || (doc.permissions && doc.permissions.length > 1);
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    return isShared && matchesSearch;
  });

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <div className="page-container">
          <div className="scroll-slide-up" style={{ marginBottom: '1.75rem' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Shared with Me</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              Documents shared with your account for editing or viewing.
            </p>
          </div>

          <DocumentList
            documents={sharedDocuments}
            onShare={(doc) => setSharingDoc(doc)}
            emptyTitle="No shared documents found"
          />
        </div>

        <WorkspaceFooter />
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

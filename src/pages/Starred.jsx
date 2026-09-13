import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { DocumentList } from '../components/DocumentList';
import { ShareModal } from '../components/ShareModal';
import { ToastContainer } from '../components/Toast';
import { useAppStore } from '../store/appStore';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Starred = () => {
  const [sharingDoc, setSharingDoc] = useState(null);

  const documents = useAppStore((state) => state.documents);
  const searchQuery = useAppStore((state) => state.searchQuery);
  const toasts = useAppStore((state) => state.toasts);
  const removeToast = useAppStore((state) => state.removeToast);

  // Activate scroll animations
  useScrollAnimation();

  const starredDocuments = documents.filter((doc) => {
    const isStarred = doc.starred;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    return isStarred && matchesSearch;
  });

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <div className="page-container">
          <div className="scroll-slide-up" style={{ marginBottom: '1.75rem' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Starred Documents</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              Important files you have starred for quick access.
            </p>
          </div>

          <DocumentList
            documents={starredDocuments}
            onShare={(doc) => setSharingDoc(doc)}
            emptyTitle="No starred documents yet"
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

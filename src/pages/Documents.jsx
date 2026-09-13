import React, { useState, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { DocumentList } from '../components/DocumentList';
import { ShareModal } from '../components/ShareModal';
import { ToastContainer } from '../components/Toast';
import { useAppStore } from '../store/appStore';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Documents = () => {
  const [sharingDoc, setSharingDoc] = useState(null);

  const user = useAppStore((state) => state.user);
  const documents = useAppStore((state) => state.documents);
  const searchQuery = useAppStore((state) => state.searchQuery);
  const filter = useAppStore((state) => state.filter);
  const setFilter = useAppStore((state) => state.setFilter);
  const sortBy = useAppStore((state) => state.sortBy);
  const setSortBy = useAppStore((state) => state.setSortBy);
  const toasts = useAppStore((state) => state.toasts);
  const removeToast = useAppStore((state) => state.removeToast);

  // Activate scroll animations
  useScrollAnimation();

  // useMemo for filtering and sorting documents efficiently
  const processedDocuments = useMemo(() => {
    return documents
      .filter((doc) => {
        // Search Filter
        const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchesSearch) return false;

        // Categorical Filter
        if (filter === 'owned') {
          return doc.owner?.email === user?.email;
        }
        if (filter === 'shared') {
          return doc.owner?.email !== user?.email || (doc.permissions && doc.permissions.length > 1);
        }
        if (filter === 'starred') {
          return doc.starred;
        }
        return true; // 'all'
      })
      .sort((a, b) => {
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'createdAt') {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        // default 'updatedAt'
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
  }, [documents, searchQuery, filter, sortBy, user]);

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <div className="page-container">
          <div className="scroll-slide-up" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>My Documents</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                Browse, search, filter, and organize your files with 3D cards.
              </p>
            </div>

            {/* Filter & Sort Controls */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <select
                className="input-field"
                style={{ width: '160px' }}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Documents</option>
                <option value="owned">Owned by me</option>
                <option value="shared">Shared with me</option>
                <option value="starred">Starred</option>
              </select>

              <select
                className="input-field"
                style={{ width: '170px' }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="updatedAt">Sort: Last Modified</option>
                <option value="createdAt">Sort: Created Date</option>
                <option value="title">Sort: Title (A-Z)</option>
              </select>
            </div>
          </div>

          <DocumentList
            documents={processedDocuments}
            onShare={(doc) => setSharingDoc(doc)}
            emptyTitle={`No ${filter !== 'all' ? filter : ''} documents found`}
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

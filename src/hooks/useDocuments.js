import { useEffect } from 'react';
import { useAppStore } from '../store/appStore';
import { documentService } from '../services/documentService';

// Custom Hook: useDocuments with native Browser Storage Event listener for multi-tab sync!
export function useDocuments() {
  const documents = useAppStore((state) => state.documents);
  const setDocuments = useAppStore((state) => state.setDocuments || ((docs) => useAppStore.setState({ documents: docs })));
  const filter = useAppStore((state) => state.filter);
  const setFilter = useAppStore((state) => state.setFilter);
  const searchQuery = useAppStore((state) => state.searchQuery);
  const setSearchQuery = useAppStore((state) => state.setSearchQuery);
  const sortBy = useAppStore((state) => state.sortBy);
  const setSortBy = useAppStore((state) => state.setSortBy);

  // Sync state from localStorage on mount and listen to storage events across tabs
  useEffect(() => {
    // Initial sync from localStorage
    const savedDocs = documentService.getDocuments();
    if (savedDocs && savedDocs.length) {
      useAppStore.setState({ documents: savedDocs });
    }

    // Window storage event handler (Multi-Tab Collaboration Sync)
    const handleStorageChange = (e) => {
      if (e.key === 'team_titans_documents_v1' && e.newValue) {
        try {
          const freshDocs = JSON.parse(e.newValue);
          useAppStore.setState({ documents: freshDocs });
        } catch (err) {
          console.error('Storage sync error:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return {
    documents,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    createDocument: (title) => {
      const newDoc = documentService.createDocument(title, useAppStore.getState().user);
      const updated = documentService.getDocuments();
      useAppStore.setState({ documents: updated });
      return newDoc;
    },
    updateDocument: (id, fields) => {
      documentService.updateDocument(id, fields);
      const updated = documentService.getDocuments();
      useAppStore.setState({ documents: updated });
    },
    deleteDocument: (id) => {
      documentService.deleteDocument(id);
      const updated = documentService.getDocuments();
      useAppStore.setState({ documents: updated });
    },
    toggleStar: (id) => {
      documentService.toggleStar(id);
      const updated = documentService.getDocuments();
      useAppStore.setState({ documents: updated });
    }
  };
}

import { create } from 'zustand';
import { documentService } from '../services/documentService';
import { storageService } from '../services/storage';

export const useAppStore = create((set, get) => ({
  // User Authentication State
  user: storageService.getUser(),
  isAuthenticated: true,
  loginUser: (userData) => {
    storageService.saveUser(userData);
    set({ user: userData, isAuthenticated: true });
  },
  logoutUser: () => {
    storageService.clearUser();
    set({ user: null, isAuthenticated: false });
  },
  updateProfile: (updatedData) => {
    const newUser = { ...get().user, ...updatedData };
    storageService.saveUser(newUser);
    set({ user: newUser });
  },

  // Documents State
  documents: documentService.getDocuments(),
  filter: 'all', // 'all' | 'owned' | 'shared' | 'starred'
  searchQuery: '',
  sortBy: 'updatedAt', // 'updatedAt' | 'createdAt' | 'title'

  setFilter: (filter) => set({ filter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),

  // CRUD Actions connected to Storage Service
  createDocument: (customTitle) => {
    const newDoc = documentService.createDocument(customTitle, get().user);
    set({ documents: documentService.getDocuments() });
    get().addToast(`Document "${newDoc.title}" created`, 'success');
    return newDoc;
  },

  updateDocument: (id, updatedFields) => {
    documentService.updateDocument(id, updatedFields);
    set({ documents: documentService.getDocuments() });
  },

  deleteDocument: (id) => {
    const docToDelete = get().documents.find((d) => d.id === id);
    documentService.deleteDocument(id);
    set({ documents: documentService.getDocuments() });
    if (docToDelete) {
      get().addToast(`Document "${docToDelete.title}" deleted`, 'info');
    }
  },

  toggleStar: (id) => {
    documentService.toggleStar(id);
    set({ documents: documentService.getDocuments() });
  },

  // Toast Notifications
  toasts: [],
  addToast: (message, type = 'info') => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }]
    }));
    setTimeout(() => {
      get().removeToast(id);
    }, 4000);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    }));
  }
}));

// Storage Service - Clean helper functions for browser localStorage
const STORAGE_KEYS = {
  DOCUMENTS: 'team_titans_documents_v1',
  USER: 'team_titans_user_v1',
  SETTINGS: 'team_titans_settings_v1'
};

const DEFAULT_DOCUMENTS = [
  {
    id: 'doc-1',
    title: 'Team Titans Product Architecture',
    content: '<h2>Project Overview</h2><p>This report outlines the architecture and design of <strong>Team Titans</strong>, a real-time collaborative document editor built with high-performance React & modern Web APIs.</p><p>Key highlights include custom hooks, Zustand state management, contentEditable DOM interaction, and browser storage synchronization.</p>',
    owner: { id: 'u1', name: 'Vasudev Sharma', email: 'vasudev@example.com' },
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    starred: true,
    permissions: [
      { email: 'vasudev@example.com', role: 'Editor', name: 'Vasudev Sharma' },
      { email: 'rahul@example.com', role: 'Editor', name: 'Rahul Verma' },
      { email: 'aman@example.com', role: 'Viewer', name: 'Aman Gupta' }
    ],
    comments: [
      {
        id: 'c1',
        user: 'Rahul Verma',
        avatar: 'RV',
        time: '2 hours ago',
        text: 'Please double-check the architecture diagram section before launch.',
        resolved: false,
        replies: []
      }
    ],
    versions: [
      { id: 'v1', versionNumber: 1, title: 'Draft v1', timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), content: '<p>Initial project draft content.</p>' },
      { id: 'v2', versionNumber: 2, title: 'Team Titans Product Architecture', timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), content: '<h2>Project Overview</h2><p>Updated proposal content</p>' }
    ]
  },
  {
    id: 'doc-2',
    title: 'Software Architecture & System Notes',
    content: '<h1>Architecture Notes</h1><p>Topics include React Hooks, Component Lifecycle, and Context API / Zustand state architecture.</p>',
    owner: { id: 'u1', name: 'Vasudev Sharma', email: 'vasudev@example.com' },
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    starred: false,
    permissions: [
      { email: 'vasudev@example.com', role: 'Editor', name: 'Vasudev Sharma' }
    ],
    comments: [],
    versions: []
  },
  {
    id: 'doc-3',
    title: 'Team Sprint Planning - Shared',
    content: '<h2>Sprint Objectives</h2><p>1. Complete Phase 1 UI Skeleton<br/>2. Add LocalStorage CRUD logic<br/>3. Implement multi-tab live sync</p>',
    owner: { id: 'u2', name: 'Rahul Verma', email: 'rahul@example.com' },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    starred: true,
    permissions: [
      { email: 'rahul@example.com', role: 'Editor', name: 'Rahul Verma' },
      { email: 'vasudev@example.com', role: 'Editor', name: 'Vasudev Sharma' }
    ],
    comments: [],
    versions: []
  }
];

export const storageService = {
  // Get all documents from localStorage
  getDocuments: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(DEFAULT_DOCUMENTS));
        return DEFAULT_DOCUMENTS;
      }
      return JSON.parse(data);
    } catch (err) {
      console.error('Failed to read documents from localStorage:', err);
      return DEFAULT_DOCUMENTS;
    }
  },

  // Save all documents array to localStorage
  saveDocuments: (documents) => {
    try {
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
    } catch (err) {
      console.error('Failed to save documents to localStorage:', err);
    }
  },

  // User auth persistence
  getUser: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : {
        id: 'u1',
        name: 'Vasudev Sharma',
        email: 'vasudev@example.com',
        avatar: 'VK',
        role: 'Owner'
      };
    } catch (err) {
      return null;
    }
  },

  saveUser: (user) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (err) {
      console.error('Failed to save user to localStorage:', err);
    }
  },

  clearUser: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};

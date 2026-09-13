import { documentService } from '../services/documentService';

// Mock localStorage for Jest execution environment
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Document Service Business Logic', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('createDocument creates document with default values', () => {
    const doc = documentService.createDocument('Test Document', { name: 'Vasudev', email: 'vasudev@example.com' });
    expect(doc.title).toBe('Test Document');
    expect(doc.owner.email).toBe('vasudev@example.com');
    expect(doc.starred).toBe(false);
    expect(doc.permissions.length).toBe(1);
  });

  test('updateDocument modifies document content and title', () => {
    const doc = documentService.createDocument('Original Title');
    const updated = documentService.updateDocument(doc.id, { title: 'Updated Title', content: '<p>New content</p>' });
    expect(updated.title).toBe('Updated Title');
    expect(updated.content).toBe('<p>New content</p>');
  });

  test('deleteDocument removes document from storage', () => {
    const doc = documentService.createDocument('To Delete');
    documentService.deleteDocument(doc.id);
    const found = documentService.getDocument(doc.id);
    expect(found).toBeNull();
  });

  test('createSnapshot creates a version history entry', () => {
    const doc = documentService.createDocument('Version Test');
    documentService.createSnapshot(doc.id, 'Snapshot 1');
    const updated = documentService.getDocument(doc.id);
    expect(updated.versions.length).toBeGreaterThan(0);
    expect(updated.versions[0].title).toBe('Snapshot 1');
  });
});

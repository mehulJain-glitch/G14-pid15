import { storageService } from './storage';

export const documentService = {
  getDocuments: () => {
    return storageService.getDocuments();
  },

  getDocument: (id) => {
    const docs = storageService.getDocuments();
    return docs.find((d) => d.id === id) || null;
  },

  createDocument: (customTitle, owner) => {
    const docs = storageService.getDocuments();
    const newDoc = {
      id: `doc-${Date.now()}`,
      title: customTitle || 'Untitled Document',
      content: '<h1>Untitled Document</h1><p>Start typing your content here...</p>',
      owner: owner || { id: 'u1', name: 'Vasudev Sharma', email: 'vasudev@example.com' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      starred: false,
      permissions: [
        { email: owner?.email || 'vasudev@example.com', role: 'Editor', name: owner?.name || 'Vasudev Sharma' }
      ],
      comments: [],
      versions: [
        {
          id: `v-${Date.now()}`,
          versionNumber: 1,
          title: 'Initial Document Creation',
          timestamp: new Date().toISOString(),
          content: '<h1>Untitled Document</h1><p>Start typing your content here...</p>'
        }
      ]
    };

    const updatedDocs = [newDoc, ...docs];
    storageService.saveDocuments(updatedDocs);
    return newDoc;
  },

  updateDocument: (id, updatedFields) => {
    const docs = storageService.getDocuments();
    const updatedDocs = docs.map((doc) => {
      if (doc.id === id) {
        return {
          ...doc,
          ...updatedFields,
          updatedAt: new Date().toISOString()
        };
      }
      return doc;
    });
    storageService.saveDocuments(updatedDocs);
    return updatedDocs.find((d) => d.id === id);
  },

  deleteDocument: (id) => {
    const docs = storageService.getDocuments();
    const updatedDocs = docs.filter((doc) => doc.id !== id);
    storageService.saveDocuments(updatedDocs);
    return updatedDocs;
  },

  toggleStar: (id) => {
    const docs = storageService.getDocuments();
    const updatedDocs = docs.map((doc) =>
      doc.id === id ? { ...doc, starred: !doc.starred } : doc
    );
    storageService.saveDocuments(updatedDocs);
    return updatedDocs;
  },

  addComment: (docId, commentObj) => {
    const doc = documentService.getDocument(docId);
    if (!doc) return null;
    const comments = [commentObj, ...(doc.comments || [])];
    return documentService.updateDocument(docId, { comments });
  },

  createSnapshot: (docId, snapshotTitle = 'Manual Snapshot') => {
    const doc = documentService.getDocument(docId);
    if (!doc) return null;
    const currentVersions = doc.versions || [];
    const newVersion = {
      id: `v-${Date.now()}`,
      versionNumber: currentVersions.length + 1,
      title: snapshotTitle,
      timestamp: new Date().toISOString(),
      content: doc.content
    };
    return documentService.updateDocument(docId, {
      versions: [newVersion, ...currentVersions]
    });
  }
};

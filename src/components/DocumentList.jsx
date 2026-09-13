import React from 'react';
import { DocumentCard } from './DocumentCard';
import { IconFileText, IconPlus } from './Icons';
import { Button } from './Button';
import { useAppStore } from '../store/appStore';
import { useNavigate } from 'react-router-dom';

export const DocumentList = ({ documents = [], onShare, emptyTitle = "No documents found" }) => {
  const navigate = useNavigate();
  const createDocument = useAppStore((state) => state.createDocument);

  const handleCreateNew = () => {
    const newDoc = createDocument();
    navigate(`/documents/${newDoc.id}`);
  };

  if (!documents.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <IconFileText size={48} />
        </div>
        <div>
          <h3>{emptyTitle}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Get started by creating your first document in Team Titans.
          </p>
        </div>
        <Button variant="primary" icon={<IconPlus size={18} />} onClick={handleCreateNew}>
          Create New Document
        </Button>
      </div>
    );
  }

  return (
    <div className="documents-grid">
      {documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} onShare={onShare} />
      ))}
    </div>
  );
};

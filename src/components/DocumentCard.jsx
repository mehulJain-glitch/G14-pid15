import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconFileText, IconStar, IconTrash, IconShare, IconDownload } from './Icons';
import { Button } from './Button';
import { useAppStore } from '../store/appStore';
import { storageService } from '../services/storage';
import { handle3DTiltMouseMove, handle3DTiltMouseLeave } from '../hooks/useScrollAnimation';

export const DocumentCard = ({ document, onShare, index = 0 }) => {
  const navigate = useNavigate();
  const toggleStar = useAppStore((state) => state.toggleStar);
  const deleteDocument = useAppStore((state) => state.deleteDocument);
  const addToast = useAppStore((state) => state.addToast);

  // Clean snippet from HTML
  const cleanSnippet = document.content
    ? document.content.replace(/<[^>]*>?/gm, '')
    : 'No content yet...';

  const formattedDate = new Date(document.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const delayClass = `delay-${(index % 5) + 1}`;

  const handleDownloadToPC = async (e) => {
    e.stopPropagation();
    try {
      const res = await storageService.exportDocumentAsFile(document, 'html');
      if (res && res.success) {
        addToast(`Saved "${document.title}" to PC as .html`, 'success');
      }
    } catch (err) {
      console.error(err);
      addToast('Failed to save to PC', 'danger');
    }
  };

  return (
    <div
      className={`glass-card doc-card scroll-slide-up ${delayClass} animated-card-tilt`}
      onClick={() => navigate(`/documents/${document.id}`)}
      onMouseMove={handle3DTiltMouseMove}
      onMouseLeave={handle3DTiltMouseLeave}
    >
      <div className="doc-card-header">
        <div className="doc-icon animated-icon-bounce">
          <IconFileText size={22} />
        </div>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <Button
            variant="icon"
            onClick={handleDownloadToPC}
            title="Save file to PC (.html)"
            className="card-action-btn"
          >
            <IconDownload size={18} />
          </Button>
          <Button
            variant="icon"
            onClick={(e) => {
              e.stopPropagation();
              toggleStar(document.id);
            }}
            title={document.starred ? 'Unstar' : 'Star'}
            className="card-action-btn"
          >
            <IconStar size={18} filled={document.starred} />
          </Button>
          <Button
            variant="icon"
            onClick={(e) => {
              e.stopPropagation();
              if (onShare) onShare(document);
            }}
            title="Share"
            className="card-action-btn"
          >
            <IconShare size={18} />
          </Button>
          <Button
            variant="icon"
            onClick={(e) => {
              e.stopPropagation();
              deleteDocument(document.id);
            }}
            title="Delete"
            className="card-action-btn"
          >
            <IconTrash size={18} />
          </Button>
        </div>
      </div>

      <div>
        <h3 className="doc-title">{document.title}</h3>
        <p className="doc-preview-text">{cleanSnippet}</p>
      </div>

      <div className="doc-card-footer">
        <span>Owner: {document.owner?.name || 'You'}</span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

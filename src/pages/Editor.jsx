import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconShare, IconStar } from '../components/Icons';
import { Button } from '../components/Button';
import { EditorToolbar } from '../components/EditorToolbar';
import { DocumentEditor } from '../components/DocumentEditor';
import { Collaborators } from '../components/Collaborators';
import { ShareModal } from '../components/ShareModal';
import { CommentsPanel } from '../components/CommentsPanel';
import { VersionHistory } from '../components/VersionHistory';
import { ToastContainer } from '../components/Toast';
import { useAppStore } from '../store/appStore';
import { documentService } from '../services/documentService';

export const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useAppStore((state) => state.user);
  const documents = useAppStore((state) => state.documents);
  const updateDocument = useAppStore((state) => state.updateDocument);
  const toggleStar = useAppStore((state) => state.toggleStar);
  const toasts = useAppStore((state) => state.toasts);
  const addToast = useAppStore((state) => state.addToast);
  const removeToast = useAppStore((state) => state.removeToast);

  const [document, setDocument] = useState(null);
  const [title, setTitle] = useState('');
  const [saveStatus, setSaveStatus] = useState('Saved');
  const [activeTab, setActiveTab] = useState('comments');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const editorRef = useRef(null);
  const saveTimeoutRef = useRef(null);

  // Sync document from store whenever id or store changes (supports Multi-Tab live sync!)
  useEffect(() => {
    const doc = documents.find((d) => d.id === id);
    if (doc) {
      setDocument(doc);
      setTitle(doc.title);
      calculateCounts(doc.content);
    }
  }, [id, documents]);

  // Determine active user role & permission
  const getUserRole = () => {
    if (!document || !user) return 'Editor';
    if (document.owner?.email === user.email) return 'Editor';
    const found = (document.permissions || []).find((p) => p.email.toLowerCase() === user.email.toLowerCase());
    return found ? found.role : 'Viewer';
  };

  const userRole = getUserRole();
  const canEdit = userRole === 'Editor';
  const canComment = userRole === 'Editor' || userRole === 'Commenter';

  // Calculate word and character count
  const calculateCounts = (htmlContent) => {
    if (!htmlContent) {
      setWordCount(0);
      setCharCount(0);
      return;
    }
    const plainText = htmlContent.replace(/<[^>]*>?/gm, '').trim();
    setCharCount(plainText.length);
    const words = plainText ? plainText.split(/\s+/).filter(Boolean) : [];
    setWordCount(words.length);
  };

  // Auto-save debounced content update
  const handleContentChange = useCallback((newContent) => {
    if (!canEdit) return;
    setSaveStatus('Saving...');
    calculateCounts(newContent);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      if (document) {
        updateDocument(document.id, { content: newContent });
        setSaveStatus('Saved');
      }
    }, 1000);
  }, [document, updateDocument, canEdit]);

  const handleTitleChange = (e) => {
    if (!canEdit) return;
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSaveStatus('Saving...');
    updateDocument(id, { title: newTitle });
    setTimeout(() => setSaveStatus('Saved'), 600);
  };

  // Keyboard shortcut Ctrl+S / Cmd+S for manual save snapshot
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (canEdit && document) {
          documentService.createSnapshot(document.id, `Manual Save (${new Date().toLocaleTimeString()})`);
          useAppStore.setState({ documents: documentService.getDocuments() });
          setSaveStatus('Saved');
          addToast('Document snapshot saved (Ctrl+S)', 'success');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canEdit, document, addToast]);

  if (!document) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-app)' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Document Not Found</h2>
          <p style={{ color: 'var(--text-muted)', margin: '1rem 0' }}>The document you are looking for does not exist.</p>
          <Button variant="primary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-container">
      {/* TOP HEADER */}
      <header className="editor-header">
        <div className="editor-header-left">
          <Button variant="icon" onClick={() => navigate('/dashboard')} title="Back to Dashboard">
            <IconArrowLeft size={20} />
          </Button>

          <input
            type="text"
            className="editor-title-input"
            value={title}
            onChange={handleTitleChange}
            disabled={!canEdit}
          />

          <Button
            variant="icon"
            onClick={() => toggleStar(document.id)}
            title={document.starred ? 'Unstar' : 'Star'}
          >
            <IconStar size={18} filled={document.starred} />
          </Button>

          <div className="save-status-indicator">
            <span className={`status-dot ${saveStatus === 'Saving...' ? 'saving' : ''}`} />
            <span>{saveStatus}</span>
          </div>

          {!canEdit && (
            <span className={`badge badge-${userRole.toLowerCase()}`} style={{ marginLeft: '0.5rem' }}>
              {userRole === 'Viewer' ? '👁️ Viewing Only' : '💬 Commenting Only'}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Collaborators permissions={document.permissions} />

          <Button
            variant="primary"
            icon={<IconShare size={16} />}
            onClick={() => setIsShareOpen(true)}
          >
            Share
          </Button>
        </div>
      </header>

      {/* FORMATTING TOOLBAR */}
      <EditorToolbar
        disabled={!canEdit}
        onCommand={(command, value) => editorRef.current?.applyCommand(command, value)}
        onSaveSelection={() => editorRef.current?.saveSelection()}
      />

      {/* EDITOR BODY */}
      <div className="editor-body">
        <DocumentEditor
          ref={editorRef}
          docId={document.id}
          content={document.content}
          onChange={handleContentChange}
          readOnly={!canEdit}
        />

        {/* RIGHT SIDEBAR (Comments & Version History) */}
        <aside className="editor-sidebar">
          <div className="sidebar-tabs">
            <button
              className={`tab-btn ${activeTab === 'comments' ? 'active' : ''}`}
              onClick={() => setActiveTab('comments')}
            >
              Comments
            </button>
            <button
              className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              Version History
            </button>
          </div>

          <div className="sidebar-tab-content">
            {activeTab === 'comments' ? (
              <CommentsPanel document={document} readOnly={!canComment} />
            ) : (
              <VersionHistory document={document} />
            )}
          </div>
        </aside>
      </div>

      {/* BOTTOM STATUS BAR */}
      <footer className="editor-statusbar">
        <div>
          <span>Words: {wordCount}</span>
          <span style={{ margin: '0 0.5rem' }}>|</span>
          <span>Characters: {charCount}</span>
          <span style={{ margin: '0 0.5rem' }}>|</span>
          <span>Mode: {userRole}</span>
        </div>
        <div>
          <span style={{ color: 'var(--success)' }}>● Live Synced (Browser Storage)</span>
          <span style={{ marginLeft: '1rem' }}>Status: {saveStatus}</span>
        </div>
      </footer>

      {/* SHARE MODAL */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        document={document}
      />

      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  IconArrowLeft,
  IconShare,
  IconStar,
  IconSave,
  IconDownload,
  IconCheck,
  IconHardDrive
} from '../components/Icons';
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
import { storageService } from '../services/storage';

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
  const [saveStatus, setSaveStatus] = useState('Saved in PC Local Storage');
  const [activeTab, setActiveTab] = useState('comments');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [showSaveSuccessAnim, setShowSaveSuccessAnim] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const editorRef = useRef(null);
  const saveTimeoutRef = useRef(null);
  const exportDropdownRef = useRef(null);

  // Close export dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(e.target)) {
        setIsExportMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate word and character count
  const calculateCounts = useCallback((htmlContent) => {
    if (!htmlContent) {
      setWordCount(0);
      setCharCount(0);
      return;
    }
    const plainText = htmlContent.replace(/<[^>]*>?/gm, '').trim();
    setCharCount(plainText.length);
    const words = plainText ? plainText.split(/\s+/).filter(Boolean) : [];
    setWordCount(words.length);
  }, []);

  // Sync document from store whenever id or store changes (supports Multi-Tab live sync!)
  useEffect(() => {
    const doc = documents.find((d) => d.id === id);
    if (doc) {
      setDocument(doc);
      setTitle(doc.title);
      calculateCounts(doc.content);
    }
  }, [id, documents, calculateCounts]);

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

  // Instant save to PC LocalStorage + Snapshot in Version History
  const saveDocumentNow = useCallback((trigger = 'manual') => {
    if (!canEdit || !id) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    const currentContent = editorRef.current?.getContent() ?? (document?.content || '');
    calculateCounts(currentContent);

    // Save directly to localStorage
    updateDocument(id, { content: currentContent, title });

    // Record snapshot
    const timestamp = new Date().toLocaleTimeString();
    const snapshotName = trigger === 'shortcut'
      ? `Ctrl+S Snapshot (${timestamp})`
      : `PC Storage Snapshot (${timestamp})`;

    documentService.createSnapshot(id, snapshotName);
    useAppStore.setState({ documents: documentService.getDocuments() });

    setSaveStatus('Saved in PC Local Storage');
    setShowSaveSuccessAnim(true);
    setTimeout(() => setShowSaveSuccessAnim(false), 2400);

    if (trigger === 'shortcut') {
      addToast('Saved in PC Local Storage (Ctrl+S)', 'success');
    }
  }, [canEdit, id, title, document, updateDocument, calculateCounts, addToast]);

  // Auto-save debounced content update to PC Local Storage
  const handleContentChange = useCallback((newContent) => {
    if (!canEdit) return;
    setSaveStatus('Saving to PC Storage...');
    calculateCounts(newContent);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      if (id) {
        updateDocument(id, { content: newContent });
        setSaveStatus('Saved in PC Local Storage');
      }
    }, 800);
  }, [id, updateDocument, canEdit, calculateCounts]);

  const handleTitleChange = (e) => {
    if (!canEdit) return;
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSaveStatus('Saving to PC Storage...');
    updateDocument(id, { title: newTitle });
    setTimeout(() => setSaveStatus('Saved in PC Local Storage'), 500);
  };

  // Keyboard shortcut Ctrl+S / Cmd+S for saving in PC Local Storage
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveDocumentNow('shortcut');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveDocumentNow]);

  // Export / Save file to user's PC physical disk
  const handleSaveToPCFile = async (format) => {
    setIsExportMenuOpen(false);
    const currentContent = editorRef.current?.getContent() ?? (document?.content || '');
    const activeDoc = {
      ...(document || {}),
      title: title || document?.title || 'Untitled Document',
      content: currentContent,
      updatedAt: new Date().toISOString()
    };

    // First ensure latest version is saved in PC LocalStorage
    saveDocumentNow('manual');

    try {
      const res = await storageService.exportDocumentAsFile(activeDoc, format);
      if (res && res.success) {
        addToast(`Saved to PC: ${res.filename}`, 'success');
      }
    } catch (err) {
      console.error('Save to PC error:', err);
      addToast('Failed to save file to PC', 'danger');
    }
  };

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
      {/* FLOATING POPUP ANIMATION ON SAVE */}
      {showSaveSuccessAnim && (
        <div className="save-floating-banner animated-slide-down">
          <IconCheck size={18} style={{ color: 'var(--success)' }} />
          <span>Saved in PC Local Storage</span>
          <span className="save-badge-pill">Ctrl+S</span>
        </div>
      )}

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
            placeholder="Document Title"
          />

          <Button
            variant="icon"
            onClick={() => toggleStar(document.id)}
            title={document.starred ? 'Unstar' : 'Star'}
          >
            <IconStar size={18} filled={document.starred} />
          </Button>

          {/* Interactive Save Status Badge */}
          <div
            className={`save-status-indicator interactive-save-pill ${saveStatus.includes('Saving') ? 'is-saving' : 'is-saved'}`}
            onClick={() => saveDocumentNow('manual')}
            title="Click to save immediately to PC Local Storage (Ctrl+S)"
          >
            <span className={`status-dot ${saveStatus.includes('Saving') ? 'saving' : ''}`} />
            <span>{saveStatus}</span>
          </div>

          {!canEdit && (
            <span className={`badge badge-${userRole.toLowerCase()}`} style={{ marginLeft: '0.5rem' }}>
              {userRole === 'Viewer' ? '👁️ Viewing Only' : '💬 Commenting Only'}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Collaborators permissions={document.permissions} />

          {/* SAVE TO PC BUTTON & DROPDOWN */}
          <div className="export-menu-container" ref={exportDropdownRef} style={{ position: 'relative' }}>
            <Button
              variant="secondary"
              icon={<IconSave size={16} />}
              onClick={() => setIsExportMenuOpen((prev) => !prev)}
              className="save-pc-btn animated-hover-pulse"
              title="Save to PC Local Storage or Download file"
            >
              <span>Save to PC</span>
              <span style={{ fontSize: '0.7rem', opacity: 0.7, marginLeft: '0.2rem' }}>▼</span>
            </Button>

            {isExportMenuOpen && (
              <div className="export-dropdown-menu animated-pop-in">
                <div className="dropdown-header">
                  <IconHardDrive size={16} style={{ color: 'var(--accent)' }} />
                  <span>PC Storage & Export</span>
                </div>

                <button
                  type="button"
                  className="dropdown-item highlighted-item"
                  onClick={() => {
                    saveDocumentNow('manual');
                    setIsExportMenuOpen(false);
                  }}
                >
                  <IconSave size={16} style={{ color: 'var(--success)' }} />
                  <div>
                    <strong>Save to PC Local Storage</strong>
                    <div className="dropdown-subtext">Instant browser disk persistence (Ctrl+S)</div>
                  </div>
                </button>

                <div className="dropdown-divider" />

                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => handleSaveToPCFile('html')}
                >
                  <IconDownload size={16} />
                  <div>
                    <strong>Download as HTML (.html)</strong>
                    <div className="dropdown-subtext">Formatted document for any browser or Word</div>
                  </div>
                </button>

                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => handleSaveToPCFile('txt')}
                >
                  <IconDownload size={16} />
                  <div>
                    <strong>Download as Plain Text (.txt)</strong>
                    <div className="dropdown-subtext">Clean text without tags</div>
                  </div>
                </button>

                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => handleSaveToPCFile('md')}
                >
                  <IconDownload size={16} />
                  <div>
                    <strong>Download as Markdown (.md)</strong>
                    <div className="dropdown-subtext">Formatted markdown file</div>
                  </div>
                </button>

                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => handleSaveToPCFile('json')}
                >
                  <IconDownload size={16} />
                  <div>
                    <strong>Backup as JSON (.json)</strong>
                    <div className="dropdown-subtext">Includes versions, comments, and permissions</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          <Button
            variant="primary"
            icon={<IconShare size={16} />}
            onClick={() => setIsShareOpen(true)}
            className="share-btn animated-hover-glow"
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
        <aside className="editor-sidebar animated-sidebar">
          <div className="sidebar-tabs">
            <button
              className={`tab-btn animated-tab ${activeTab === 'comments' ? 'active' : ''}`}
              onClick={() => setActiveTab('comments')}
            >
              Comments
            </button>
            <button
              className={`tab-btn animated-tab ${activeTab === 'history' ? 'active' : ''}`}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span>Words: {wordCount}</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>Characters: {charCount}</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>Mode: {userRole}</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span className="shortcut-hint" onClick={() => saveDocumentNow('manual')} title="Press Ctrl+S to save">
            Shortcut: <kbd>Ctrl</kbd> + <kbd>S</kbd>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'var(--success)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <span className="live-pulse-dot" />
            PC Local Storage Active
          </span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span style={{ color: 'var(--text-dim)' }}>{saveStatus}</span>
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

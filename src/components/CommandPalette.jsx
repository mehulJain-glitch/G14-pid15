import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconSearch,
  IconPlus,
  IconFileText,
  IconSettings,
  IconHome,
  IconUpload,
  IconX
} from './Icons';
import { useAppStore } from '../store/appStore';
import { storageService } from '../services/storage';

export const CommandPalette = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const documents = useAppStore((state) => state.documents);
  const createDocument = useAppStore((state) => state.createDocument);
  const addToast = useAppStore((state) => state.addToast);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Built-in actions
  const defaultActions = [
    {
      id: 'new-doc',
      title: 'Create New Document',
      category: 'Actions',
      icon: <IconPlus size={18} style={{ color: '#2EC4B6' }} />,
      shortcut: 'Alt + N',
      action: () => {
        const doc = createDocument();
        navigate(`/documents/${doc.id}`);
        onClose();
      }
    },
    {
      id: 'import-pc',
      title: 'Import Document from PC File (.html, .txt, .md, .json)',
      category: 'PC Storage',
      icon: <IconUpload size={18} style={{ color: '#6C63FF' }} />,
      shortcut: 'Alt + I',
      action: () => {
        const input = window.document.createElement('input');
        input.type = 'file';
        input.accept = '.html,.htm,.txt,.md,.json';
        input.onchange = async (e) => {
          const file = e.target.files?.[0];
          if (file) {
            try {
              const parsed = await storageService.parseUploadedFile(file);
              const newDoc = createDocument(parsed.title);
              useAppStore.getState().updateDocument(newDoc.id, { content: parsed.content });
              addToast(`Imported "${parsed.title}" from PC`, 'success');
              navigate(`/documents/${newDoc.id}`);
            } catch {
              addToast('Failed to import file', 'danger');
            }
          }
        };
        input.click();
        onClose();
      }
    },
    {
      id: 'go-dashboard',
      title: 'Go to Dashboard',
      category: 'Navigation',
      icon: <IconHome size={18} style={{ color: '#2EC4B6' }} />,
      action: () => {
        navigate('/dashboard');
        onClose();
      }
    },
    {
      id: 'go-docs',
      title: 'View All Documents',
      category: 'Navigation',
      icon: <IconFileText size={18} style={{ color: '#6C63FF' }} />,
      action: () => {
        navigate('/documents');
        onClose();
      }
    },
    {
      id: 'go-settings',
      title: 'Open Preferences & Settings',
      category: 'Navigation',
      icon: <IconSettings size={18} style={{ color: '#cbd5e1' }} />,
      action: () => {
        navigate('/settings');
        onClose();
      }
    }
  ];

  // Document matching actions
  const docActions = documents.map((doc) => ({
    id: `doc-${doc.id}`,
    title: doc.title || 'Untitled Document',
    category: 'Recent Documents',
    icon: <IconFileText size={18} style={{ color: doc.starred ? '#fbbf24' : '#2EC4B6' }} />,
    shortcut: doc.starred ? '★ Starred' : '',
    action: () => {
      navigate(`/documents/${doc.id}`);
      onClose();
    }
  }));

  const allItems = [...defaultActions, ...docActions];

  const filteredItems = allItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation inside palette
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="command-palette-overlay animated-fade-in" onClick={onClose}>
      <div
        className="command-palette-modal glass-card animated-pop-in sassy-card-border-glow"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="command-search-header">
          <IconSearch size={20} style={{ color: 'var(--accent)' }} />
          <input
            ref={inputRef}
            type="text"
            className="command-search-input"
            placeholder="Type a command, action, or document title..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button type="button" className="command-close-btn" onClick={onClose}>
            <IconX size={18} />
          </button>
        </div>

        {/* Results List */}
        <div className="command-list-container">
          {!filteredItems.length ? (
            <div className="command-empty-state">
              <p>No matching commands or documents found.</p>
              <span>Try typing "create", "import", or a document title.</span>
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className={`command-item ${idx === selectedIndex ? 'selected' : ''}`}
                onMouseEnter={() => setSelectedIndex(idx)}
                onClick={item.action}
              >
                <div className="command-item-icon">{item.icon}</div>
                <div className="command-item-info">
                  <span className="command-item-title">{item.title}</span>
                  <span className="command-item-cat">{item.category}</span>
                </div>
                {item.shortcut && (
                  <span className="command-item-badge">{item.shortcut}</span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="command-footer">
          <div>
            <kbd>↑</kbd> <kbd>↓</kbd> Navigate &nbsp;•&nbsp; <kbd>↵</kbd> Select &nbsp;•&nbsp; <kbd>ESC</kbd> Close
          </div>
          <div style={{ color: 'var(--accent)' }}>✦ Google Docs Lite Command Palette</div>
        </div>
      </div>
    </div>
  );
};

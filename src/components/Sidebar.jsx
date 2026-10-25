import React, { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  IconHome,
  IconFileText,
  IconUsers,
  IconStar,
  IconTrash,
  IconPlus,
  IconUser,
  IconSettings,
  IconUpload,
  IconHardDrive
} from './Icons';
import { Button } from './Button';
import { useAppStore } from '../store/appStore';
import { storageService } from '../services/storage';

export const Sidebar = () => {
  const navigate = useNavigate();
  const createDocument = useAppStore((state) => state.createDocument);
  const addToast = useAppStore((state) => state.addToast);
  const fileInputRef = useRef(null);

  const handleCreateNew = () => {
    const newDoc = createDocument();
    navigate(`/documents/${newDoc.id}`);
  };

  const handleImportPCFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const parsed = await storageService.parseUploadedFile(file);
      const newDoc = createDocument(parsed.title);
      useAppStore.getState().updateDocument(newDoc.id, {
        content: parsed.content
      });
      addToast(`Imported "${parsed.title}" from PC to Local Storage`, 'success');
      navigate(`/documents/${newDoc.id}`);
    } catch (err) {
      console.error(err);
      addToast('Failed to parse uploaded PC file', 'danger');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const storageStats = storageService.getStorageStats();

  return (
    <aside className="sidebar">
      {/* BRAND & LOGO CLICKABLE LANDING PAGE LINK */}
      <div
        className="sidebar-brand animated-brand"
        onClick={() => navigate('/')}
        title="Go to Animated Landing Page"
        style={{ cursor: 'pointer' }}
      >
        <div className="sidebar-logo-icon">TT</div>
        <div>
          <h1 className="sidebar-brand-text">Team Titans</h1>
          <p className="sidebar-brand-tagline">Write. Collaborate. Create.</p>
        </div>
      </div>

      <div className="sidebar-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <Button
          variant="primary"
          style={{ width: '100%' }}
          icon={<IconPlus size={18} />}
          onClick={handleCreateNew}
          className="animated-hover-glow"
        >
          New Document
        </Button>

        <label
          className="btn btn-secondary sidebar-import-btn animated-btn-press"
          style={{
            width: '100%',
            cursor: 'pointer',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            padding: '0.55rem 0.9rem',
            fontSize: '0.85rem'
          }}
          title="Open .html, .txt, .md, or .json file from your PC"
        >
          <IconUpload size={16} />
          <span>Import PC File</span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".html,.htm,.txt,.md,.json"
            style={{ display: 'none' }}
            onChange={handleImportPCFile}
          />
        </label>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `nav-item animated-nav-item ${isActive ? 'active' : ''}`}
        >
          <IconHome size={18} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/documents"
          className={({ isActive }) => `nav-item animated-nav-item ${isActive ? 'active' : ''}`}
        >
          <IconFileText size={18} />
          <span>My Documents</span>
        </NavLink>

        <NavLink
          to="/shared"
          className={({ isActive }) => `nav-item animated-nav-item ${isActive ? 'active' : ''}`}
        >
          <IconUsers size={18} />
          <span>Shared with me</span>
        </NavLink>

        <NavLink
          to="/starred"
          className={({ isActive }) => `nav-item animated-nav-item ${isActive ? 'active' : ''}`}
        >
          <IconStar size={18} />
          <span>Starred</span>
        </NavLink>

        <NavLink
          to="/documents?filter=trash"
          className={({ isActive }) => `nav-item animated-nav-item ${isActive ? 'active' : ''}`}
        >
          <IconTrash size={18} />
          <span>Trash</span>
        </NavLink>
      </nav>

      {/* PC Local Storage Mini Status Widget */}
      <div className="sidebar-storage-widget glass-card animated-pulse-subtle">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <IconHardDrive size={16} style={{ color: 'var(--success)' }} />
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)' }}>PC Local Storage</span>
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
          {storageStats.count} documents • {storageStats.usedKB} KB used
        </div>
      </div>

      <div className="sidebar-footer">
        <NavLink
          to="/profile"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <IconUser size={18} />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <IconSettings size={18} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

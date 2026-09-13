import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  IconHome,
  IconFileText,
  IconUsers,
  IconStar,
  IconTrash,
  IconPlus,
  IconUser,
  IconSettings
} from './Icons';
import { Button } from './Button';
import { useAppStore } from '../store/appStore';

export const Sidebar = () => {
  const navigate = useNavigate();
  const createDocument = useAppStore((state) => state.createDocument);

  const handleCreateNew = () => {
    const newDoc = createDocument();
    navigate(`/documents/${newDoc.id}`);
  };

  return (
    <aside className="sidebar">
      {/* BRAND & LOGO CLICKABLE LANDING PAGE LINK */}
      <div
        className="sidebar-brand"
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

      <div className="sidebar-actions">
        <Button
          variant="primary"
          style={{ width: '100%' }}
          icon={<IconPlus size={18} />}
          onClick={handleCreateNew}
        >
          New Document
        </Button>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <IconHome size={18} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/documents"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <IconFileText size={18} />
          <span>My Documents</span>
        </NavLink>

        <NavLink
          to="/shared"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <IconUsers size={18} />
          <span>Shared with me</span>
        </NavLink>

        <NavLink
          to="/starred"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <IconStar size={18} />
          <span>Starred</span>
        </NavLink>

        <NavLink
          to="/documents?filter=trash"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <IconTrash size={18} />
          <span>Trash</span>
        </NavLink>
      </nav>

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

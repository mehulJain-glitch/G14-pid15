import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconSearch } from './Icons';
import { useAppStore } from '../store/appStore';
import { CommandPalette } from './CommandPalette';

export const Navbar = () => {
  const navigate = useNavigate();
  const user = useAppStore((state) => state.user);
  const searchQuery = useAppStore((state) => state.searchQuery);
  const setSearchQuery = useAppStore((state) => state.setSearchQuery);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="navbar">
        <div className="nav-search-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div className="nav-search">
            <span className="nav-search-icon">
              <IconSearch size={18} />
            </span>
            <input
              type="text"
              className="input-field"
              placeholder="Search your documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Quick Command Palette Button */}
          <button
            type="button"
            className="command-trigger-btn animated-btn-press"
            onClick={() => setIsCommandOpen(true)}
            title="Open Command Palette (Ctrl+K)"
          >
            <span>Quick Actions</span>
            <kbd>⌘K</kbd>
          </button>
        </div>

        <div
          className="user-profile-badge animated-hover-glow"
          onClick={() => navigate('/profile')}
          title="View Profile"
        >
          <div className="avatar">{user?.avatar || 'VK'}</div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {user?.name || 'Vasudev Sharma'}
            </div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)' }}>
              {user?.email || 'vasudev@example.com'}
            </div>
          </div>
        </div>
      </header>

      {/* Global Command Palette Modal */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
};

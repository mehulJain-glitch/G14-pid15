import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconSearch } from './Icons';
import { useAppStore } from '../store/appStore';

export const Navbar = () => {
  const navigate = useNavigate();
  const user = useAppStore((state) => state.user);
  const searchQuery = useAppStore((state) => state.searchQuery);
  const setSearchQuery = useAppStore((state) => state.setSearchQuery);

  return (
    <header className="navbar">
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

      <div
        className="user-profile-badge"
        onClick={() => navigate('/profile')}
        title="View Profile"
      >
        <div className="avatar">{user?.avatar || 'VK'}</div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>
            {user?.name || 'Vasudev Sharma'}
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)' }}>
            {user?.email || 'vasudev@example.com'}
          </div>
        </div>
      </div>
    </header>
  );
};

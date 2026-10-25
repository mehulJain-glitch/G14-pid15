import React from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storage';

export const WorkspaceFooter = () => {
  const navigate = useNavigate();
  const stats = storageService.getStorageStats();

  return (
    <footer className="workspace-footer">
      <div className="workspace-footer-content">
        {/* LEFT BRAND & COPYRIGHT */}
        <div className="workspace-footer-left">
          <div
            className="workspace-footer-brand"
            onClick={() => navigate('/')}
            title="Go to Landing Page"
            style={{ cursor: 'pointer' }}
          >
            <div className="sidebar-logo-icon" style={{ width: '26px', height: '26px', fontSize: '0.78rem' }}>TT</div>
            <span style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.88rem' }}>Team Titans Docs</span>
          </div>
          <span className="workspace-footer-divider">|</span>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>
            © {new Date().getFullYear()} Google Docs Lite • All PC data stored locally
          </span>
        </div>

        {/* CENTER STATUS BADGE */}
        <div className="workspace-footer-center">
          <div className="workspace-status-badge">
            <span className="live-pulse-dot" />
            <span style={{ color: '#2EC4B6', fontWeight: 600 }}>PC Local Storage Active</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span style={{ color: 'var(--text-dim)' }}>{stats.count} Docs ({stats.usedKB} KB)</span>
          </div>
        </div>

        {/* RIGHT QUICK ACTIONS & SHORTCUTS */}
        <div className="workspace-footer-right">
          <span
            className="footer-link-action"
            onClick={() => navigate('/settings')}
            title="Application Settings"
          >
            Preferences
          </span>
          <span className="workspace-footer-divider">|</span>
          <span
            className="footer-link-action"
            onClick={() => navigate('/')}
            title="Landing & Features"
          >
            Features
          </span>
          <span className="workspace-footer-divider">|</span>
          <span
            className="footer-link-action"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Back to Top"
          >
            ▲ Top
          </span>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();

  const handleBrandClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pro-footer">
      <div className="page-container">
        <div className="pro-footer-grid">
          {/* BRAND COLUMN */}
          <div className="pro-footer-brand-col">
            <div className="pro-footer-brand" onClick={handleBrandClick} title="Team Titans Landing Page">
              <div className="sidebar-logo-icon" style={{ width: '36px', height: '36px', fontSize: '1.1rem' }}>TT</div>
              <div>
                <span className="sidebar-brand-text" style={{ fontSize: '1.3rem' }}>Team Titans</span>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Cyber Docs Lite
                </span>
              </div>
            </div>

            <p className="pro-footer-desc">
              Next-generation real-time collaborative document platform. Engineered for speed, multi-tab synchronization, and seamless document workflows.
            </p>

            <div className="pro-footer-socials">
              <span className="social-icon-btn" title="GitHub">🐙</span>
              <span className="social-icon-btn" title="Twitter / X">𝕏</span>
              <span className="social-icon-btn" title="Discord">💬</span>
              <span className="social-icon-btn" title="LinkedIn">💼</span>
            </div>
          </div>

          {/* PRODUCT COLUMN */}
          <div className="pro-footer-col">
            <h4>Product</h4>
            <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/documents">My Documents</Link></li>
              <li><Link to="/documents/doc-1">Live Editor</Link></li>
              <li><Link to="/shared">Shared Files</Link></li>
              <li><Link to="/starred">Starred Items</Link></li>
            </ul>
          </div>

          {/* NAVIGATION COLUMN */}
          <div className="pro-footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><a href="#home">Home Workspace</a></li>
              <li><a href="#users-login">Users & Login Access</a></li>
              <li><a href="#stack">Platform Tech Stack</a></li>
              <li><Link to="/login">User Sign In</Link></li>
              <li><Link to="/register">Account Register</Link></li>
            </ul>
          </div>

          {/* RESOURCES COLUMN */}
          <div className="pro-footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="#stack">Tech Architecture</a></li>
              <li><Link to="/profile">Account Settings</Link></li>
              <li><Link to="/settings">Editor Preferences</Link></li>
              <li><span>API Reference</span></li>
              <li><span>Documentation</span></li>
            </ul>
          </div>

          {/* COMPANY COLUMN */}
          <div className="pro-footer-col">
            <h4>Company</h4>
            <ul>
              <li><span onClick={handleBrandClick}>About Team Titans</span></li>
              <li><span>Careers</span></li>
              <li><span>Privacy Policy</span></li>
              <li><span>Terms of Service</span></li>
              <li><span>Security</span></li>
            </ul>
          </div>
        </div>

        {/* FOOTER BOTTOM BAR */}
        <div className="pro-footer-bottom">
          <div>
            © {new Date().getFullYear()} <strong style={{ color: 'var(--text-main)', cursor: 'pointer' }} onClick={handleBrandClick}>Team Titans</strong>. All rights reserved.
          </div>

          <div className="pro-footer-status">
            <span className="pro-footer-status-dot" />
            <span>All Systems Operational</span>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-dim)' }}>
            <span style={{ cursor: 'pointer' }}>Privacy</span>
            <span style={{ cursor: 'pointer' }}>Terms</span>
            <span style={{ cursor: 'pointer' }}>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconFileText,
  IconUsers,
  IconHistory,
  IconShare,
  IconCheck,
  IconUser,
  IconLock,
  IconSettings,
  IconLayers,
  IconPalette,
  IconCode,
  IconCompass
} from '../components/Icons';
import { Button } from '../components/Button';
import { Footer } from '../components/Footer';
import { useAppStore } from '../store/appStore';
import { useScrollAnimation, handle3DTiltMouseMove, handle3DTiltMouseLeave } from '../hooks/useScrollAnimation';

export const Landing = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const user = useAppStore((state) => state.user);

  // Activate scroll-triggered 3D sliding & rolling entrance animations
  useScrollAnimation();

  return (
    <div className="landing-container">
      {/* LANDING NAVIGATION */}
      <header className="landing-header">
        <div
          className="landing-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ cursor: 'pointer' }}
          title="Team Titans — Animated Landing Page"
        >
          <div className="sidebar-logo-icon">TT</div>
          <div>
            <span className="sidebar-brand-text">Team Titans</span>
            <span className="landing-tagline-badge">Cyber Edition</span>
          </div>
        </div>

        <nav className="landing-nav-links">
          <a href="#home">Home</a>
          <a href="#users-login">Users Login</a>
          <a href="#stack">Stack</a>
        </nav>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {isAuthenticated ? (
            <Button variant="primary" onClick={() => navigate('/dashboard')}>
              Go to Dashboard →
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button variant="primary" onClick={() => navigate('/register')}>
                Get Started Free
              </Button>
            </>
          )}
        </div>
      </header>

      {/* 1. HOME SECTION */}
      <section id="home" className="landing-hero">
        <div className="hero-badge pro-badge">
          <span className="pulse-dot" />
          <span>NEXT-GEN CYBER DOCUMENT WORKSPACE</span>
        </div>

        <h1 className="hero-title scroll-slide-up">
          Write. Collaborate. Create. <br />
          <span className="hero-subtitle">The High-Performance</span> <br />
          <span className="running-text-wrapper">
            <span className="running-text-animated">Google Docs Lite</span>
          </span>
        </h1>

        <p className="hero-description scroll-slide-up delay-1">
          A modern, ultra-responsive SaaS document workspace powered by <strong>React 19</strong>, 
          <strong> Zustand</strong>, <strong>Cyber Teal & Sage Design System</strong>, and <strong>Real-Time Multi-Tab Storage Sync</strong>.
          Experience interactive 3D document cards, multi-user role management, and revision history.
        </p>

        <div className="hero-cta-group scroll-slide-up delay-2">
          <Button variant="primary" style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }} onClick={() => navigate('/dashboard')}>
            Launch Workspace 🚀
          </Button>
          <Button variant="secondary" style={{ padding: '0.9rem 1.85rem', fontSize: '1.05rem' }} onClick={() => navigate('/documents/doc-1')}>
            Try Editor Live 📝
          </Button>
        </div>

        {/* HERO MOCKUP CARD WITH 3D TILT */}
        <div
          className="hero-preview-card glass-card scroll-flip-3d delay-3"
          onMouseMove={handle3DTiltMouseMove}
          onMouseLeave={handle3DTiltMouseLeave}
        >
          <div className="preview-card-header">
            <div className="window-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <div className="preview-title">Team Titans Product Roadmap</div>
            <span className="badge badge-editor">● Live Synced</span>
          </div>
          <div className="preview-card-body">
            <div className="preview-toolbar-mock">
              <span><strong>B</strong></span>
              <span><em>I</em></span>
              <span><u>U</u></span>
              <span className="divider" />
              <span>Title (Heading 1)</span>
              <span className="divider" />
              <span>Inter</span>
              <span>16pt</span>
              <span className="divider" />
              <span>• List</span>
              <span>1. List</span>
            </div>
            <div className="preview-paper-mock">
              <h2>Project Overview</h2>
              <p>
                <strong>Team Titans</strong> represents a lightweight, browser-native <em>Google Docs Lite</em> architecture.
                Designed for high-performance browser execution without third-party rich-text dependencies.
              </p>
              <div className="preview-highlight-box">
                ✨ Key Highlight: Multi-tab live sync via browser Storage events & debounced LocalStorage JSON snapshots.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. USERS LOGIN SECTION */}
      <section id="users-login" className="landing-features page-container">
        <div className="scroll-slide-up" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="hero-badge pro-badge" style={{ marginBottom: '1rem' }}>
            <span className="pulse-dot" style={{ background: '#8cbf9f', boxShadow: '0 0 10px #8cbf9f' }} />
            <span>USER ACCESS & AUTHENTICATION</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Users & Login Workspaces</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '0.5rem', maxWidth: '720px', marginInline: 'auto' }}>
            Built-in user authentication, role-based document access, and active multi-user session management tailored for team collaboration.
          </p>
        </div>

        <div className="features-grid">
          <div
            className="glass-card feature-card scroll-zoom-in delay-1"
            onMouseMove={handle3DTiltMouseMove}
            onMouseLeave={handle3DTiltMouseLeave}
          >
            <div className="feature-icon" style={{ background: 'rgba(45, 139, 111, 0.25)', color: '#8cbf9f' }}>
              <IconLock size={28} />
            </div>
            <h3>User Login & Authentication</h3>
            <p>Secure login system with persisted session state, custom email authentication, and automatic profile initialization.</p>
            <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
              <span
                onClick={() => navigate('/login')}
                style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
              >
                Try Login Flow →
              </span>
            </div>
          </div>

          <div
            className="glass-card feature-card scroll-slide-up delay-2"
            onMouseMove={handle3DTiltMouseMove}
            onMouseLeave={handle3DTiltMouseLeave}
          >
            <div className="feature-icon" style={{ background: 'rgba(22, 83, 85, 0.4)', color: 'var(--accent)' }}>
              <IconUsers size={28} />
            </div>
            <h3>Role-Based Sharing</h3>
            <p>Assign Editor (Full Edit), Commenter (Comments only), or Viewer (Read-only) permissions with UI-enforced access controls.</p>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '0.5rem' }}>
              <span className="badge badge-editor">Editor</span>
              <span className="badge badge-commenter">Commenter</span>
              <span className="badge badge-viewer">Viewer</span>
            </div>
          </div>

          <div
            className="glass-card feature-card scroll-slide-up delay-3"
            onMouseMove={handle3DTiltMouseMove}
            onMouseLeave={handle3DTiltMouseLeave}
          >
            <div className="feature-icon" style={{ background: 'rgba(45, 139, 111, 0.3)', color: '#2d8b6f' }}>
              <IconUser size={28} />
            </div>
            <h3>User Profiles & Preferences</h3>
            <p>Customizable user avatars, display names, email management, dark mode settings, and personal document statistics.</p>
            <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
              <span
                onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}
                style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
              >
                {isAuthenticated ? `LoggedIn as ${user?.name || 'User'} →` : 'Manage Profile →'}
              </span>
            </div>
          </div>

          <div
            className="glass-card feature-card scroll-slide-right delay-4"
            onMouseMove={handle3DTiltMouseMove}
            onMouseLeave={handle3DTiltMouseLeave}
          >
            <div className="feature-icon" style={{ background: 'rgba(140, 191, 159, 0.25)', color: '#8cbf9f' }}>
              <IconShare size={28} />
            </div>
            <h3>Active Multi-Tab Sessions</h3>
            <p>Simultaneous document editing across multiple browser windows with active user presence and live Storage synchronization.</p>
            <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
              <span className="badge badge-editor">● Multi-Tab Live</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STACK SECTION */}
      <section id="stack" className="landing-syllabus page-container">
        <div className="scroll-slide-up" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="hero-badge pro-badge" style={{ marginBottom: '1rem' }}>
            <span className="pulse-dot" />
            <span>PLATFORM ARCHITECTURE & TECH STACK</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Platform Tech Stack</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '0.5rem', maxWidth: '720px', marginInline: 'auto' }}>
            High-performance browser architecture built with modern Web technologies, zero heavy library bloat, and custom dark teal & sage aesthetics.
          </p>
        </div>

        <div className="features-grid" style={{ marginBottom: '3rem' }}>
          <div
            className="glass-card feature-card scroll-zoom-in delay-1"
            onMouseMove={handle3DTiltMouseMove}
            onMouseLeave={handle3DTiltMouseLeave}
          >
            <div className="feature-icon"><IconCode size={28} /></div>
            <h3>React 19 Core</h3>
            <p>Modern React 19 component hierarchy, custom hooks, dynamic state hooks, and high-speed DOM virtual reconciliation.</p>
          </div>

          <div
            className="glass-card feature-card scroll-slide-up delay-2"
            onMouseMove={handle3DTiltMouseMove}
            onMouseLeave={handle3DTiltMouseLeave}
          >
            <div className="feature-icon" style={{ background: 'rgba(22, 83, 85, 0.4)', color: 'var(--accent)' }}><IconLayers size={28} /></div>
            <h3>Zustand State Store</h3>
            <p>Centralized global state store managing document catalogs, user auth sessions, revision history snapshots, and toasts.</p>
          </div>

          <div
            className="glass-card feature-card scroll-slide-up delay-3"
            onMouseMove={handle3DTiltMouseMove}
            onMouseLeave={handle3DTiltMouseLeave}
          >
            <div className="feature-icon" style={{ background: 'rgba(45, 139, 111, 0.3)', color: '#2d8b6f' }}><IconPalette size={28} /></div>
            <h3>Custom Teal & Sage Theme</h3>
            <p>Extracted 4-tone design system (#0B232A, #165355, #2D8B6F, #8CBF9F) with interactive 3D perspective tilt physics.</p>
          </div>

          <div
            className="glass-card feature-card scroll-slide-right delay-4"
            onMouseMove={handle3DTiltMouseMove}
            onMouseLeave={handle3DTiltMouseLeave}
          >
            <div className="feature-icon" style={{ background: 'rgba(140, 191, 159, 0.25)', color: '#8cbf9f' }}><IconCompass size={28} /></div>
            <h3>React Router v7 SPA</h3>
            <p>Declarative client-side routing with protected page guards, parameter matching, and smooth animated transitions.</p>
          </div>
        </div>

        <div
          className="glass-card syllabus-box scroll-flip-3d"
          onMouseMove={handle3DTiltMouseMove}
          onMouseLeave={handle3DTiltMouseLeave}
        >
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>
              Full Technical Stack Specification
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              Engineered with zero heavy rich-text editor dependencies. Native browser contentEditable execution, 
              custom CSS3 Glassmorphism, JavaScript ES6+, React 19, Zustand, and LocalStorage.
            </p>
            <div className="syllabus-checklist">
              <div><IconCheck size={18} style={{ color: 'var(--success)' }} /> React 19 Components & Custom Hooks</div>
              <div><IconCheck size={18} style={{ color: 'var(--success)' }} /> 3D Scroll & Mouse Tilt Physics Engine</div>
              <div><IconCheck size={18} style={{ color: 'var(--success)' }} /> Zustand Centralized State Store</div>
              <div><IconCheck size={18} style={{ color: 'var(--success)' }} /> React Router v7 SPA Routing Guard</div>
              <div><IconCheck size={18} style={{ color: 'var(--success)' }} /> LocalStorage Event-Driven Multi-Tab Sync</div>
              <div><IconCheck size={18} style={{ color: 'var(--success)' }} /> Role Access Control (Editor/Viewer)</div>
            </div>
          </div>
          <div className="syllabus-cta">
            <Button variant="primary" style={{ padding: '1.1rem 2.2rem', fontSize: '1.05rem' }} onClick={() => navigate('/dashboard')}>
              Explore Workspace →
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconFileText,
  IconHistory,
  IconShare,
  IconCheck,
  IconLock,
  IconPalette,
  IconCompass,
  IconSave,
  IconDownload,
  IconHardDrive
} from '../components/Icons';
import { Button } from '../components/Button';
import { Footer } from '../components/Footer';
import { useAppStore } from '../store/appStore';
import { useScrollAnimation, handle3DTiltMouseMove, handle3DTiltMouseLeave } from '../hooks/useScrollAnimation';

export const Landing = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  // Activate scroll-triggered 3D sliding, rolling, cascade & blur entrance animations
  useScrollAnimation();

  return (
    <div className="landing-container">
      {/* LANDING NAVIGATION */}
      <header className="landing-header">
        <div
          className="landing-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ cursor: 'pointer' }}
          title="Team Titans — Classy & Sassy Document Workspace"
        >
          <div className="sidebar-logo-icon">TT</div>
          <div>
            <span className="sidebar-brand-text">Team Titans</span>
            <span className="landing-tagline-badge">CLASSY & SASSY WORKSPACE</span>
          </div>
        </div>

        <nav className="landing-nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#metrics">Metrics</a>
          <a href="#stack">Tech Stack</a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {isAuthenticated ? (
            <Button
              variant="primary"
              onClick={() => navigate('/dashboard')}
              className="animated-hover-glow"
            >
              Go to Workspace →
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate('/register')}
                className="animated-hover-glow"
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section id="home" className="landing-hero">
        <div className="hero-badge pro-badge">
          <span className="pulse-dot" />
          <span>✦ ULTRA-PREMIUM CLASSY & SASSY WORKSPACE</span>
        </div>

        <h1 className="hero-title scroll-slide-up">
          Write Without Limits. <br />
          <span className="hero-subtitle">The Ultra-Modern</span> <br />
          <span className="running-text-wrapper">
            <span className="running-text-animated">Google Docs Lite</span>
          </span>
        </h1>

        <p className="hero-description scroll-slide-up delay-1">
          A high-fashion, lighting-fast document workspace crafted in <strong>Midnight Obsidian (#121826)</strong>, 
          <strong> Royal Violet (#6C63FF)</strong>, and <strong>Electric Cyan (#2EC4B6)</strong>. 
          Featuring instant <strong>PC Local Storage persistence</strong> on <kbd>Ctrl+S</kbd>, native file exports, and live multi-tab synchronization.
        </p>

        <div className="hero-cta-group scroll-slide-up delay-2">
          <Button
            variant="primary"
            style={{ padding: '0.95rem 2.4rem', fontSize: '1.05rem' }}
            onClick={() => navigate('/dashboard')}
            className="animated-hover-glow"
          >
            Launch Workspace 🚀
          </Button>
          <Button
            variant="secondary"
            style={{ padding: '0.95rem 2rem', fontSize: '1.05rem' }}
            onClick={() => navigate('/documents/doc-1')}
            className="animated-btn-press"
          >
            Try Editor Live 📝
          </Button>
        </div>

        {/* HERO MOCKUP CARD WITH 3D TILT & FLOATING BADGE */}
        <div
          className="hero-preview-card glass-card scroll-flip-3d delay-3 sassy-card-border-glow"
          onMouseMove={handle3DTiltMouseMove}
          onMouseLeave={handle3DTiltMouseLeave}
        >
          <div className="preview-card-header">
            <div className="window-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <div className="preview-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IconFileText size={16} style={{ color: 'var(--accent)' }} />
              <span>Team Titans — Luxury Workspace Architecture</span>
            </div>
            <span className="badge badge-editor" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <span className="live-pulse-dot" />
              PC Storage Synced
            </span>
          </div>

          <div className="preview-card-body">
            <div className="preview-toolbar-mock">
              <span><strong>B</strong></span>
              <span><em>I</em></span>
              <span><u>U</u></span>
              <span className="divider" />
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Title (Heading 1)</span>
              <span className="divider" />
              <span>Outfit</span>
              <span>18pt</span>
              <span className="divider" />
              <span>• Bullet</span>
              <span>1. Numbered</span>
              <span className="divider" />
              <span style={{ background: 'rgba(108, 99, 255, 0.2)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#6C63FF' }}>
                💾 Save to PC
              </span>
            </div>

            <div className="preview-paper-mock">
              <h2 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Next-Gen Collaborative Document Engine</h2>
              <p style={{ color: '#334155', lineHeight: 1.65 }}>
                Engineered with pure <strong>React 19</strong>, <strong>Zustand</strong>, and <strong>Hardware-Accelerated CSS3</strong>. 
                Documents are saved directly onto your PC's local storage upon typing or pressing <kbd>Ctrl+S</kbd>, granting complete offline autonomy and privacy.
              </p>
              <div className="preview-highlight-box" style={{ background: 'rgba(108, 99, 255, 0.12)', borderLeft: '4px solid #6C63FF', color: 'var(--text-main)' }}>
                ✨ <strong>Zero-Cloud Dependency</strong>: Instant PC LocalStorage persistence, 1-click HTML/Markdown/JSON exports, and time-machine snapshot history.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE METRICS & SASSY NUMBERS BAR */}
      <section id="metrics" className="landing-metrics page-container">
        <div className="scroll-blur-in" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="sassy-pill">✦ CRAFTED FOR SPEED & LUXURY</span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginTop: '0.8rem' }}>
            Metrics That Define Class
          </h2>
        </div>

        <div className="stats-grid">
          <div
            className="glass-card stat-card scroll-slide-left delay-1"
            onMouseMove={handle3DTiltMouseMove}
            onMouseLeave={handle3DTiltMouseLeave}
          >
            <div className="stat-icon" style={{ background: 'rgba(108, 99, 255, 0.2)', color: '#6C63FF' }}>
              <IconHardDrive size={26} />
            </div>
            <div>
              <div className="stat-val" style={{ color: '#2EC4B6' }}>0.0ms</div>
              <div className="stat-label">PC LocalStorage Latency</div>
            </div>
          </div>

          <div
            className="glass-card stat-card scroll-slide-up delay-2"
            onMouseMove={handle3DTiltMouseMove}
            onMouseLeave={handle3DTiltMouseLeave}
          >
            <div className="stat-icon" style={{ background: 'rgba(46, 196, 182, 0.2)', color: '#2EC4B6' }}>
              <IconSave size={26} />
            </div>
            <div>
              <div className="stat-val" style={{ color: '#6C63FF' }}>100%</div>
              <div className="stat-label">Offline Accessible</div>
            </div>
          </div>

          <div
            className="glass-card stat-card scroll-slide-up delay-3"
            onMouseMove={handle3DTiltMouseMove}
            onMouseLeave={handle3DTiltMouseLeave}
          >
            <div className="stat-icon" style={{ background: 'rgba(108, 99, 255, 0.2)', color: '#6C63FF' }}>
              <IconPalette size={26} />
            </div>
            <div>
              <div className="stat-val" style={{ color: '#F8FAFC' }}>4-Tone</div>
              <div className="stat-label">Luxury Sassy Palette</div>
            </div>
          </div>

          <div
            className="glass-card stat-card scroll-slide-right delay-4"
            onMouseMove={handle3DTiltMouseMove}
            onMouseLeave={handle3DTiltMouseLeave}
          >
            <div className="stat-icon" style={{ background: 'rgba(46, 196, 182, 0.2)', color: '#2EC4B6' }}>
              <IconCompass size={26} />
            </div>
            <div>
              <div className="stat-val" style={{ color: '#2EC4B6' }}>60 FPS</div>
              <div className="stat-label">Hardware-Driven Physics</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES BENTO GRID SECTION */}
      <section id="features" className="landing-features page-container">
        <div className="scroll-slide-up" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="sassy-pill">✦ CLASSY ARCHITECTURE & CAPABILITIES</span>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 800, marginTop: '0.8rem' }}>
            Designed with Modern Sass & Rigor
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '0.5rem', maxWidth: '720px', marginInline: 'auto' }}>
            Every interaction is calibrated for high performance, uncompromising aesthetics, and effortless document management.
          </p>
        </div>

        <div className="features-grid">
          {/* Card 1: PC Local Storage */}
          <div
            className="glass-card feature-card scroll-zoom-in delay-1 sassy-card-border-glow"
            onMouseMove={handle3DTiltMouseMove}
            onMouseLeave={handle3DTiltMouseLeave}
          >
            <div className="feature-icon" style={{ background: 'rgba(108, 99, 255, 0.25)', color: '#6C63FF' }}>
              <IconHardDrive size={28} />
            </div>
            <h3>PC Local Storage & Ctrl+S</h3>
            <p>Every keystroke and Ctrl+S command saves instantly to your PC browser LocalStorage with automatic revision snapshots.</p>
            <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
              <span className="badge badge-editor">💾 Instant Offline Persistence</span>
            </div>
          </div>

          {/* Card 2: Export & Download to PC */}
          <div
            className="glass-card feature-card scroll-slide-up delay-2 sassy-card-border-glow"
            onMouseMove={handle3DTiltMouseMove}
            onMouseLeave={handle3DTiltMouseLeave}
          >
            <div className="feature-icon" style={{ background: 'rgba(46, 196, 182, 0.25)', color: '#2EC4B6' }}>
              <IconDownload size={28} />
            </div>
            <h3>Physical PC File Export</h3>
            <p>Download standalone documents formatted as HTML, clean plain TXT, Markdown (.md), or complete JSON backup files with 1 click.</p>
            <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
              <span className="badge badge-commenter">📥 Native File System Access</span>
            </div>
          </div>

          {/* Card 3: Multi-Tab Telepathy */}
          <div
            className="glass-card feature-card scroll-slide-up delay-3 sassy-card-border-glow"
            onMouseMove={handle3DTiltMouseMove}
            onMouseLeave={handle3DTiltMouseLeave}
          >
            <div className="feature-icon" style={{ background: 'rgba(108, 99, 255, 0.25)', color: '#6C63FF' }}>
              <IconShare size={28} />
            </div>
            <h3>Real-Time Multi-Tab Sync</h3>
            <p>Simultaneous editing across multiple windows with custom browser Storage event listeners and state synchronization.</p>
            <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
              <span className="badge badge-editor">● Multi-Window Telepathy</span>
            </div>
          </div>

          {/* Card 4: Role-Based Security */}
          <div
            className="glass-card feature-card scroll-slide-right delay-4 sassy-card-border-glow"
            onMouseMove={handle3DTiltMouseMove}
            onMouseLeave={handle3DTiltMouseLeave}
          >
            <div className="feature-icon" style={{ background: 'rgba(46, 196, 182, 0.25)', color: '#2EC4B6' }}>
              <IconLock size={28} />
            </div>
            <h3>Role-Based Access Control</h3>
            <p>Assign Editor (Full Edit), Commenter (Comments only), or Viewer (Read-only) permissions with UI-enforced access controls.</p>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '0.75rem' }}>
              <span className="badge badge-editor">Editor</span>
              <span className="badge badge-commenter">Commenter</span>
              <span className="badge badge-viewer">Viewer</span>
            </div>
          </div>

          {/* Card 5: Version History Time Machine */}
          <div
            className="glass-card feature-card scroll-slide-left delay-2 sassy-card-border-glow"
            onMouseMove={handle3DTiltMouseMove}
            onMouseLeave={handle3DTiltMouseLeave}
          >
            <div className="feature-icon" style={{ background: 'rgba(108, 99, 255, 0.25)', color: '#6C63FF' }}>
              <IconHistory size={28} />
            </div>
            <h3>Time-Machine Version History</h3>
            <p>Review timestamped revisions, preview previous drafts, and restore any previous version with a single click.</p>
            <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
              <span className="badge badge-editor">🕒 1-Click Rollback</span>
            </div>
          </div>

          {/* Card 6: Classy Cyber Palette */}
          <div
            className="glass-card feature-card scroll-slide-right delay-3 sassy-card-border-glow"
            onMouseMove={handle3DTiltMouseMove}
            onMouseLeave={handle3DTiltMouseLeave}
          >
            <div className="feature-icon" style={{ background: 'rgba(46, 196, 182, 0.25)', color: '#2EC4B6' }}>
              <IconPalette size={28} />
            </div>
            <h3>Classy & Sassy Palette</h3>
            <p>Tailored 4-tone palette featuring Midnight Obsidian (#121826), Royal Violet (#6C63FF), Snow Pearl (#F8FAFC), and Electric Cyan (#2EC4B6).</p>
            <div style={{ display: 'flex', gap: '0.4rem', marginTop: 'auto', paddingTop: '0.75rem' }}>
              <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#6C63FF', display: 'inline-block' }} title="#6C63FF" />
              <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#121826', border: '1px solid #6C63FF', display: 'inline-block' }} title="#121826" />
              <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#F8FAFC', display: 'inline-block' }} title="#F8FAFC" />
              <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#2EC4B6', display: 'inline-block' }} title="#2EC4B6" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. STACK SECTION */}
      <section id="stack" className="landing-stack page-container">
        <div className="scroll-blur-in" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="sassy-pill">✦ HIGH-PERFORMANCE FOUNDATION</span>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 800, marginTop: '0.8rem' }}>
            Built With Modern SaaS Tech
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '0.5rem', maxWidth: '720px', marginInline: 'auto' }}>
            Engineered with zero third-party bloated rich-text libraries. Pure native browser execution with high-grade React 19.
          </p>
        </div>

        <div
          className="glass-card stack-overview-box scroll-glow-reveal sassy-card-border-glow"
          onMouseMove={handle3DTiltMouseMove}
          onMouseLeave={handle3DTiltMouseLeave}
        >
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '1rem' }}>
              Technical Stack & Architecture
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              Designed for optimal performance, responsiveness, and zero cloud dependency. 
              Native browser contentEditable DOM interaction, custom 3D glassmorphism CSS, React 19, Zustand, and LocalStorage.
            </p>
            <div className="stack-checklist">
              <div><IconCheck size={18} style={{ color: 'var(--accent)' }} /> React 19 Core & Custom Imperative Hooks</div>
              <div><IconCheck size={18} style={{ color: 'var(--accent)' }} /> 3D Scroll & Mouse Physics Tilt Engine</div>
              <div><IconCheck size={18} style={{ color: 'var(--accent)' }} /> Zustand Centralized App & Toast Store</div>
              <div><IconCheck size={18} style={{ color: 'var(--accent)' }} /> React Router v7 SPA Routing with Guards</div>
              <div><IconCheck size={18} style={{ color: 'var(--accent)' }} /> Multi-Tab PC Local Storage Synchronization</div>
              <div><IconCheck size={18} style={{ color: 'var(--accent)' }} /> Native File System Access & File Export</div>
            </div>
          </div>

          <div className="stack-cta">
            <Button
              variant="primary"
              style={{ padding: '1.1rem 2.4rem', fontSize: '1.05rem' }}
              onClick={() => navigate('/dashboard')}
              className="animated-hover-glow"
            >
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

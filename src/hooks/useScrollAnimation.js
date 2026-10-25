import { useEffect } from 'react';

/**
 * Enhanced Scroll Animation Engine
 * Automatically attaches IntersectionObserver for scroll-driven 3D sliding, zoom, cascade & blur reveals,
 * plus dynamically updates a top-screen luxury glowing gradient scroll progress bar.
 */
export function useScrollAnimation() {
  useEffect(() => {
    // 1. Setup IntersectionObserver for entrance animations on scroll
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-active');
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const animatableElements = document.querySelectorAll(
      '.scroll-reveal, .scroll-slide-up, .scroll-slide-left, .scroll-slide-right, .scroll-zoom-in, .scroll-flip-3d, .scroll-3d-tilt, .scroll-blur-in, .scroll-glow-reveal'
    );

    animatableElements.forEach((el) => observer.observe(el));

    // 2. Setup Top Scroll Progress Indicator Bar
    const handleScrollProgress = () => {
      const progressBar = document.getElementById('scroll-progress-bar');
      if (!progressBar) return;
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = `${scrolled}%`;
    };

    window.addEventListener('scroll', handleScrollProgress, { passive: true });
    handleScrollProgress();

    return () => {
      animatableElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollProgress);
    };
  }, []);
}

/**
 * 3D Mouse Tilt Handler with smooth physics and luminous specular highlight
 */
export function handle3DTiltMouseMove(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -8;
  const rotateY = ((x - centerX) / centerX) * 8;

  card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale3d(1.02, 1.02, 1.02)`;
  card.style.transition = 'transform 0.08s ease-out';
}

export function handle3DTiltMouseLeave(e) {
  const card = e.currentTarget;
  card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
  card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
}

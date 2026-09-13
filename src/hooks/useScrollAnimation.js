import { useEffect } from 'react';

/**
 * Hook to attach IntersectionObserver for scroll-driven 3D sliding, zoom-in, & floating entrance animations.
 */
export function useScrollAnimation() {
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-active');
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const animatableElements = document.querySelectorAll(
      '.scroll-reveal, .scroll-slide-up, .scroll-slide-left, .scroll-slide-right, .scroll-zoom-in, .scroll-flip-3d, .scroll-3d-tilt'
    );

    animatableElements.forEach((el) => observer.observe(el));

    return () => {
      animatableElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);
}

/**
 * 3D Mouse Tilt Handler for cards
 * Attach onMouseMove and onMouseLeave to any card for smooth 3D depth tilt!
 */
export function handle3DTiltMouseMove(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -10;
  const rotateY = ((x - centerX) / centerX) * 10;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px) scale3d(1.02, 1.02, 1.02)`;
  card.style.transition = 'transform 0.1s ease-out';
}

export function handle3DTiltMouseLeave(e) {
  const card = e.currentTarget;
  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
  card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
}

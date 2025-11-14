"use client";

import { useEffect } from 'react';

const DEFAULT_SELECTORS = [
  'header',
  'section',
  'footer',
  '.project-item',
  '.company-card',
  '.responsibilities-card',
  '.contact',
];

export default function ScrollAnimator() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll(DEFAULT_SELECTORS.join(','))
    ) as HTMLElement[];

    elements.forEach((el, index) => {
      el.classList.add('reveal');
      // small stagger for initial viewport elements
      (el as any).dataset.staggerIndex = String(index % 8);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add('show');
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}



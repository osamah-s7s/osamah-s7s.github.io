"use client";

import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const sectionIds = ['home', 'about', 'experience', 'projects', 'contact'];

  // Intersection observer for reveal only (active section is computed via scroll below)
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        // observer now only triggers reveal CSS by adding a data attribute if needed later
      },
      {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => { observer.disconnect(); };
  }, []);

  // Determine active section precisely based on scroll position and fixed header height
  useEffect(() => {
    let rafId: number | null = null;
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const computeActive = () => {
      const headerHeight = navRef.current?.offsetHeight || 80;
      let current = sectionIds[0];
      
      // Find the last section that has passed the top of the viewport
      for (const sec of sections) {
        const top = sec.getBoundingClientRect().top - headerHeight - 4; // small cushion
        if (top <= 0) {
          current = sec.id;
        } else {
          break;
        }
      }
      
      // Special case: if we're at the very bottom of the page, highlight the last section
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollTop + windowHeight >= documentHeight - 10) {
        current = sectionIds[sectionIds.length - 1]; // Last section (contact)
      }
      
      // Only set active section if it's in our navigation
      if (sectionIds.includes(current)) {
        setActiveSection(current);
      }
      setIsScrolled(scrollTop > 50);
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        computeActive();
        rafId = null;
      });
    };

    computeActive();
    window.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions);
    window.addEventListener('resize', onScroll);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll as any);
      window.removeEventListener('resize', onScroll);
    };
  }, []);


  const handleNavClick = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      // Enhanced smooth scrolling with accurate offset for fixed header
      const headerHeight = navRef.current?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight - 10;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header 
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      ref={navRef}
    >
      <nav className="nav">
        <a 
          href="#" 
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
        >
          <span className="logo-text">Osamah</span>
          <span className="logo-accent">.dev</span>
        </a>
        
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              <a
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                <span className="nav-link-text">{item.label}</span>
                <span className="nav-link-bg"></span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(0);
        }

        .header.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(20px);
        }

        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.75rem 2rem;
          position: relative;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          text-decoration: none;
          color: #2563eb;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .logo:hover { transform: translateY(-2px); }
        .logo-text { color: #1f2937; }
        .logo-accent { color: #2563eb; text-shadow: 0 0 20px rgba(37, 99, 235, 0.3); }

        .nav-links {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          position: relative;
          gap: 0.5rem;
        }

        .nav-item { position: relative; }

        .nav-link {
          position: relative;
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem;
          text-decoration: none;
          color: #6b7280;
          font-weight: 500;
          font-size: 0.95rem;
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          cursor: pointer;
        }

        .nav-link-text { position: relative; z-index: 2; transition: all 0.3s ease; }

        .nav-link-bg {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 8px;
        }

        .nav-link:hover .nav-link-bg { transform: scaleX(1); transform-origin: left; }
        .nav-link:hover { color: white; transform: translateY(-2px); }
        .nav-link:hover .nav-link-text { transform: scale(1.05); }

        .nav-link.active { color: #2563eb; font-weight: 600; }
        .nav-link.active .nav-link-text { text-shadow: 0 0 10px rgba(37, 99, 235, 0.3); }


        @media (max-width: 768px) {
          .nav { padding: 0.5rem 1rem; }
          .nav-links { gap: 0.25rem; }
          .nav-link { padding: 0.375rem 0.75rem; font-size: 0.875rem; }
          .logo { font-size: 1.25rem; }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .header { animation: slideIn 0.6s ease-out; }

        .nav-link:focus { outline: none; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3); }
        .nav-link:hover::before {
          content: '';
          position: absolute; top: 50%; left: 50%; width: 0; height: 0;
          background: rgba(37, 99, 235, 0.1);
          border-radius: 50%; transform: translate(-50%, -50%);
          transition: all 0.5s ease; z-index: 1;
        }
        .nav-link:hover::before { width: 100px; height: 100px; }
      `}</style>
    </header>
  );
};

export default Header;

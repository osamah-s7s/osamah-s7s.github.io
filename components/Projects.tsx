"use client";

import { projects } from '@/data';
import { useEffect, useRef, useState } from 'react';
import ImageCarousel from './ImageCarousel';

const TechList = ({ technologies }: { technologies: string[] }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsToggle, setNeedsToggle] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const el = containerRef.current;
      if (!el) return;
      // One-line height approximation based on pill height
      const isOverflowing = el.scrollHeight > el.clientHeight + 2;
      setNeedsToggle(isOverflowing);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [technologies]);

  return (
    <div className="tech-panel">
      <div className="tech-panel-header">
        <span>Technologies Used</span>
        {needsToggle && (
          <button
            className={`tech-toggle ${isExpanded ? 'open' : ''}`}
            onClick={() => setIsExpanded((v) => !v)}
            aria-expanded={isExpanded}
          >
            <span className="arrow">⌄</span>
          </button>
        )}
      </div>
      <div
        ref={containerRef}
        className={`tech-panel-body ${isExpanded ? 'expanded' : 'collapsed'}`}
      >
        {technologies.map((tech, idx) => (
          <span key={idx} className="pill">{tech}</span>
        ))}
      </div>
    </div>
  );
};

const Projects = () => {
  useEffect(() => {
    const buttons = Array.from(document.querySelectorAll('.btn')) as HTMLElement[];
    const onClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      target.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };

    buttons.forEach((b) => b.addEventListener('click', onClick));
    return () => buttons.forEach((b) => b.removeEventListener('click', onClick));
  }, []);

  return (
    <section id="projects">
      <div className="projects-header">
        <h2 className="section-title">
          <span className="gradient-text portfolio-title">Portfolio</span>
          <span className="portfolio-subtitle">Each Project Is A Unique Piece Of Development 🍀</span>
        </h2>
        <p>Selected work highlighting product quality, thoughtful UX, and solid engineering.</p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={project.id} className="project-item">
            {/* Alternate layout: even index shows image first */}
            {index % 2 === 1 ? (
              <>
                <div className="project-preview">
                  {project.isUnderDevelopment && (
                    <div className="wip-ribbon">Under Development</div>
                  )}
                  {project.images && project.images.length > 1 ? (
                    <ImageCarousel
                      images={project.images}
                      alt={project.title}
                      className="project-screenshot"
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-screenshot"
                    />
                  )}
                  {project.isUnderDevelopment && (
                    <div className="wip-pill">Work in progress - Coming soon!</div>
                  )}
                </div>
                <div className="project-info">
                  <h3>
                    <span className="gradient-text">{project.title}</span>
                    <span className="project-emoji">{project.emoji}</span>
                  </h3>
                  <p>{project.description}</p>

                  <TechList technologies={project.technologies} />

                  {project.previewUrl ? (
                    <a href={project.previewUrl} className="btn view-button">
                      View Project <span className="btn-arrow">↗</span>
                    </a>
                  ) : (
                    <a href={project.previewUrl || '#'} className="btn preview-button">
                      Preview Work in Progress <span className="btn-arrow">↗</span>
                    </a>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="project-info">
                  <h3>
                    <span className="gradient-text">{project.title}</span>
                    <span className="project-emoji">{project.emoji}</span>
                  </h3>
                  <p>{project.description}</p>

                  <TechList technologies={project.technologies} />

                  {project.previewUrl ? (
                    <a href={project.previewUrl} className="btn view-button">
                      View Project <span className="btn-arrow">↗</span>
                    </a>
                  ) : (
                    <a href={project.previewUrl || '#'} className="btn preview-button">
                      Preview Work in Progress <span className="btn-arrow">↗</span>
                    </a>
                  )}
                </div>
                <div className="project-preview">
                  {project.isUnderDevelopment && (
                    <div className="wip-ribbon">Under Development</div>
                  )}
                  {project.images && project.images.length > 1 ? (
                    <ImageCarousel
                      images={project.images}
                      alt={project.title}
                      className="project-screenshot"
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-screenshot"
                    />
                  )}
                  {project.isUnderDevelopment && (
                    <div className="wip-pill">Work in progress - Coming soon!</div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
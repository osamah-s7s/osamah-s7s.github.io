'use client';

import { useState, useEffect, useRef } from 'react';
import { experience } from '@/data';

const Experience = () => {
  const [visibleTags, setVisibleTags] = useState<Set<number>>(new Set());
  const [hoveredTag, setHoveredTag] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const techTags = [
    'Next.js & Node.js',
    'Business Development',
    'RAG Systems',
    'Express & MongoDB',
    'Chatbots & AI',
    'DevOps',
    'Mobile Development'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tags = entry.target.querySelectorAll('.tech-tag');
            tags.forEach((tag, index) => {
              setTimeout(() => {
                setVisibleTags(prev => new Set(Array.from(prev).concat(index)));
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef}>
      <div className="projects-header">
        <h2 className="section-title">
          <span className="gradient-text">Professional Experience</span>
        </h2>
        <p>My journey and experience in the tech industry</p>
      </div>

      <div className="experience-grid">
        <div className="company-card">
          <div className="company-info">
            <a 
              href="https://bitlogicx.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="company-logo-link"
            >
              <img 
                src="/company logo.png" 
                alt="BitLogicX Company Logo" 
                className="company-logo-img"
              />
            </a>
            <h3 className="company-name">{experience.company}</h3>
            <p className="company-role">{experience.role}</p>
            <p className="duration">{experience.duration}</p>
            <p className="location">{experience.location}</p>
            <a 
              href="/Osamah EL.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="view-certificate-btn"
            >
              View Certificate
            </a>
          </div>
        </div>
        <div className="responsibilities-card">
          <div className="responsibilities">
            <h3>Key Responsibilities & Achievements</h3>
            {experience.responsibilities.map((responsibility) => (
              <div key={responsibility.id} className="responsibility-item">
                <div className={`responsibility-icon ${responsibility.gradientClass}`}>
                  {responsibility.icon.endsWith('.svg') ? (
                    <img src={responsibility.icon} alt={responsibility.title} width="40" height="40" />
                  ) : (
                    responsibility.icon
                  )}
                </div>
                <div className="responsibility-text">
                  <h4>{responsibility.title}</h4>
                  <p>{responsibility.description}</p>
                </div>
              </div>
            ))}
            <a 
              href="/Osamah EL.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="employment-link"
            >
              View employment certificate
            </a>
          </div>
        </div>
      </div>

      <div className="experience-content" style={{ marginTop: '2rem' }}>
        <div className="currently-badge">CURRENTLY</div>
        <h2 className="experience-title">Project Manager & Lead Developer — Perfect Loop, Jeddah</h2>
        <p className="experience-desc">
        Leading software projects for Perfect Loop in Saudi Arabia, I manage end-to-end delivery — from planning and architecture to development and deployment. My role bridges project management and hands-on coding, ensuring scalable solutions, smooth collaboration with cross-functional teams, and on-time delivery for enterprise clients.
        </p>
        
        <div className="tech-tags-container">
          <div className="tech-tags">
            {techTags.map((tag, index) => (
              <span 
                key={index}
                className={`tech-tag ${visibleTags.has(index) ? 'visible' : ''} ${hoveredTag === index ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredTag(index)}
                onMouseLeave={() => setHoveredTag(null)}
                style={{ '--tag-delay': `${index * 0.1}s` } as React.CSSProperties}
              >
                <span className="tag-content">
                  <span className="tag-text">{tag}</span>
                  <span className="tag-glow"></span>
                  <span className="tag-particles">
                    {[...Array(4)].map((_, i) => (
                      <span key={i} className="particle" style={{ '--particle-delay': `${i * 0.1}s` } as React.CSSProperties}></span>
                    ))}
                  </span>
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .experience-desc {
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .tech-tags-container {
          position: relative;
          margin-top: 1rem;
          overflow: hidden;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          position: relative;
        }

        .tech-tag {
          position: relative;
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transition-delay: var(--tag-delay);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          border: 2px solid transparent;
          /* Ensure proper layout space is always reserved */
          min-width: fit-content;
          height: auto;
          z-index: 1;
        }

        .tech-tag.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .tech-tag::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s ease;
        }

        .tech-tag:hover::before {
          left: 100%;
        }

        .tech-tag:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
          border-color: rgba(255, 255, 255, 0.3);
          z-index: 10;
        }

        .tag-content {
          position: relative;
          z-index: 2;
          display: block;
        }

        .tag-text {
          position: relative;
          z-index: 3;
          transition: all 0.3s ease;
        }

        .tech-tag:hover .tag-text {
          transform: scale(1.05);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .tag-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          z-index: -1;
        }

        .tech-tag:hover .tag-glow {
          width: 120px;
          height: 120px;
          opacity: 1;
        }

        .tag-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
          border-radius: 50px;
          z-index: 0;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          opacity: 0;
          animation: particleFloat 2s ease-in-out infinite;
          animation-delay: var(--particle-delay);
        }

        .tech-tag:hover .particle {
          opacity: 1;
        }

        .particle:nth-child(1) { top: 20%; left: 20%; }
        .particle:nth-child(2) { top: 30%; right: 20%; }
        .particle:nth-child(3) { bottom: 30%; left: 30%; }
        .particle:nth-child(4) { bottom: 20%; right: 30%; }

        @keyframes particleFloat {
          0%, 100% { 
            transform: translateY(0) scale(0); 
            opacity: 0; 
          }
          50% { 
            transform: translateY(-15px) scale(1); 
            opacity: 1; 
          }
        }

        /* Special animations for specific tags */
        .tech-tag:nth-child(1) { background: linear-gradient(135deg, #000000 0%, #333333 100%); }
        .tech-tag:nth-child(2) { background: linear-gradient(135deg, #61dafb 0%, #21a1c4 100%); }
        .tech-tag:nth-child(3) { background: linear-gradient(135deg, #68a063 0%, #4a7c59 100%); }
        .tech-tag:nth-child(4) { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%); }
        .tech-tag:nth-child(5) { background: linear-gradient(135deg, #4db33d 0%, #3a8b2e 100%); }
        .tech-tag:nth-child(6) { background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); }
        .tech-tag:nth-child(7) { background: linear-gradient(135deg, #3178c6 0%, #2563eb 100%); }

        /* Pulse animation for currently badge */
        .currently-badge {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(102, 126, 234, 0);
          }
        }

        @media (max-width: 768px) {
          .tech-tags {
            gap: 0.75rem;
          }
          
          .tech-tag {
            padding: 0.6rem 1.2rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;



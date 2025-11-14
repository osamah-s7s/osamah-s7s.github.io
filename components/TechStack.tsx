import { techStack } from '@/data';

const TechStack = () => {
  return (
    <section id="tech-stack" className="tech-stack">
      <h2 className="section-title">
        <span className="gradient-text">Tech Stack</span>
      </h2>
      <p className="tech-subtitle">
        Technologies and tools I use to design, build, and deploy scalable applications
      </p>
      
      <div className="tech-grid">
        {techStack.map((tech) => (
          <div key={tech.id} className="tech-card">
            <div className="tech-icons">
              {tech.icons.endsWith('.svg') ? (
                <img src={tech.icons} alt={tech.name} width={48} height={48} />
              ) : (
                tech.icons
              )}
            </div>
            <div className="tech-name">{tech.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;

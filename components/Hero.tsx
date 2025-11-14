import { socialLinks } from '@/data';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>
          <span className="mern-gradient">Full-Stack</span><br />
          <span className="developer">Developer</span>
        </h1>
        <p>
        Hi, I'm <strong>Osamah Hussein</strong>, a dedicated <strong>Full-Stack & Flutter Developer</strong> based in Lahore, Pakistan. 
        I build <em>scalable, AI-driven, and bilingual web & mobile applications</em> with a focus on performance, user experience, and long-term impact.
        </p>

        <a href="#" className="cta-button">Download Resume</a>
        
        <div className="hero-social-links">
          {socialLinks.filter(link => link.icon).map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-link ${link.iconClass}`}
              aria-label={link.name}
            >
              <img src={link.icon} alt={link.name} width="32" height="32" />
            </a>
          ))}
        </div>
      </div>
      <div className="hero-image">
        <div className="profile-container">
          <div className="blob-shape"></div>
          <img 
            src="/profile.png" 
            alt="Osamah Hussein - MERN Stack Developer" 
            className="profile-pic"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

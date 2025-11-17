import { socialLinks } from '@/data';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>
          <span className="mern-gradient">Full-Stack Developer</span><br />
          <span className="developer">& AI Engineer</span>
        </h1>
        <p>
        Hi, I'm <strong>Osamah Hussein</strong>, an experienced <strong>Full-Stack Developer and AI Engineer</strong> in Lahore, Pakistan. 
        I design and deliver <em>scalable web and mobile applications</em>, combining robust backend logic with an engaging user experience. My work focuses on building reliable software that drives results, using modern technology and deep practical expertise.
        </p>

        <a href="/resume/Osamah.pdf" download="Osamah_Hussein_Resume.pdf" className="cta-button">Download Resume</a>
        
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

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-content">
        <div className="about-image">
          <img 
            src="/about me.jpg" 
            alt="Osamah Hussein in library studying and learning" 
            className="laptop-image"
          />
          <div className="developer-badge">
            <img 
              src="/osamah.png" 
              alt="Osamah Hussein - Software Engineer" 
              className="developer-logo"
            />
          </div>
        </div>
        <div className="about-text">
          <h2>About Me</h2>
          <h3>
            A passionate <span className="gradient-text">Mern Stack Developer</span> based in Lahore, Pakistan
          </h3>
          <p>
            I specialize in creating scalable, bilingual, and lead-generation web apps with clean architecture and a focus on performance. 
            My approach blends pixel-perfect UI/UX with robust backend logic — ensuring every project is not only visually appealing 
            but also optimized for speed, SEO, and long-term maintainability.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

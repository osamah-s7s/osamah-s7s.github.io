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
            <span className="gradient-text">Full-Stack Developer and AI Engineer</span> based in Lahore, Pakistan
          </h3>
          <p>
            I care about building web applications that are reliable, fast, and easy for people to use—no matter the language. 
            My approach blends thoughtful user experience with solid backend engineering, so every project I work on is designed 
            for lasting performance, security, and growth.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

import { socialLinks } from '@/data';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; 2024 Osamah Hussein Al-Aini. All rights reserved.</p>
        <div className="social-links">
          {socialLinks.map((link) => (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={link.iconClass}
              aria-label={link.name}
            >
              {link.name === 'LinkedIn' && '💼'}
              {link.name === 'GitHub' && '🐙'}
              {link.name === 'Upwork' && '💼'}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;



'use client';

import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { contactInfo, socialLinks } from '@/data';

interface FormData {
  fullname: string;
  email: string;
  location: string;
  coordinates: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    email: '',
    location: '',
    coordinates: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Create floating particles
  useEffect(() => {
    const createParticles = () => {
      const particlesContainer = document.getElementById('particles');
      if (!particlesContainer) return;

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        particlesContainer.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            coordinates: `${latitude}, ${longitude}`
          }));
          
          // Reverse geocoding to get address
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
              const address = `${data.city || ''}, ${data.principalSubdivision || ''}, ${data.countryName || ''}`.replace(/^,\s*|,\s*$/g, '');
              setFormData(prev => ({
                ...prev,
                location: address
              }));
            })
            .catch(() => {
              setFormData(prev => ({
                ...prev,
                location: `${latitude}, ${longitude}`
              }));
            });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to detect location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration - Replace these with your actual values
      const SERVICE_ID = 'service_a2h60k9'; // Replace with your EmailJS service ID
      const TEMPLATE_ID = 'template_94nm4dx'; // Replace with your EmailJS template ID
      const PUBLIC_KEY = 'iLXQQDfpvczxtlj7i'; // Replace with your EmailJS public key

      // Prepare template parameters
      const templateParams = {
        to_email: 'osamah0alini@gmail.com', // Recipient email
        from_name: formData.fullname,
        from_email: formData.email,
        location: formData.location || 'Not provided',
        coordinates: formData.coordinates || 'Not provided',
        message: formData.message,
        subject: `Portfolio Contact: Message from ${formData.fullname}`
      };

      // Send email using EmailJS
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({
        fullname: '',
        email: '',
        location: '',
        coordinates: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="floating-particles" id="particles"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      
      <div className="container">
        <div className="contact-grid">
          <div className="contact-content">
            <div className="section-badge">
              ✨ Let's Connect
            </div>
            
            <h2 className="contact-title">
              Ready to bring your
              <br />ideas to life?
            </h2>
            
            <p className="contact-subtitle">
              I'm always excited to discuss new projects and opportunities. 
              Let's create something amazing together.
            </p>
            
            <div className="contact-methods">
              {contactInfo.map((info) => (
                <div key={info.id} className="contact-method" onClick={() => {
                  if (info.label === 'Email') {
                    window.location.href = `mailto:${info.value}`;
                  } else if (info.label === 'Location') {
                    window.open(`https://maps.google.com/?q=${encodeURIComponent(info.value)}`, '_blank');
                  }
                }}>
                  <div className="method-icon">{info.icon}</div>
                  <div className="method-content">
                    <h3>{info.label}</h3>
                    <p>{info.value}</p>
                  </div>
                </div>
              ))}
              
              <div className="contact-method" onClick={() => window.open(socialLinks.find(link => link.name === 'LinkedIn')?.url || '#', '_blank')}>
                <div className="method-icon">💼</div>
                <div className="method-content">
                  <h3>LinkedIn</h3>
                  <p>Let's connect professionally</p>
                </div>
              </div>
            </div>
            
            <div className="social-links">
              {socialLinks.map((link) => (
                <a 
                  key={link.id} 
                  href={link.url} 
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name}
                >
                  {link.icon ? (
                    <img src={link.icon} alt={link.name} style={{ width: '20px', height: '20px' }} />
                  ) : (
                    link.name.charAt(0).toUpperCase()
                  )}
                </a>
              ))}
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input 
                type="text" 
                id="fullname" 
                name="fullname" 
                placeholder="John Doe" 
                value={formData.fullname}
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="john@example.com" 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  id="location" 
                  name="location" 
                  placeholder="Type address or click detect" 
                  value={formData.location}
                  onChange={handleInputChange}
                  required 
                />
                <button
                  type="button"
                  onClick={detectLocation}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: '#667eea',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    padding: '5px'
                  }}
                  title="Detect my location"
                >
                  📍
                </button>
              </div>
            </div>
            
            <input type="hidden" name="coordinates" value={formData.coordinates} />
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                placeholder="Tell me about your project..." 
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div style={{ 
                marginTop: '1rem', 
                padding: '1rem', 
                background: 'rgba(34, 197, 94, 0.1)', 
                border: '1px solid rgba(34, 197, 94, 0.3)', 
                borderRadius: '8px', 
                color: '#22c55e',
                textAlign: 'center'
              }}>
                ✅ Message sent successfully! I'll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div style={{ 
                marginTop: '1rem', 
                padding: '1rem', 
                background: 'rgba(239, 68, 68, 0.1)', 
                border: '1px solid rgba(239, 68, 68, 0.3)', 
                borderRadius: '8px', 
                color: '#ef4444',
                textAlign: 'center'
              }}>
                ❌ Failed to send message. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;



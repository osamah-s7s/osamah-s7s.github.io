'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle, MapPin, Mail, Phone, Linkedin, Github, MapPin as MapPinIcon } from 'lucide-react';
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
  
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Color scheme
  const colors = {
    primary: '#667eea',
    secondary: '#764ba2',
    border: '#667eea',
    borderError: '#ef4444',
    bg: 'rgba(102, 126, 234, 0.05)',
    hover: 'rgba(102, 126, 234, 0.1)'
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Name is required';
    } else if (formData.fullname.trim().length < 2) {
      newErrors.fullname = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
          setErrors(prev => ({ ...prev, location: 'Unable to detect location. Please enter manually.' }));
        }
      );
    } else {
      setErrors(prev => ({ ...prev, location: 'Geolocation is not supported by this browser.' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmissionStatus('idle');

    try {
      const SERVICE_ID = 'service_a2h60k9';
      const TEMPLATE_ID = 'template_94nm4dx';
      const PUBLIC_KEY = 'iLXQQDfpvczxtlj7i';

      const templateParams = {
        to_email: 'osamah0alini@gmail.com',
        from_name: formData.fullname,
        from_email: formData.email,
        location: formData.location || 'Not provided',
        coordinates: formData.coordinates || 'Not provided',
        message: formData.message,
        subject: `Portfolio Contact: Message from ${formData.fullname}`
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      setSubmissionStatus('success');
      setFormData({
        fullname: '',
        email: '',
        location: '',
        coordinates: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input base styles
  const getInputBaseStyle = () => ({
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 'clamp(0.375rem, 1vw, 0.5rem)',
    padding: 'clamp(0.75rem, 2vw, 0.875rem) clamp(0.875rem, 2.5vw, 1rem)',
    fontSize: 'clamp(0.9375rem, 2.5vw, 1rem)',
    color: '#111827',
    border: '1px solid #d1d5db',
    transition: 'all 0.2s ease',
    outline: 'none',
    fontFamily: 'inherit'
  });

  const getInputStyle = (field: string) => ({
    ...getInputBaseStyle(),
    borderColor: errors[field] 
      ? colors.borderError 
      : focusedField === field 
        ? colors.primary 
        : '#d1d5db',
    boxShadow: focusedField === field 
      ? `0 0 0 3px ${colors.primary}15` 
      : errors[field]
        ? `0 0 0 3px ${colors.borderError}15`
        : 'none'
  });

  return (
    <section id="contact" className="contact-section" style={{ 
      padding: 'clamp(2rem, 5vw, 4rem) 0', 
      background: 'linear-gradient(to bottom, #f9fafb, #ffffff)' 
    }}>
      <div className="container" style={{ 
        maxWidth: 'min(1200px, 95vw)', 
        margin: '0 auto', 
        padding: '0 clamp(1rem, 3vw, 1.5rem)' 
      }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          style={{
            display: 'inline-block',
            marginBottom: 'clamp(0.5rem, 2vw, 1rem)',
            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 600,
            color: colors.primary
          }}
          >
            ✨ Let's Connect
          </motion.span>
          
          <h2 style={{
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            fontWeight: 'bold',
            marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
            color: '#1f2937',
            lineHeight: '1.2'
          }}>
            Ready to bring your
            <br />ideas to life?
          </h2>
          
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
            color: '#6b7280',
            maxWidth: 'min(600px, 90vw)',
            margin: '0 auto'
          }}>
            I'm always excited to discuss new projects and opportunities. 
            Let's create something amazing together.
          </p>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', 
          gap: 'clamp(1.5rem, 4vw, 2rem)', 
          alignItems: 'start' 
        }}>
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              borderRadius: 'clamp(1rem, 3vw, 1.5rem)',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Background Effects */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '256px',
                  height: '256px',
                  background: 'white',
                  borderRadius: '50%',
                  filter: 'blur(60px)'
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </div>

            <div style={{ position: 'relative', zIndex: 10 }}>
              <h3 style={{ 
                fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)', 
                fontWeight: 'bold', 
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)' 
              }}>
                Get in Touch
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {contactInfo.map((info) => (
                  <motion.div
                    key={info.id}
                    whileHover={{ x: 5 }}
                    style={{
                      display: 'flex',
                      alignItems: 'start',
                      padding: '1rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.75rem',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onClick={() => {
                      if (info.label === 'Email') {
                        window.location.href = `mailto:${info.value}`;
                      } else if (info.label === 'Location') {
                        window.open(`https://maps.google.com/?q=${encodeURIComponent(info.value)}`, '_blank');
                      }
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem',
                      flexShrink: 0
                    }}>
                      {info.label === 'Email' ? <Mail size={18} /> :
                       info.label === 'Location' ? <MapPinIcon size={18} /> :
                       <Phone size={18} />}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                        {info.label}
                      </h4>
                      <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                        {info.value}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Social Links */}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        textDecoration: 'none',
                        color: 'white'
                      }}
                      title={link.name}
                    >
                      {link.name === 'LinkedIn' ? <Linkedin size={18} /> :
                       link.name === 'GitHub' ? <Github size={18} /> :
                       link.name.charAt(0).toUpperCase()}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              background: 'white',
              borderRadius: 'clamp(1rem, 3vw, 1.5rem)',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}
          >
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
              fontWeight: 'bold',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
              color: colors.primary
            }}>
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 'clamp(1rem, 3vw, 1.5rem)' 
            }}>
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  onFocus={() => handleFocus('fullname')}
                  onBlur={handleBlur}
                  placeholder="Full Name"
                  style={getInputStyle('fullname')}
                />
                <AnimatePresence>
                  {errors.fullname && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{ 
                      marginTop: 'clamp(0.375rem, 1vw, 0.5rem)', 
                      fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)', 
                      color: colors.borderError 
                    }}
                    >
                      {errors.fullname}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  placeholder="Email Address"
                  style={getInputStyle('email')}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{ 
                      marginTop: 'clamp(0.375rem, 1vw, 0.5rem)', 
                      fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)', 
                      color: colors.borderError 
                    }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Location */}
              <div>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    onFocus={() => handleFocus('location')}
                    onBlur={handleBlur}
                    placeholder="Location"
                    style={{ 
                      ...getInputStyle('location'), 
                      paddingRight: 'clamp(2.5rem, 7vw, 3.5rem)' 
                    }}
                  />
                  <button
                    type="button"
                    onClick={detectLocation}
                    style={{
                      position: 'absolute',
                      right: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      color: colors.primary,
                      cursor: 'pointer',
                      padding: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                    }}
                    title="Detect my location"
                  >
                    <MapPin size={20} />
                  </button>
                </div>
                <AnimatePresence>
                  {errors.location && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{ 
                      marginTop: 'clamp(0.375rem, 1vw, 0.5rem)', 
                      fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)', 
                      color: colors.borderError 
                    }}
                    >
                      {errors.location}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message */}
              <div>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  placeholder="Message"
                  style={{ 
                    ...getInputStyle('message'), 
                    resize: 'none', 
                    minHeight: 'clamp(100px, 25vw, 120px)', 
                    paddingTop: 'clamp(0.75rem, 2vw, 0.875rem)' 
                  }}
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{ 
                      marginTop: 'clamp(0.375rem, 1vw, 0.5rem)', 
                      fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)', 
                      color: colors.borderError 
                    }}
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: 'clamp(0.75rem, 2vw, 0.875rem) clamp(1.25rem, 3.5vw, 1.5rem)',
                  borderRadius: 'clamp(0.375rem, 1vw, 0.5rem)',
                  background: colors.primary,
                  color: 'white',
                  fontSize: 'clamp(0.9375rem, 2.5vw, 1rem)',
                  fontWeight: 600,
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'clamp(0.375rem, 1vw, 0.5rem)',
                  opacity: isSubmitting ? 0.7 : 1,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s'
                }}
                whileHover={isSubmitting ? {} : { scale: 1.02 }}
                whileTap={isSubmitting ? {} : { scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              <AnimatePresence>
                {submissionStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      background: '#f0fdf4',
                      border: '1px solid #86efac',
                      color: '#16a34a',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <CheckCircle2 size={20} />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}
                {submissionStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      background: '#fef2f2',
                      border: '1px solid #fca5a5',
                      color: '#dc2626',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <AlertCircle size={20} />
                    <div>
                      <span>Failed to send message.</span>
                      <span style={{ display: 'block', fontSize: '0.875rem', opacity: 0.8, marginTop: '0.25rem' }}>
                        Please try again.
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Contact;

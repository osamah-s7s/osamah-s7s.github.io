'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaLinkedin, FaEnvelope, FaTwitter, FaYoutube } from 'react-icons/fa'
import { useTranslation } from '@/hooks/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'

const Hero = () => {
  const t = useTranslation()
  const { isArabic, toggleLanguage } = useLanguage()
  const [currentEduIndex, setCurrentEduIndex] = useState(0)
  const eduControls = useAnimationControls()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState([])

  const education = t.hero.education || []
  // Rotation interval (ms) for the education rotator. Change this value to slow/fasten.
  const ROTATION_INTERVAL_MS = 6000

  // Handle language toggle event
  useEffect(() => {
    const handleToggle = () => toggleLanguage()
    window.addEventListener('toggleLanguage', handleToggle)
    return () => window.removeEventListener('toggleLanguage', handleToggle)
  }, [toggleLanguage])

  // Cycle through education items
  useEffect(() => {
    if (education.length === 0) return

    const cycle = async () => {
      await eduControls.start({ opacity: 0, y: -20, transition: { duration: 0.3 } })
      setCurrentEduIndex((prev) => (prev + 1) % education.length)
      await eduControls.start({ opacity: 1, y: 0, transition: { duration: 0.4 } })
    }

    const interval = setInterval(cycle, ROTATION_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [education.length, eduControls])

  // Track mouse position and create particle trail
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Create particle with random offset
      const particle = {
        id: Date.now() + Math.random(),
        x: e.clientX + (Math.random() - 0.5) * 20,
        y: e.clientY + (Math.random() - 0.5) * 20,
        size: Math.random() * 6 + 4,
      }
      
      setParticles((prev) => [...prev.slice(-15), particle])
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Clean up old particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => prev.slice(-10))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const socialLinks = [
    { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: 'hover:text-[#0A66C2]' },
    { icon: FaEnvelope, href: 'mailto:contact@example.com', label: 'Email', color: 'hover:text-main' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:text-[#1DA1F2]' },
    { icon: FaYoutube, href: '#', label: 'YouTube', color: 'hover:text-[#FF0000]' },
  ]

  return (
    <section className='relative min-h-screen flex items-center overflow-hidden bg-background py-20 lg:py-0'>
      {/* Language Toggle Button */}
      <motion.button
        onClick={() => window.dispatchEvent(new CustomEvent('toggleLanguage'))}
        className={`fixed bottom-4 ${isArabic ? 'left-1' : 'right-1'} z-50 group`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glowing Background */}
        <div className='absolute inset-0 bg-gradient-to-br from-main via-main/80 to-main/60 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300' />
        
        {/* Main Button */}
        <div className='relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-main/90 to-main/70 backdrop-blur-sm border-2 border-background/20 shadow-xl flex items-center justify-center overflow-hidden'>
          {/* Animated Background Pattern */}
          <motion.div
            className='absolute inset-0 opacity-10'
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-background) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Language Text */}
          <span className='relative text-background font-bold text-base sm:text-lg tracking-wider z-10'>
            {isArabic ? 'EN' : 'ع'}
          </span>
        </div>
      </motion.button>

      {/* Interactive Background Effect */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {/* Particle Trail */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className='absolute rounded-full bg-main'
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
            }}
            initial={{ opacity: 0.6, scale: 0 }}
            animate={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ))}
        
        {/* Cursor Glow */}
        <div 
          className='absolute w-[600px] h-[600px] rounded-full opacity-10 blur-3xl bg-main transition-all duration-700 ease-out'
          style={{
            left: `${mousePosition.x - 300}px`,
            top: `${mousePosition.y - 300}px`,
          }}
        />
        <div className='absolute inset-0 opacity-5'>
          <div className='absolute inset-0' style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-main) 0.5px, transparent 0)',
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className='container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10'>
        <div className='flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center'>
          
          {/* Image Section - First on mobile, always right on desktop */}
          <motion.div
            className='w-full order-1 lg:order-2 max-w-[200px] sm:max-w-xs md:max-w-sm lg:max-w-sm mx-auto'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Decorative Background Elements */}
            <div className='absolute inset-0 -z-10'>
              <div className='absolute top-10 right-10 w-72 h-72 bg-main/10 rounded-full blur-3xl' />
              <div className='absolute bottom-10 left-10 w-60 h-60 bg-sub/10 rounded-full blur-2xl' />
            </div>

            {/* Image Container with Glassmorphism */}
            <motion.div 
              className='relative group w-full'
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              {/* Glowing Border */}
              <div className='absolute inset-0 bg-gradient-to-br from-main via-main/50 to-transparent opacity-20 rounded-full blur-xl group-hover:opacity-40 transition-opacity duration-500' />
              
              {/* Main Image Frame - Oval Shape */}
              <div className='relative backdrop-blur-sm bg-subtle-background/30 rounded-full p-3 border-2 border-main/20 shadow-2xl overflow-hidden'>
                {/* Geometric Pattern Overlay */}
                <div className='absolute inset-0 opacity-5' style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-main) 1px, transparent 0)`,
                  backgroundSize: '30px 30px'
                }} />
                
                {/* Image - Oval/Ellipse Shape */}
                <div className='relative aspect-[3/4] rounded-full overflow-hidden bg-gradient-to-br from-subtle-background to-background'>
                  <img
                    src='/Osamah.jpg'
                    alt={t.hero.name}
                    className='w-full h-full object-cover'
                  />
                  
                  {/* Overlay Gradient */}
                  <div className='absolute inset-0 bg-gradient-to-t from-heading/20 via-transparent to-transparent' />
                </div>
              </div>

              {/* Floating Accent Elements */}
              <motion.div
                className='absolute -top-6 -right-6 w-24 h-24 bg-main/20 rounded-full blur-2xl'
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className='absolute -bottom-6 -left-6 w-32 h-32 bg-sub/20 rounded-full blur-2xl'
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
            </motion.div>
          </motion.div>
          
          {/* Content Section - Second on mobile, always left on desktop */}
          <motion.div 
            className='w-full order-2 lg:order-1 space-y-6 md:space-y-8'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className='flex gap-4 md:gap-8 items-start'>
              {/* Social Media Vertical Timeline */}
              <motion.div 
                className='hidden sm:flex flex-col items-center gap-3 md:gap-4'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {/* Top Dot */}
                <div className='w-3 h-3 md:w-4 md:h-4 rounded-full bg-main shadow-lg shadow-main/50' />
                
                {/* Vertical Line */}
                <div className='w-0.5 h-16 md:h-24 bg-gradient-to-b from-main to-transparent opacity-50' />
                
                {/* Social Icons */}
                <div className='flex flex-col gap-3 md:gap-4'>
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={`text-sub ${social.color} transition-all duration-300`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.2, y: -2 }}
                      aria-label={social.label}
                    >
                      <social.icon size={20} className='md:w-6 md:h-6' />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Main Content */}
              <div className='flex-1 space-y-4 md:space-y-6'>
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <p className='text-sub text-xs sm:text-sm md:text-base mb-2 tracking-wide'>
                    {t.hero.greeting}
                  </p>
                  <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-heading leading-tight ${
                    isArabic ? 'font-arabic' : 'font-sans'
                  }`}>
                    <span className='text-main'>{isArabic ? 'أ. م.' : 'Engr.'}</span> {t.hero.name}
                  </h1>
                </motion.div>

                {/* Dynamic Education Rotator */}
                <div className='min-h-[60px] md:min-h-[80px] flex items-center'>
                  {education.length > 0 && (
                    <motion.div
                      animate={eduControls}
                      initial={{ opacity: 1, y: 0 }}
                      className='space-y-2'
                    >
                      <p className={`text-base sm:text-lg md:text-xl text-sub leading-relaxed ${
                        isArabic ? 'font-arabic' : 'font-sans'
                      }`}>
                        {education[currentEduIndex].prefix}{' '}
                        <span className='text-main font-semibold'>
                          {education[currentEduIndex].degree}
                        </span>
                        {' '}{education[currentEduIndex].field && `${education[currentEduIndex].field}`}
                      </p>
                      <p className='text-xs sm:text-sm text-sub/70'>
                        {education[currentEduIndex].university} • {education[currentEduIndex].years}
                      </p>
                      
                      {/* Progress Indicator */}
                      <div className='flex gap-1.5 pt-2'>
                        {education.map((_, index) => (
                          <div
                            key={index}
                            className={`h-1 rounded-full transition-all duration-300 ${
                              index === currentEduIndex 
                                ? 'w-8 bg-main' 
                                : 'w-1 bg-sub/30'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Download CV Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <a
                    href='/My%20CV.pdf'
                    download
                    className='inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-main to-main/90 text-background font-semibold text-sm md:text-base rounded-lg shadow-lg shadow-main/30 hover:shadow-xl hover:shadow-main/40 hover:-translate-y-0.5 transition-all duration-300'
                  >
                    <svg className='w-4 h-4 md:w-5 md:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                    </svg>
                    {t.hero.downloadCV}
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Hero

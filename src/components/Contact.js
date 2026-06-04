'use client'

import { useRef, useLayoutEffect, useState, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '@/hooks/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  IoMailOutline, 
  IoLocationOutline, 
  IoLogoLinkedin,
  IoCheckmarkCircleOutline,
  IoSendOutline
} from 'react-icons/io5'

// Check for reduced motion preference
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}

// Check for touch device
const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  return isTouch
}

// Underlined Input Component with focus animation
const UnderlinedInput = ({ 
  type = 'text', 
  name, 
  placeholder, 
  value, 
  onChange, 
  isArabic,
  isTextarea = false,
  required = false
}) => {
  const inputRef = useRef(null)
  const underlineRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
    gsap.to(underlineRef.current, {
      scaleX: 1,
      duration: 0.4,
      ease: 'power2.out',
      transformOrigin: isArabic ? 'right' : 'left'
    })
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (!value) {
      gsap.to(underlineRef.current, {
        scaleX: 0,
        duration: 0.3,
        ease: 'power2.in',
        transformOrigin: isArabic ? 'right' : 'left'
      })
    }
  }

  const baseClasses = `
    w-full bg-transparent border-0 border-b border-sub/30
    py-3 px-0 text-heading placeholder-heading/40
    focus:outline-none focus:border-transparent
    transition-colors duration-300
    ${isArabic ? 'font-arabic text-right' : 'font-sans text-left'}
  `

  return (
    <div className="relative mb-6 sm:mb-8">
      {isTextarea ? (
        <textarea
          ref={inputRef}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          rows={4}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          ref={inputRef}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className={baseClasses}
        />
      )}
      {/* Animated underline */}
      <div 
        ref={underlineRef}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-main"
        style={{ 
          transform: 'scaleX(0)',
          transformOrigin: isArabic ? 'right' : 'left'
        }}
      />
    </div>
  )
}

// Magnetic Button Component
const MagneticButton = ({ 
  children, 
  onClick, 
  disabled, 
  isLoading, 
  isSuccess,
  isArabic,
  prefersReducedMotion,
  isTouch
}) => {
  const buttonRef = useRef(null)
  const xTo = useRef(null)
  const yTo = useRef(null)

  useEffect(() => {
    if (!buttonRef.current || prefersReducedMotion || isTouch) return

    // Initialize GSAP quickTo for smooth magnetic effect
    xTo.current = gsap.quickTo(buttonRef.current, 'x', { duration: 0.3, ease: 'power3.out' })
    yTo.current = gsap.quickTo(buttonRef.current, 'y', { duration: 0.3, ease: 'power3.out' })

    return () => {
      gsap.set(buttonRef.current, { x: 0, y: 0 })
    }
  }, [prefersReducedMotion, isTouch])

  const handleMouseMove = useCallback((e) => {
    if (prefersReducedMotion || isTouch || !xTo.current || !yTo.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * 0.2
    const deltaY = (e.clientY - centerY) * 0.2

    xTo.current(deltaX)
    yTo.current(deltaY)
  }, [prefersReducedMotion, isTouch])

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion || isTouch || !xTo.current || !yTo.current) return
    xTo.current(0)
    yTo.current(0)
  }, [prefersReducedMotion, isTouch])

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled || isLoading || isSuccess}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        relative px-8 py-3 rounded-full
        border-2 border-main text-main
        font-medium text-sm sm:text-base
        transition-all duration-300 ease-out
        hover:bg-main hover:text-background
        focus:outline-none focus:ring-2 focus:ring-main/50 focus:ring-offset-2 focus:ring-offset-background
        disabled:opacity-50 disabled:cursor-not-allowed
        will-change-transform
        ${isArabic ? 'font-arabic' : 'font-sans'}
        ${isSuccess ? 'bg-main text-background' : ''}
      `}
      style={{ transform: 'translate3d(0, 0, 0)' }}
    >
      <span className={`inline-flex items-center gap-2 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {isSuccess ? (
          <>
            <IoCheckmarkCircleOutline className="w-5 h-5" />
            {isArabic ? 'تم الإرسال' : 'Message Sent'}
          </>
        ) : (
          <>
            {children}
            <IoSendOutline className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
          </>
        )}
      </span>
      
      {/* Loading spinner */}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-5 h-5 border-2 border-main border-t-transparent rounded-full animate-spin" />
        </span>
      )}
    </button>
  )
}

// Contact Info Item
const ContactInfoItem = ({ icon: Icon, label, value, href, isArabic }) => {
  const content = (
    <div className={`flex items-center gap-3 py-2 group ${isArabic ? 'flex-row-reverse' : ''}`}>
      <Icon className="w-5 h-5 text-main flex-shrink-0" />
      <span className={`text-heading/70 text-sm transition-colors duration-300 group-hover:text-heading ${isArabic ? 'font-arabic' : 'font-sans'}`}>
        {value}
      </span>
    </div>
  )

  if (href) {
    return (
      <a 
        href={href} 
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="block"
      >
        {content}
      </a>
    )
  }

  return content
}

const Contact = () => {
  const t = useTranslation()
  const { isArabic } = useLanguage()
  const prefersReducedMotion = useReducedMotion()
  const isTouch = useIsTouchDevice()

  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const formRef = useRef(null)
  const dividerRef = useRef(null)
  const infoRef = useRef(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Get contact data from translations
  const contact = t.contact || {}

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSuccess(true)

    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  // GSAP Animations
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animation distance based on screen size and motion preference
      const slideDistance = prefersReducedMotion ? 0 : window.innerWidth < 640 ? 30 : 60

      // Text content slides in from left
      gsap.fromTo(textRef.current,
        { 
          x: isArabic ? slideDistance : -slideDistance, 
          opacity: 0 
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true
          }
        }
      )

      // Form slides in from right
      gsap.fromTo(formRef.current,
        { 
          x: isArabic ? -slideDistance : slideDistance, 
          opacity: 0 
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true
          }
        }
      )

      // Divider fades in
      gsap.fromTo(dividerRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true
          }
        }
      )

      // Contact info fades in from bottom
      gsap.fromTo(infoRef.current,
        { y: prefersReducedMotion ? 0 : 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [isArabic, prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 bg-background overflow-hidden"
      dir={isArabic ? 'rtl' : 'ltr'}
      aria-label={contact.title}
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-subtle-background/30 via-background to-background" />

      <div className="relative max-w-6xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid gap-12 md:gap-16 lg:gap-24 grid-cols-1 md:grid-cols-2 items-start">
          
          {/* Left Side - Invitation Text */}
          <div 
            ref={textRef}
            className="will-change-transform"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          >
            {/* Section Label */}
            <span className={`text-main text-sm sm:text-base font-medium tracking-wide uppercase mb-4 block ${isArabic ? 'font-arabic' : 'font-sans'}`}>
              {contact.label || (isArabic ? 'تواصل' : 'Get in Touch')}
            </span>

            {/* Main Heading */}
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-heading mb-6 sm:mb-8 leading-tight ${isArabic ? 'font-arabic' : 'font-sans'}`}>
              {contact.title}
            </h2>

            {/* Invitation Message */}
            <p className={`text-heading/70 text-base sm:text-lg md:text-xl leading-relaxed max-w-md ${isArabic ? 'font-arabic' : 'font-sans'}`}>
              {contact.message}
            </p>

            {/* Decorative Element */}
            <div className={`mt-8 sm:mt-12 flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-px bg-main" />
              <span className={`text-sub text-sm italic ${isArabic ? 'font-arabic' : 'font-sans'}`}>
                {contact.tagline || (isArabic ? 'أتطلع للتواصل معك' : "Let's create something great")}
              </span>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div 
            ref={formRef}
            className="will-change-transform"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          >
            <form onSubmit={handleSubmit} className="space-y-2">
              <UnderlinedInput
                type="text"
                name="name"
                placeholder={contact.form?.name || (isArabic ? 'الاسم' : 'Your Name')}
                value={formData.name}
                onChange={handleChange}
                isArabic={isArabic}
                required
              />

              <UnderlinedInput
                type="email"
                name="email"
                placeholder={contact.form?.email || (isArabic ? 'البريد الإلكتروني' : 'Your Email')}
                value={formData.email}
                onChange={handleChange}
                isArabic={isArabic}
                required
              />

              <UnderlinedInput
                name="message"
                placeholder={contact.form?.message || (isArabic ? 'رسالتك' : 'Your Message')}
                value={formData.message}
                onChange={handleChange}
                isArabic={isArabic}
                isTextarea
                required
              />

              <div className={`pt-4 ${isArabic ? 'text-right' : 'text-left'}`}>
                <MagneticButton
                  onClick={() => {}}
                  disabled={!formData.name || !formData.email || !formData.message}
                  isLoading={isLoading}
                  isSuccess={isSuccess}
                  isArabic={isArabic}
                  prefersReducedMotion={prefersReducedMotion}
                  isTouch={isTouch}
                >
                  {contact.form?.submit || (isArabic ? 'إرسال' : 'Send Message')}
                </MagneticButton>
              </div>
            </form>
          </div>
        </div>

        {/* Thin Divider */}
        <div 
          ref={dividerRef}
          className="my-16 sm:my-20 h-px bg-linear-to-r from-transparent via-sub/20 to-transparent will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        />

        {/* Contact Info Footer */}
        <div 
          ref={infoRef}
          className={`flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16 will-change-transform ${isArabic ? 'flex-row-reverse' : ''}`}
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <ContactInfoItem
            icon={IoMailOutline}
            label="Email"
            value={contact.info?.email || 'contact@example.com'}
            href={`mailto:${contact.info?.email || 'contact@example.com'}`}
            isArabic={isArabic}
          />

          <ContactInfoItem
            icon={IoLocationOutline}
            label="Location"
            value={contact.info?.location || (isArabic ? 'الموقع' : 'Location')}
            isArabic={isArabic}
          />

          <ContactInfoItem
            icon={IoLogoLinkedin}
            label="LinkedIn"
            value={contact.info?.linkedin || 'LinkedIn'}
            href={contact.info?.linkedinUrl || 'https://linkedin.com'}
            isArabic={isArabic}
          />
        </div>

        {/* Footer Note */}
        <div className="mt-16 sm:mt-20 text-center">
          <p className={`text-sub text-xs sm:text-sm ${isArabic ? 'font-arabic' : 'font-sans'}`}>
            © {new Date().getFullYear()} {isArabic ? 'أ. م. اسامه حسين العيني' : 'Engr. Osamah Hussein Alaini'}. {contact.footer || (isArabic ? 'جميع الحقوق محفوظة' : 'All rights reserved.')}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Contact

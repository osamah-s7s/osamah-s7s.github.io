'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import IslamicStar from './IslamicStar'

const AnimatedText = ({ text, delay = 0, className = '', language }) => {
  const letters = text.split('')
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  }

  return (
    <motion.span
      key={`${language}-${text}`}
      className={className}
      variants={container}
      initial='hidden'
      animate='visible'
    >
      {letters.map((letter, index) => (
        <motion.span key={`${index}-${letter}`} variants={child}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  )
}

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [showText, setShowText] = useState(false)
  const { isArabic, language, toggleLanguage } = useLanguage()

  useEffect(() => {
    // Prevent body scrolling while loading screen is visible
    document.body.classList.add('no-scrollbar', 'overflow-hidden')
    
    // Show text after a short delay
    const textTimer = setTimeout(() => {
      setShowText(true)
    }, 600)

    // Simulate minimum loading time for elegance
    const timer = setTimeout(() => {
      setIsFadingOut(true)
      // Re-enable scrollbar immediately when fade-out starts
      document.body.classList.remove('no-scrollbar', 'overflow-hidden')
      setTimeout(() => {
        setIsVisible(false)
        if (onLoadingComplete) onLoadingComplete()
      }, 800) // Fade out duration
    }, 4000) // Show for at least 2.5 seconds

    return () => {
      // Cleanup: ensure classes are removed if component unmounts early
      document.body.classList.remove('no-scrollbar', 'overflow-hidden')
      clearTimeout(textTimer)
      clearTimeout(timer)
    }
  }, [onLoadingComplete])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center bg-background transition-opacity duration-800 overflow-hidden no-scrollbar ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Language Toggle Button */}
      <motion.button
        onClick={toggleLanguage}
        className='fixed top-6 right-6 z-110 flex items-center gap-2 px-4 py-2 bg-subtle-background hover:bg-main hover:text-background rounded-lg border border-main transition-all duration-300 shadow-md'
        aria-label='Toggle Language'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <span className={`font-sans text-sm font-medium ${isArabic ? 'font-arabic' : ''}`}>
          {language === 'en' ? 'العربية' : 'English'}
        </span>
        <svg 
          className='w-5 h-5' 
          fill='none' 
          stroke='currentColor' 
          viewBox='0 0 24 24'
        >
          <path 
            strokeLinecap='round' 
            strokeLinejoin='round' 
            strokeWidth={2} 
            d='M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' 
          />
        </svg>
      </motion.button>

      {/* Subtle background pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute inset-0' style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-main) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Main loading animation container */}
      <div className='relative flex items-center justify-center'>
        {/* Outer rotating ring with gradient */}
        <div className='absolute animate-spin-slow'>
          <svg width='200' height='200' viewBox='0 0 200 200' className='drop-shadow-2xl'>
            <defs>
              <linearGradient id='ringGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop offset='0%' stopColor='var(--color-main)' stopOpacity='0.8' />
                <stop offset='50%' stopColor='var(--color-main)' stopOpacity='0.95' />
                <stop offset='100%' stopColor='var(--color-main)' stopOpacity='0.8' />
              </linearGradient>
              <filter id='glow'>
                <feGaussianBlur stdDeviation='4' result='coloredBlur'/>
                <feMerge>
                  <feMergeNode in='coloredBlur'/>
                  <feMergeNode in='SourceGraphic'/>
                </feMerge>
              </filter>
            </defs>
            {/* Outer ring */}
            <circle
              cx='100'
              cy='100'
              r='85'
              fill='none'
              stroke='url(#ringGradient)'
              strokeWidth='2.5'
              strokeDasharray='15 8'
              filter='url(#glow)'
              opacity='0.7'
            />
            {/* Middle ring */}
            <circle
              cx='100'
              cy='100'
              r='78'
              fill='none'
              stroke='var(--color-main)'
              strokeWidth='1.5'
              opacity='0.4'
            />
          </svg>
        </div>

        {/* Counter-rotating decorative ring */}
        <div className='absolute animate-spin-reverse'>
          <svg width='170' height='170' viewBox='0 0 170 170'>
            <circle
              cx='85'
              cy='85'
              r='65'
              fill='none'
              stroke='var(--color-sub)'
              strokeWidth='1'
              strokeDasharray='5 15'
              opacity='0.3'
            />
          </svg>
        </div>

        {/* Pulsating eight-pointed star */}
        <div className='relative z-10 animate-pulse-gentle'>
          <div className='absolute inset-0 blur-xl bg-main opacity-30 rounded-full scale-75' />
          <IslamicStar 
            size={110} 
            className='text-main drop-shadow-2xl filter brightness-110 relative z-10'
          />
        </div>

        {/* Subtle orbiting particles */}
        <div className='absolute animate-spin-slower'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-24'>
            <div className='w-1.5 h-1.5 rounded-full bg-main opacity-60 animate-ping-slow' />
          </div>
          <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-24'>
            <div className='w-1.5 h-1.5 rounded-full bg-main opacity-60 animate-ping-slow' style={{ animationDelay: '1s' }} />
          </div>
          <div className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-24'>
            <div className='w-1.5 h-1.5 rounded-full bg-main opacity-60 animate-ping-slow' style={{ animationDelay: '0.5s' }} />
          </div>
          <div className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-24'>
            <div className='w-1.5 h-1.5 rounded-full bg-main opacity-60 animate-ping-slow' style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </div>

      {/* Welcome text with elegant letter-by-letter animation */}
      <motion.div 
        className='absolute bottom-24 left-0 right-0 text-center px-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className={`${isArabic ? 'font-arabic' : 'font-sans'}`}>
          <p className='text-sub text-sm md:text-base mb-3 tracking-wide'>
            <AnimatedText 
              text={isArabic ? 'مرحباً بكم في ملفي التعريفي' : 'Welcome to the Portfolio of'} 
              delay={0.6}
              language={language}
            />
          </p>
          <h2 className='text-heading text-xl md:text-3xl font-bold mb-1'>
            <AnimatedText 
              text={isArabic ? 'أ. م. اسامه حسين العيني' : 'Engr. Osamah Hussein Alaini'} 
              delay={1.2}
              language={language}
            />
          </h2>
          <motion.div 
            className='flex items-center justify-center gap-2 mt-4'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, duration: 0.5 }}
          >
            <div className='h-px w-12 bg-linear-to-r from-transparent via-main to-transparent'></div>
            <div className='w-1.5 h-1.5 rounded-full bg-main animate-pulse'></div>
            <div className='h-px w-12 bg-linear-to-r from-transparent via-main to-transparent'></div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default LoadingScreen

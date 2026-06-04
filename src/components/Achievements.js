'use client'

import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '@/hooks/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  IoSchoolOutline, 
  IoTrophyOutline, 
  IoFootballOutline,
  IoRibbonOutline,
  IoMedalOutline,
  IoStarOutline
} from 'react-icons/io5'

// Counting Number Animation Component
const CountingNumber = ({ target, className, duration = 2, delay = 0 }) => {
  const numberRef = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useLayoutEffect(() => {
    if (!numberRef.current || hasAnimated) return

    gsap.registerPlugin(ScrollTrigger)

    const element = numberRef.current
    const numberObject = { value: 0 }

    // Set initial value to 0
    element.textContent = '0'

    const animation = gsap.to(numberObject, {
      value: target,
      duration: duration,
      delay: delay,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = Math.floor(numberObject.value)
      },
      onComplete: () => {
        element.textContent = target
        setHasAnimated(true)
      },
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
        onEnter: () => {
          // Animation will start automatically
        }
      }
    })

    return () => {
      animation.kill()
    }
  }, [target, duration, delay, hasAnimated])

  return (
    <span ref={numberRef} className={className}>
      0
    </span>
  )
}

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

// Category icons mapping
const categoryIcons = {
  0: IoSchoolOutline,    // Educational
  1: IoTrophyOutline,    // Professional
  2: IoFootballOutline,  // Sports
}

// Achievement Card Component
const AchievementCard = ({ achievement, index, isArabic, cardRef }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      ref={cardRef}
      className="group relative"
      style={{ opacity: 0, transform: 'translateY(30px)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card */}
      <div className={`
        relative p-4 sm:p-5 rounded-xl
        bg-linear-to-br from-background/10 via-background/5 to-transparent
        border border-main/10 hover:border-main/30
        backdrop-blur-sm
        transition-all duration-500 ease-out
        hover:shadow-lg hover:shadow-main/10
        ${isArabic ? 'text-right' : 'text-left'}
      `}>
        {/* Glow effect on hover */}
        <div className={`
          absolute inset-0 rounded-xl bg-main/5 
          transition-opacity duration-500
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `} />

        {/* Number indicator */}
        <div className={`
          absolute top-3 ${isArabic ? 'left-3' : 'right-3'}
          w-6 h-6 rounded-full
          bg-main/10 flex items-center justify-center
          text-main/50 text-xs font-bold
        `}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Title */}
          <h4 className={`
            text-sm sm:text-base font-bold text-background mb-2 pr-8
            group-hover:text-main transition-colors duration-300
            ${isArabic ? 'font-arabic pl-8 pr-0' : 'font-sans'}
          `}>
            {achievement.title}
          </h4>

          {/* Description */}
          <p className={`
            text-xs sm:text-sm text-background/60 leading-relaxed
            ${isArabic ? 'font-arabic' : 'font-sans'}
          `}>
            {achievement.description}
          </p>
        </div>

        {/* Bottom accent line */}
        <div className={`
          absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl
          bg-linear-to-r from-transparent via-main/30 to-transparent
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `} />
      </div>
    </div>
  )
}

// Category Column Component
const CategoryColumn = ({ 
  category, 
  categoryIndex,
  columnRef,
  isArabic 
}) => {
  const cardRefs = useRef([])
  const IconComponent = categoryIcons[categoryIndex] || IoStarOutline

  return (
    <div 
      ref={columnRef}
      className="relative"
      style={{ opacity: 0 }}
    >
      {/* Category Header */}
      <div className="text-center mb-8 sm:mb-10">
        {/* Icon Circle */}
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4 rounded-full bg-main/10 border border-main/20">
          <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-main" />
        </div>
        
        {/* Category Name */}
        <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold text-background mb-2 ${isArabic ? 'font-arabic' : 'font-sans'}`}>
          {category.name}
        </h3>
        
        {/* Decorative line */}
        <div className="w-16 h-0.5 bg-linear-to-r from-transparent via-main to-transparent mx-auto" />
      </div>

      {/* Vertical connecting line */}
      <div className="absolute left-1/2 top-32 bottom-0 w-px bg-linear-to-b from-main/30 via-main/10 to-transparent -translate-x-1/2 hidden md:block" />

      {/* Achievement Cards */}
      <div className="space-y-4 sm:space-y-5">
        {category.items.map((achievement, index) => (
          <AchievementCard
            key={index}
            achievement={achievement}
            index={index}
            isArabic={isArabic}
            cardRef={(el) => cardRefs.current[index] = el}
          />
        ))}
      </div>

      {/* Bottom stats */}
      <div className="mt-6 sm:mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-main/10 border border-main/20">
          <IoMedalOutline className="w-4 h-4 text-main" />
          <span className={`text-sm text-background/70 ${isArabic ? 'font-arabic' : 'font-sans'}`}>
            {category.items.length} {isArabic ? 'إنجازات' : 'Achievements'}
          </span>
        </div>
      </div>
    </div>
  )
}

const Achievements = () => {
  const t = useTranslation()
  const { isArabic } = useLanguage()
  const prefersReducedMotion = useReducedMotion()
  
  const sectionRef = useRef(null)
  const columnRefs = useRef([])

  // Get achievements data from translations
  const categories = t.achievements?.categories || []

  useLayoutEffect(() => {
    if (!categories.length) return
    
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate each column
      columnRefs.current.forEach((column, columnIndex) => {
        if (!column) return

        const cards = column.querySelectorAll('.group')

        // Column fade in
        gsap.to(column, {
          opacity: 1,
          duration: 0.8,
          delay: columnIndex * 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: column,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        })

        // Cards stagger animation
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: columnIndex * 0.2 + 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: column,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        })

        // Subtle floating animation for cards (if motion allowed)
        if (!prefersReducedMotion) {
          cards.forEach((card, cardIndex) => {
            gsap.to(card, {
              y: -5,
              duration: 2 + cardIndex * 0.3,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: cardIndex * 0.2
            })
          })
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [categories.length, prefersReducedMotion])

  if (!categories.length) return null

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-heading overflow-hidden"
      dir={isArabic ? 'rtl' : 'ltr'}
      aria-label={t.achievements?.title}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-heading via-heading to-heading/95" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-main/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-main/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-main/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(var(--color-main) 1px, transparent 1px), linear-gradient(90deg, var(--color-main) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-18 md:mb-24">
          {/* Top accent */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-linear-to-r from-transparent to-main" />
            <IoRibbonOutline className="w-6 h-6 text-main" />
            <div className="w-12 h-px bg-linear-to-l from-transparent to-main" />
          </div>

          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4 sm:mb-6 ${isArabic ? 'font-arabic' : 'font-sans'}`}>
            {t.achievements?.title}
          </h2>
          <p className={`text-background/60 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isArabic ? 'font-arabic' : 'font-sans'}`}>
            {t.achievements?.subtitle}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-8 sm:mt-10">
            {categories.map((cat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-main mb-1">
                  <CountingNumber 
                    target={cat.items.length} 
                    duration={1.5} 
                    delay={idx * 0.1}
                  />
                </div>
                <div className={`text-xs sm:text-sm text-background/50 ${isArabic ? 'font-arabic' : 'font-sans'}`}>
                  {cat.name}
                </div>
              </div>
            ))}
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-main mb-1">
                <CountingNumber 
                  target={categories.reduce((acc, cat) => acc + cat.items.length, 0)} 
                  duration={2} 
                  delay={0.4}
                />
              </div>
              <div className={`text-xs sm:text-sm text-background/50 ${isArabic ? 'font-arabic' : 'font-sans'}`}>
                {isArabic ? 'المجموع' : 'Total'}
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Columns Grid */}
        <div className="grid gap-8 sm:gap-10 md:gap-12 grid-cols-1 md:grid-cols-3">
          {categories.map((category, index) => (
            <CategoryColumn
              key={index}
              category={category}
              categoryIndex={index}
              columnRef={(el) => columnRefs.current[index] = el}
              isArabic={isArabic}
            />
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center">
          <div className="w-px h-12 bg-linear-to-b from-main/30 to-transparent" />
          <div className="w-3 h-3 rounded-full bg-main/30 mt-2" />
        </div>
      </div>
    </section>
  )
}

export default Achievements

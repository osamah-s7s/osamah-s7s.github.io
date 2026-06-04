'use client'

import { useRef, useLayoutEffect, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'

// Modal Component for viewing details - Uses Portal to avoid GSAP DOM conflicts
const DetailModal = ({ isOpen, onClose, title, items, isArabic }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Don't render until mounted (client-side only for portal)
  if (!mounted) return null

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="modal-content"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[80vh] bg-background rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`sticky top-0 px-4 sm:px-6 py-4 border-b border-main/20 ${isArabic ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-main/10 to-main/5`} dir={isArabic ? 'rtl' : 'ltr'}>
              <div className="flex items-center justify-between">
                <h3 className={`text-lg sm:text-xl font-bold text-heading ${isArabic ? 'font-arabic' : 'font-sans'}`}>
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-main/10 hover:bg-main/20 text-heading transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(80vh-80px)]" dir={isArabic ? 'rtl' : 'ltr'}>
              <ul className="space-y-3">
                {items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex items-start gap-2 sm:gap-3 ${isArabic ? 'font-arabic' : 'font-sans'}`}
                  >
                    <span className="w-2 h-2 mt-2 rounded-full bg-main flex-shrink-0" />
                    <span className="text-sub text-sm sm:text-base leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Render modal in a portal attached to document.body
  return createPortal(modalContent, document.body)
}

const Experience = () => {
  const t = useTranslation()
  const { isArabic } = useLanguage()
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)
  const slides = t.experience?.slides || []
  
  // Modal state
  const [modalData, setModalData] = useState({ isOpen: false, title: '', items: [] })

  const openModal = (title, items) => {
    setModalData({ isOpen: true, title, items })
  }

  const closeModal = () => {
    setModalData({ isOpen: false, title: '', items: [] })
  }

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Responsive scroll distance - shorter on mobile
    const isMobile = window.innerWidth < 640
    const scrollDistance = isMobile ? 1200 : 2000
    
    // For Arabic, scroll right (positive x), for English scroll left (negative x)
    const scrollDirection = isArabic ? 1 : -1
    
    const ctx = gsap.context(() => {
      const animation = gsap.fromTo(
        sectionRef.current,
        { x: 0 },
        {
          x: `${scrollDirection * (slides.length - 1) * 100}vw`,
          ease: 'none',
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: `+=${scrollDistance}`,
            scrub: 0.6,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          },
        }
      )

      return () => animation.kill()
    })

    return () => ctx.revert()
  }, [slides.length, isArabic])

  return (
    <div className="relative bg-background">
      {/* Detail Modal */}
      <DetailModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        title={modalData.title}
        items={modalData.items}
        isArabic={isArabic}
      />

      {/* Entire section gets pinned */}
      <div ref={triggerRef} className="h-[130vh] md:h-[120vh]  overflow-hidden">
        {/* Section Header - Inside pinned container */}
        <div className="pt-24 sm:pt-28 pb-4 sm:pb-6 px-4 sm:px-6 md:px-12">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-heading mb-1 sm:mb-2 ${isArabic ? 'font-arabic' : 'font-sans'}`}>
              {t.experience.title}
            </h2>
            <p className={`text-sub text-xs sm:text-sm md:text-base lg:text-lg ${isArabic ? 'font-arabic' : 'font-sans'}`}>
              {t.experience.subtitle}
            </p>
          </div>
        </div>

        {/* Horizontal Scrolling Cards Container */}
        <div className="h-[calc(100vh-140px)] sm:h-[calc(100vh-160px)] flex items-center">
          <div
            ref={sectionRef}
            className={`flex gap-3 sm:gap-4 px-3 sm:px-4 md:px-8 ${isArabic ? 'flex-row-reverse' : ''}`}
            style={{ 
              width: `${slides.length * 100}vw`,
              ...(isArabic && { marginLeft: 'auto' })
            }}
          >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: 'calc(100vw - 24px)' }}
            >
              {/* Card */}
              <div className="relative w-full max-w-5xl h-[55vh] sm:h-[60vh] md:h-[65vh] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl group">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-subtle-background via-background to-subtle-background">
                  <div className="absolute inset-0 bg-gradient-to-tr from-main/5 via-transparent to-main/10 animate-pulse" style={{ animationDuration: '4s' }} />
                </div>
                
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-main/10 via-transparent to-main/20" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col p-4 sm:p-6 md:p-8 lg:p-10" dir={isArabic ? 'rtl' : 'ltr'}>
                  {/* Period Badge */}
                  <div className="inline-block self-start px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-main/10 border border-main/30 rounded-full mb-3 sm:mb-4 md:mb-6">
                    <span className="text-main font-bold text-xs sm:text-sm md:text-base">
                      {slide.period}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-heading mb-1 sm:mb-2 ${isArabic ? 'font-arabic' : 'font-sans'}`}>
                    {slide.title}
                  </h3>

                  {/* Organization */}
                  <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-main font-semibold mb-4 sm:mb-5 md:mb-6 ${isArabic ? 'font-arabic' : 'font-sans'}`}>
                    {slide.organization}
                  </p>

                  {/* Preview of first 2 responsibilities */}
                  <div className="flex-grow w-full">
                    <ul className="space-y-1.5 sm:space-y-2">
                      {slide.responsibilities.slice(0, 2).map((resp, idx) => (
                        <li
                          key={idx}
                          className={`flex items-start gap-1.5 sm:gap-2 ${isArabic ? 'font-arabic' : 'font-sans'}`}
                        >
                          <span className="text-main text-sm sm:text-base md:text-lg flex-shrink-0">•</span>
                          <span className="text-sub text-xs sm:text-sm md:text-base line-clamp-2">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6 w-full">
                    {/* View Responsibilities Button */}
                    <button
                      onClick={() => openModal(
                        isArabic ? 'المسؤوليات' : 'Responsibilities',
                        slide.responsibilities
                      )}
                      className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-main/10 hover:bg-main/20 border border-main/30 hover:border-main/50 rounded-full text-main font-semibold text-xs sm:text-sm transition-all duration-300 ${isArabic ? 'font-arabic' : 'font-sans'}`}
                    >
                      <span>{isArabic ? 'عرض المسؤوليات' : 'View Responsibilities'}</span>
                      <svg className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* View Extracurricular Button (if exists) */}
                    {slide.extracurricular && slide.extracurricular.length > 0 && (
                      <button
                        onClick={() => openModal(
                          isArabic ? 'الأنشطة اللامنهجية والثقافية' : 'Extracurricular & Cultural Activities',
                          slide.extracurricular
                        )}
                        className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-heading/5 hover:bg-heading/10 border border-heading/20 hover:border-heading/30 rounded-full text-heading font-semibold text-xs sm:text-sm transition-all duration-300 ${isArabic ? 'font-arabic' : 'font-sans'}`}
                      >
                        <span>{isArabic ? 'الأنشطة اللامنهجية والثقافية' : 'Extracurricular & Cultural'}</span>
                        <svg className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}

                    {/* View Sports Button (if exists) */}
                    {slide.sports && slide.sports.length > 0 && (
                      <button
                        onClick={() => openModal(
                          isArabic ? 'الرياضة' : 'Sports',
                          slide.sports
                        )}
                        className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-sub/10 hover:bg-sub/20 border border-sub/30 hover:border-sub/50 rounded-full text-sub font-semibold text-xs sm:text-sm transition-all duration-300 ${isArabic ? 'font-arabic' : 'font-sans'}`}
                      >
                        <span>{isArabic ? 'الرياضة' : 'Sports'}</span>
                        <svg className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-t border-r sm:border-t-2 sm:border-r-2 border-main/20 rounded-tr-xl sm:rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-b border-l sm:border-b-2 sm:border-l-2 border-main/20 rounded-bl-xl sm:rounded-bl-2xl" />
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Experience
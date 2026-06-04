'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'

const Academics = () => {
  const t = useTranslation()
  const { isArabic } = useLanguage()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const timeline = t.academics?.timeline || []

  // ✅ Mobile timeline position
  // ✅ Desktop always centered
  const linePos = isArabic
    ? 'right-4 md:right-auto md:left-1/2'
    : 'left-4 md:left-1/2'

  const dotPos = isArabic
    ? 'right-4 md:right-auto md:left-1/2 translate-x-1/2 md:-translate-x-1/2'
    : 'left-4 md:left-1/2 -translate-x-1/2'

  const mobileCardPadding = isArabic ? 'pr-12 pl-2' : 'pl-12 pr-2'

  return (
    <section
      id="academics"
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-background overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-main rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-sub rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-heading mb-2 md:mb-3">
            {t.academics.title}
          </h2>
          <p className="text-sub text-sm md:text-base max-w-2xl mx-auto">
            {t.academics.subtitle}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Vertical Line */}
          <motion.div
            className={`absolute ${linePos} top-0 bottom-0 w-0.5 bg-gradient-to-b from-main via-main/60 to-main/20`}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />

          {/* Timeline Entries */}
          <div className="space-y-6 md:space-y-10">
            {timeline.map((entry, index) => {
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: isLeft ? -80 : 80, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.7,
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                  }}
                >
                  {/* Dot */}
                  <motion.div
                    className={`absolute ${dotPos} top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-main border-4 border-background shadow-lg shadow-main/50 z-20`}
                    initial={{ scale: 0, opacity: 0, rotate: -180 }}
                    whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1,
                      type: 'spring',
                      stiffness: 200,
                      damping: 10,
                    }}
                    whileHover={{
                      scale: 1.4,
                      boxShadow: '0 0 20px rgba(185, 156, 103, 0.8)',
                      transition: { duration: 0.2 },
                    }}
                  >
                    {/* Pulse */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-main"
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.8, 0, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        delay: 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    className={`relative w-full md:w-[47%] lg:w-[46%] ${
                      isLeft ? 'md:mr-auto' : 'md:ml-auto'
                    } ${mobileCardPadding} md:px-0`}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.3, type: 'spring', stiffness: 300 },
                    }}
                  >
                    <div className="relative bg-gradient-to-br from-subtle-background/50 to-background backdrop-blur-sm rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 border border-main/10 shadow-lg hover:shadow-2xl hover:border-main/30 transition-all duration-300 overflow-hidden group">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-main/5 rounded-bl-full" />

                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-main/10 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.8 }}
                      />

                      <motion.div
                        className="inline-block px-3 py-1 bg-main/10 rounded-full mb-3"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                      >
                        <span className="text-main text-xs sm:text-sm font-bold">
                          {entry.dateRange}
                        </span>
                      </motion.div>

                      <motion.h3
                        className="text-base sm:text-lg md:text-xl font-bold text-heading mb-1 group-hover:text-main transition-colors duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        {entry.degree}
                      </motion.h3>

                      {entry.field && (
                        <p className="text-sm md:text-base text-main font-semibold mb-2">
                          {entry.field}
                        </p>
                      )}

                      <p className="text-sub text-xs sm:text-sm leading-relaxed mb-3">
                        {entry.university}
                      </p>

                      {entry.dissertation && (
                        <div className="mt-3 pt-3 border-t border-main/20">
                          <p className="text-xs text-sub/80 italic leading-snug">
                            <span className="font-semibold text-heading not-italic">
                              {isArabic ? 'الأطروحة: ' : 'Dissertation: '}
                            </span>
                            {entry.dissertation}
                          </p>
                        </div>
                      )}

                      <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-main to-transparent rounded-b-2xl"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Academics

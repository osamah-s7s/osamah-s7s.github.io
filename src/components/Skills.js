'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  IoBookOutline, 
  IoAirplaneOutline, 
  IoFootballOutline 
} from 'react-icons/io5'

// Floating animation variants with random delays
const floatingVariants = {
  animate: (i) => ({
    y: [0, -8, 0],
    transition: {
      duration: 4 + (i * 0.5),
      repeat: Infinity,
      ease: 'easeInOut',
      delay: i * 0.2,
    },
  }),
}

// Card hover variants
const cardVariants = {
  initial: { opacity: 0, y: 40 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
  hover: {
    scale: 1.03,
    y: -5,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

// Pill variants for interests
const pillVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: 0.6 + i * 0.1,
      ease: 'easeOut',
    },
  }),
  hover: {
    scale: 1.08,
    y: -3,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
}

// Interest icons mapping
const interestIcons = {
  sports: IoFootballOutline,
  reading: IoBookOutline,
  travel: IoAirplaneOutline,
}

// Skill Card Component
const SkillCard = ({ skill, index, isArabic, shouldReduceMotion }) => {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover={shouldReduceMotion ? undefined : "hover"}
      viewport={{ once: true, margin: '-50px' }}
      className="group relative"
    >
      {/* Floating wrapper */}
      <motion.div
        custom={index}
        variants={shouldReduceMotion ? undefined : floatingVariants}
        animate={shouldReduceMotion ? undefined : "animate"}
        className="h-full"
      >
        {/* Glassmorphic Card */}
        <div className={`
          relative h-full p-6 sm:p-8 rounded-2xl overflow-hidden
          bg-gradient-to-br from-background/80 via-subtle-background/60 to-background/80
          backdrop-blur-md border border-main/10
          shadow-lg shadow-heading/5
          transition-all duration-500
          group-hover:border-main/30 group-hover:shadow-xl group-hover:shadow-main/10
          ${isArabic ? 'text-right' : 'text-left'}
        `}>
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-main/5 via-transparent to-main/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-main/20 via-main/10 to-main/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />

          {/* Content */}
          <div className=" z-10">
            {/* Skill number */}
            <span className={`text-main/30 font-bold text-4xl sm:text-5xl absolute top-4 group-hover:text-main/50 transition-colors duration-300 ${isArabic ? 'left-8' : 'right-8'}`}>
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Title */}
            <h3 className={`text-lg sm:text-xl md:text-2xl font-bold text-heading mb-3 mt-8 sm:mt-10 transition-colors duration-300 group-hover:text-main ${isArabic ? 'font-arabic' : 'font-sans'}`}>
              {skill.title}
            </h3>

            {/* Subtitle - always visible on small screens, revealed on hover on larger screens */}
            <p className={`text-sub text-sm sm:text-base leading-relaxed opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 ${isArabic ? 'font-arabic' : 'font-sans'}`}>
              {skill.subtitle}
            </p>
          </div>

          {/* Decorative corner accent */}
          <div className={`absolute bottom-0 ${isArabic ? 'right-0' : 'left-0'} w-16 h-16 sm:w-20 sm:h-20`}>
            <div className={`absolute bottom-0 ${isArabic ? 'right-0 border-r-2 border-b-2 rounded-br-2xl' : 'left-0 border-l-2 border-b-2 rounded-bl-2xl'} w-full h-full border-main/20 group-hover:border-main/40 transition-colors duration-300`} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Interest Pill Component
const InterestPill = ({ interest, index, isArabic, shouldReduceMotion }) => {
  const IconComponent = interestIcons[interest.icon] || IoBookOutline

  return (
    <motion.div
      custom={index}
      variants={pillVariants}
      initial="initial"
      whileInView="animate"
      whileHover={shouldReduceMotion ? undefined : "hover"}
      viewport={{ once: true }}
      className={`
        inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 sm:py-4
        rounded-full cursor-default
        bg-gradient-to-r from-subtle-background via-background to-subtle-background
        border border-main/20 hover:border-main/40
        shadow-md hover:shadow-lg hover:shadow-main/10
        transition-all duration-300
        ${isArabic ? 'flex-row-reverse' : ''}
      `}
    >
      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-main" />
      <span className={`text-heading font-semibold text-sm sm:text-base ${isArabic ? 'font-arabic' : 'font-sans'}`}>
        {interest.title}
      </span>
    </motion.div>
  )
}

const Skills = () => {
  const t = useTranslation()
  const { isArabic } = useLanguage()
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const skills = t.skills?.items || []
  const interests = t.skills?.interests || []

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-subtle-background overflow-hidden"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-main/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-main/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-heading mb-3 sm:mb-4 ${isArabic ? 'font-arabic' : 'font-sans'}`}>
            {t.skills?.title}
          </h2>
          <p className={`text-sub text-sm sm:text-base md:text-lg max-w-2xl mx-auto ${isArabic ? 'font-arabic' : 'font-sans'}`}>
            {t.skills?.subtitle}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-16 sm:mb-20">
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              skill={skill}
              index={index}
              isArabic={isArabic}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        {/* Interests Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="text-center"
        >
          <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold text-heading mb-6 sm:mb-8 ${isArabic ? 'font-arabic' : 'font-sans'}`}>
            {t.skills?.interestsTitle}
          </h3>
          
          <div className={`flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
            {interests.map((interest, index) => (
              <InterestPill
                key={index}
                interest={interest}
                index={index}
                isArabic={isArabic}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
          className="mt-16 sm:mt-20 h-px bg-gradient-to-r from-transparent via-main/30 to-transparent"
        />
      </div>
    </section>
  )
}

export default Skills

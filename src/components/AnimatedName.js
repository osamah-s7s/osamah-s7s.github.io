

'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const AnimatedName = ({ name, className = '', isArabic = false }) => {
  // Split by words for Arabic, letters for English
  const items = isArabic ? name.split(' ') : name.split('')
  const controls = useAnimationControls()

  useEffect(() => {
    let alive = true

    const run = async () => {
      // First appear
      await controls.start('appearing')
      if (!alive) return
      await sleep(2000)

      while (alive) {
        // Disappear start -> end (upwards)
        await controls.start('disappearing')
        if (!alive) return

        // IMPORTANT: instantly reset all letters to bottom (y: 20, opacity: 0)
        await controls.start('hidden')
        if (!alive) return

        // Appear start -> end (from y: 20 -> 0)
        await controls.start('appearing')
        if (!alive) return

        await sleep(2000)
      }
    }

    run()
    return () => {
      alive = false
      controls.stop()
    }
  }, [controls, name, isArabic])

  const container = {
    hidden: { transition: { staggerChildren: 0 } },
    appearing: {
      transition: {
        staggerChildren: isArabic ? 0.1 : 0.05,
        staggerDirection: 1, // start -> end
      },
    },
    disappearing: {
      transition: {
        staggerChildren: isArabic ? 0.1 : 0.05,
        staggerDirection: 1, // start -> end
      },
    },
  }

  const child = {
    // reset position for appear (from bottom)
    hidden: { opacity: 0, y: 20 },

    // appear from bottom
    appearing: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 200 },
    },

    // disappear upward
    disappearing: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: 'easeIn' },
    },
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {items.map((item, index) => (
        <motion.span 
          key={index} 
          variants={child} 
          className="inline-block"
          style={{
            marginRight: isArabic ? 0 : '0.05em',
            marginLeft: isArabic ? '0.25em' : 0,
          }}
        >
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </motion.div>
  )
}

export default AnimatedName

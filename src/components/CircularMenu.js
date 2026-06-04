'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useId, useState, useCallback } from 'react'
import { TbMenu3 } from 'react-icons/tb'

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < breakpoint)

    update() // set correct value on mount
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [breakpoint])

  return isMobile
}

const CircularMenu = ({ menuItems, isOpen, onToggle, isArabic = false, socialLinks = [] }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [hoveredIconIndex, setHoveredIconIndex] = useState(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const uid = useId()

  const isMobile = useIsMobile(640)

  // Smooth scroll handler
  const handleSmoothScroll = useCallback((href, e) => {
    e.preventDefault()
    
    // Close menu first
    onToggle()
    
    // Check if it's an anchor link
    if (href.startsWith('#')) {
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
      }
    }
  }, [onToggle])

  // Add social links as a single arc item on mobile
  const allMenuItems = isMobile && socialLinks.length > 0 
    ? [...menuItems, { label: 'Social', href: '#', isSocial: true, socialIcons: socialLinks }]
    : menuItems

  // Update dimensions on mount and when isMobile changes
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [isMobile]) // Re-run when isMobile changes

  // ✅ responsive values now react to resize
  const ringWidth = isMobile ? 30 : 54
  const baseOffset = isMobile ? 40 : 70

  const outerRadius = ringWidth * allMenuItems.length + baseOffset
  const size = outerRadius * 2
  const cx = outerRadius
  const cy = outerRadius

  const polarToCartesian = (centerX, centerY, radius, angleDeg) => {
    const rad = (angleDeg * Math.PI) / 180
    return {
      x: centerX + radius * Math.cos(rad),
      y: centerY + radius * Math.sin(rad),
    }
  }

  const describeWedge = (outerR, innerR) => {
    const outerStart = polarToCartesian(cx, cy, outerR, -90)
    const outerEnd = polarToCartesian(cx, cy, outerR, 30)
    const innerStart = polarToCartesian(cx, cy, innerR, 30)
    const innerEnd = polarToCartesian(cx, cy, innerR, -90)

    return [
      `M ${outerStart.x} ${outerStart.y}`,
      `A ${outerR} ${outerR} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
      `L ${innerStart.x} ${innerStart.y}`,
      `A ${innerR} ${innerR} 0 0 0 ${innerEnd.x} ${innerEnd.y}`,
      `Z`,
    ].join(' ')
  }

  const describeArc = (radius) => {
    const start = polarToCartesian(cx, cy, radius, -90)
    const end = polarToCartesian(cx, cy, radius, 30)
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`
  }

  const fontSize = isMobile ? 8 : 12
  const letterSpacing = isMobile ? '1.5px' : '3px'

  // Calculate dynamic positioning based on container size
  const getContainerPosition = useCallback(() => {
    if (isMobile) {
      return isArabic ? {
        top: '7px',
        left: '7px',
        buttonTop: '8px',
        buttonLeft: '0px'
      } : {
        top: '7px',
        right: '7px',
        buttonTop: '8px',
        buttonRight: '0px'
      }
    }
    return isArabic ? {
      top: '10px',
      left: '10px',
      buttonTop: '12px',
      buttonLeft: '12px'
    } : {
      top: '10px',
      right: '10px',
      buttonTop: '12px',
      buttonRight: '12px'
    }
  }, [isMobile, isArabic])

  const containerPos = getContainerPosition()

  // Dynamic rotation angle based on language
  const rotationAngle = isArabic ? 70 : 160

  return (
    <div className={`fixed top-0 z-50 ${
      isArabic ? 'left-0' : 'right-0'
    }`}>
      <motion.button
        onClick={onToggle}
        className="absolute z-50 flex items-center justify-center rounded-full w-10 h-10 sm:w-14 sm:h-14"
        style={{
          top: containerPos.buttonTop,
          ...(isArabic 
            ? { left: containerPos.buttonLeft }
            : { right: containerPos.buttonRight }
          )
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle Menu"
      >
        <motion.div
          animate={isOpen ? { rotate: 1080 } : { rotate: -1080 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <TbMenu3 className="w-6 h-6 sm:w-8 sm:h-8 text-heading hover:text-main transition-colors duration-300" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute"
            style={{
              top: containerPos.top,
              ...(isArabic 
                ? { left: containerPos.left }
                : { right: containerPos.right }
              )
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.svg
              key={`svg-${isMobile}-${dimensions.width}-${isArabic}`}
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="absolute"
              style={{ 
                [isArabic ? 'left' : 'right']: -cx,
                top: -cy,
                transformOrigin: `${cx}px ${cy}px`
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <defs>
                <filter id={`${uid}-shadow`} x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="10" stdDeviation="10" floodOpacity="0.25" />
                </filter>
                <filter id={`${uid}-blur`}>
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                </filter>
              </defs>

              {[...allMenuItems].reverse().map((item, index) => {
                const outerR = outerRadius - index * ringWidth
                const innerR = outerR - ringWidth
                const midR = (outerR + innerR) / 2

                const wedge = describeWedge(outerR, innerR)
                const arc = describeArc(midR)

                const isHovered = hoveredIndex === index
                const isSocialItem = item.isSocial

                return (
                  <g key={item.href} transform={`rotate(${rotationAngle} ${cx} ${cy})`}>
                    <motion.path
                      d={wedge}
                      fill="var(--color-main)"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
                      style={{ 
                        transformOrigin: `${cx}px ${cy}px`,
                        filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                        backdropFilter: 'blur(8px) saturate(180%)'
                      }}
                      opacity={0.7 - index * (0.5 / Math.max(1, allMenuItems.length - 1))}
                    />

                    <path id={`${uid}-arc-${index}`} d={arc} fill="none" />

                    {/* Invisible clickable area */}
                    <path 
                      d={wedge} 
                      fill="transparent" 
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => handleSmoothScroll(item.href, e)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    />

                    {isSocialItem ? (
                      /* Render social icons arranged along the arc */
                      <g>
                        {item.socialIcons?.map((social, iconIndex) => {
                          // Calculate evenly spaced positions along the arc
                          const totalIcons = item.socialIcons.length
                          const arcSpan = 120 // degrees of the arc
                          const startAngle = -90 // start of arc
                          const angleStep = arcSpan / (totalIcons + 1)
                          const iconAngle = startAngle + angleStep * (iconIndex + 1)
                          
                          // Convert to radians and calculate position
                          const radian = iconAngle * Math.PI / 180
                          const iconX = midR * Math.cos(radian) + cx
                          const iconY = midR * Math.sin(radian) + cy
                          
                          const isIconHovered = hoveredIconIndex === `${index}-${iconIndex}`
                          
                          return (
                            <a
                              key={social.label}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={onToggle}
                              onMouseEnter={() => setHoveredIconIndex(`${index}-${iconIndex}`)}
                              onMouseLeave={() => setHoveredIconIndex(null)}
                            >
                              <g transform={`translate(${iconX}, ${iconY}) rotate(${iconAngle + 90})`}>
                                <foreignObject
                                  x="-10"
                                  y="-10"
                                  width="20"
                                  height="20"
                                >
                                  <div 
                                    className='flex items-center justify-center w-full h-full transition-colors duration-200'
                                    style={{
                                      color: isIconHovered ? social.hoverColor : 'var(--color-background)',
                                    }}
                                  >
                                    {social.icon && social.icon()}
                                  </div>
                                </foreignObject>
                              </g>
                            </a>
                          )
                        })}
                      </g>
                    ) : (
                      /* Render text for regular menu items */
                      <motion.text
                        className="select-none"
                        fontSize={fontSize}
                        fontWeight={700}
                        fill={isHovered ? 'var(--color-heading)' : 'var(--color-background)'}
                        style={{
                          letterSpacing,
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                        }}
                        animate={isHovered ? { scale: 1.03 } : { scale: 1 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => handleSmoothScroll(item.href, e)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <textPath href={`#${uid}-arc-${index}`} startOffset="55%" textAnchor="middle">
                          {item.label}
                        </textPath>
                      </motion.text>
                    )}
                  </g>
                )
              })}
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CircularMenu


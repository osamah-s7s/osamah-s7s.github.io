'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/hooks/useTranslation'
import CircularMenu from './CircularMenu'
import AnimatedName from './AnimatedName'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isArabic } = useLanguage()
  const t = useTranslation()

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.academics, href: '#academics' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.achievements, href: '#achievements' },
    { label: t.nav.contact, href: '#contact' },
  ]

  const socialLinks = [
    { icon: () => <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>, href: '#', label: 'LinkedIn', hoverColor: '#0A66C2' },
    { icon: () => <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>, href: 'mailto:contact@example.com', label: 'Email', hoverColor: '#10B981' },
    { icon: () => <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>, href: '#', label: 'Twitter', hoverColor: '#1DA1F2' },
    { icon: () => <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>, href: '#', label: 'YouTube', hoverColor: '#FF0000' },
  ]

  return (
    <nav className='fixed w-full h-20 top-0 left-0 right-0 z-40 pointer-events-none'>
      {/* Blur overlay */}
      <div
        className='absolute inset-0 transition-all duration-500'
        style={{
          backdropFilter: isScrolled ? 'blur(12px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px) saturate(180%)' : 'none',
          background: isScrolled
            ? 'linear-gradient(to bottom, color-mix(in srgb, var(--color-background) 90%, transparent), color-mix(in srgb, var(--color-background) 70%, transparent))'
            : 'transparent',
          boxShadow: isScrolled ? '0 1px 3px color-mix(in srgb, var(--color-heading) 10%, transparent)' : 'none',
          pointerEvents: 'none',
        }}
      />
      
      {/* Content layer */}
      <div className='relative h-full'>
        {/* Animated Name - Position switches based on language */}
        <div className={`absolute top-[40%] sm:top-1/2 -translate-y-1/2 pointer-events-auto max-w-[60%] sm:max-w-none ${
          isArabic 
            ? 'right-3 sm:right-6 md:right-10' 
            : 'left-3 sm:left-6 md:left-10'
        }`}>
          <div className={`text-xs sm:text-sm md:text-base lg:text-lg font-bold ${
            isArabic ? 'font-arabic' : 'font-sans'
          }`}>
            <span className='text-main'>{isArabic ? 'أ. م.' : 'Engr.'}</span>
            <AnimatedName
              key={isArabic ? 'ar' : 'en'}
              name={
                isArabic
                  ? ' اسامه حسين العيني   '
                  : ' Osamah Hussein Alaini'
              }
              className='text-heading inline'
              isArabic={isArabic}
            />
          </div>
        </div>

        {/* Right Side - Circular Menu */}
        <div className='pointer-events-auto'>
          <CircularMenu
            menuItems={menuItems}
            socialLinks={socialLinks}
            isOpen={isMenuOpen}
            onToggle={() => setIsMenuOpen(!isMenuOpen)}
            isArabic={isArabic}
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar

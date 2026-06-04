'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const LanguageToggle = () => {
  const { language, toggleLanguage, isArabic } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className='fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-subtle-background hover:bg-main hover:text-background rounded-lg border border-main transition-all duration-300 shadow-md'
      aria-label='Toggle Language'
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
    </button>
  )
}

export default LanguageToggle

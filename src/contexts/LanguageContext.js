'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')
  const [isRTL, setIsRTL] = useState(false)

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage')
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage)
      setIsRTL(savedLanguage === 'ar')
    }
  }, [])

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }, [isRTL, language])

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en'
    setLanguage(newLanguage)
    setIsRTL(newLanguage === 'ar')
    localStorage.setItem('preferredLanguage', newLanguage)
  }

  const switchToLanguage = (lang) => {
    if (lang === 'en' || lang === 'ar') {
      setLanguage(lang)
      setIsRTL(lang === 'ar')
      localStorage.setItem('preferredLanguage', lang)
    }
  }

  const value = {
    language,
    isRTL,
    toggleLanguage,
    switchToLanguage,
    isEnglish: language === 'en',
    isArabic: language === 'ar',
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

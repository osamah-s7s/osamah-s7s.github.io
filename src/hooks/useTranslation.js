'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/locales'

/**
 * Custom hook to get translations for current language
 * Usage: const t = useTranslation()
 */
export const useTranslation = () => {
  const { language } = useLanguage()
  return getTranslation(language)
}

import { en } from './en'
import { ar } from './ar'

export const translations = {
  en,
  ar,
}

export const getTranslation = (language) => {
  return translations[language] || translations.en
}

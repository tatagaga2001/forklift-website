import { createContext, useContext, useState } from 'react'
import th from '../locales/th'
import en from '../locales/en'

const LanguageContext = createContext(null)

const locales = { th, en }

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('lang') || 'th'
  })

  const setLanguage = (l) => {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  const toggleLang = () => {
    setLanguage(lang === 'th' ? 'en' : 'th')
  }

  const t = locales[lang] || th

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
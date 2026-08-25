import { createContext, useContext, useState, useEffect } from 'react'

// ─── Translation dictionary ─────────────────────────────────────────────────
// Phase 1: static/shared UI strings only (nav, footer, common buttons).
// Page body content stays Arabic-only until Phase 2/3.
export const translations = {
  nav_about: { ar: 'تعرف علي', en: 'About Me' },
  nav_blog: { ar: 'عن المدونة', en: 'About the Blog' },
  nav_books: { ar: 'كتبي', en: 'My Books' },
  nav_articles: { ar: 'اقرأ مقالاتي', en: 'Read My Articles' },
  nav_events: { ar: 'مؤتمرات وفعاليات', en: 'Conferences & Events' },
  footer_quick_links: { ar: 'روابط سريعة', en: 'Quick Links' },
  footer_contact_me: { ar: 'تواصل معي', en: 'Contact Me' },
  footer_tagline: { ar: 'مدونة متخصصة في القيادة والتحول وريادة الأعمال', en: 'A blog focused on leadership, transformation, and entrepreneurship' },
  footer_rights: { ar: 'جميع الحقوق محفوظة', en: 'All rights reserved' },
  footer_link_blog: { ar: 'المدونة', en: 'Blog' },
  footer_link_articles: { ar: 'المقالات', en: 'Articles' },
  search: { ar: 'بحث', en: 'Search' },
  read_more: { ar: 'اقرأ المزيد', en: 'Read More' },
  buy_book: { ar: 'اشتر الكتاب', en: 'Buy the Book' },
  view_all_articles: { ar: 'عرض جميع المقالات', en: 'View All Articles' },
  loading: { ar: 'جارٍ التحميل...', en: 'Loading...' },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem('site_lang') || 'ar')

  useEffect(() => {
    localStorage.setItem('site_lang', lang)
  }, [lang])

  function setLang(next) {
    setLangState(next)
  }

  function toggleLang() {
    setLangState(l => (l === 'ar' ? 'en' : 'ar'))
  }

  function t(key) {
    return translations[key] ? translations[key][lang] : key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

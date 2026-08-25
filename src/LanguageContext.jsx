import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

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
  all_category: { ar: 'الكل', en: 'All' },
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

// ─── Article localization helper ────────────────────────────────────────────
// Falls back to the Arabic field whenever the English version is empty,
// so partially-translated articles still display sensibly.
export function localizeArticle(article, lang) {
  if (!article) return article
  if (lang !== 'en') return article
  return {
    ...article,
    title: article.title_en || article.title,
    category: article.category_en || article.category,
    excerpt: article.excerpt_en || article.excerpt,
    body: article.body_en || article.body,
    date: article.date_en || article.date,
  }
}

// ─── Page content blocks ─────────────────────────────────────────────────────
// Fetches admin-editable bilingual text for a given page (e.g. 'home') from
// the page_content table. Returns a function get(sectionKey, fallbackAr) that
// picks the right language and falls back to hardcoded text if the row
// doesn't exist yet (so pages never break before being seeded/edited).
export function usePageContent(page) {
  const { lang } = useLanguage()
  const [rows, setRows] = useState(null)

  useEffect(() => {
    supabase.from('page_content').select('*').eq('page', page).then(({ data }) => {
      setRows(data || [])
    })
  }, [page])

  function get(sectionKey, fallbackAr = '') {
    const row = (rows || []).find(r => r.section_key === sectionKey)
    if (!row) return fallbackAr
    if (lang === 'en') return row.content_en || row.content_ar || fallbackAr
    return row.content_ar || fallbackAr
  }

  return { get, loading: rows === null }
}

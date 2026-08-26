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
  welcome_prefix: { ar: 'أرحب بكم هنا في', en: 'Welcome to' },
  about_career_heading: { ar: 'مجالاتي المهنية', en: 'My Professional Fields' },
  about_qualifications_heading: { ar: 'مؤهلاتي', en: 'My Qualifications' },
  about_hobbies_heading: { ar: 'هواياتي', en: 'My Hobbies' },
  about_me_pill: { ar: 'نبذة عني', en: 'About Me' },
  articles_pill: { ar: 'المقالات', en: 'Articles' },
  latest_articles_heading: { ar: 'أحدث المقالات', en: 'Latest Articles' },
  latest_article_pill: { ar: 'أحدث المقالات', en: 'Latest Article' },
  continue_reading: { ar: 'أكمل القراءة', en: 'Continue Reading' },
  newsletter_heading: { ar: 'أسعد بالانضمام للقائمة البريدية لتصلك أحدث مقالاتي', en: 'Join my mailing list to get my latest articles' },
  newsletter_thanks: { ar: 'شكرًا على اشتراكك! سيصلك أول محتوى جديد قريبًا.', en: "Thanks for subscribing! You'll receive new content soon." },
  email_label: { ar: 'البريد الإلكتروني', en: 'Email' },
  name_label: { ar: 'الاسم', en: 'Name' },
  name_placeholder: { ar: 'اسمك', en: 'Your name' },
  join_now: { ar: 'انضم الآن', en: 'Join Now' },
  social_accounts_heading: { ar: 'حساباتي على مواقع التواصل الاجتماعي', en: 'My Social Media Accounts' },
  book_title: { ar: 'سيرة غير ذاتية', en: 'An Unauthorized Autobiography' },
  book_teaser: { ar: 'قصص وتجارب ملهمة في النجاح المهني والقيادة في بيئتنا. قصص تجارب حقيقية ألهمت الكثيرين في رحلة النجاح.', en: 'Inspiring stories and experiences in professional success and leadership. Real stories that have inspired many on the journey to success.' },
  view_book: { ar: 'عرض على الكتاب', en: 'View the Book' },
  books_pill: { ar: 'الكتب', en: 'Books' },
  role_tagline: { ar: 'قائد · مؤلف · متحدث', en: 'Leader · Author · Speaker' },
  welcome_heading: { ar: 'أرحب بكم هنا في مدونتي والتي أدوّن بها بعضًا من تجاربي ومحطاتي في رحلة آمل أن تتكلل بالنجاح.', en: 'Welcome to my blog, where I write about some of my experiences and milestones on a journey I hope will be crowned with success.' },
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
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, dir: lang === 'en' ? 'ltr' : 'rtl' }}>
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
    category: CATEGORY_TRANSLATIONS[article.category] || article.category,
    excerpt: article.excerpt_en || article.excerpt,
    body: article.body_en || article.body,
    date: article.date_en || article.date,
  }
}

// Categories are a small fixed set — translated once here (like a WordPress
// taxonomy translation), not duplicated per article.
export const CATEGORY_TRANSLATIONS = {
  'القيادة': 'Leadership',
  'التحول': 'Transformation',
  'الشباب': 'Youth',
  'ريادة': 'Entrepreneurship',
  'المهنة': 'Career',
  'الإدارة': 'Management',
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

  function getList(sectionKey, fallback = []) {
    const row = (rows || []).find(r => r.section_key === sectionKey)
    if (!row) return fallback
    const raw = lang === 'en' ? (row.content_en || row.content_ar) : row.content_ar
    if (!raw) return fallback
    try {
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) && parsed.length ? parsed : fallback
    } catch {
      return fallback
    }
  }

  return { get, getList, loading: rows === null }
}

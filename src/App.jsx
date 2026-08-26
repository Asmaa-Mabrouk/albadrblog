import { useState, useEffect, lazy, Suspense } from 'react'
import { HashRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { ThemeProvider, useTheme, ArticleCard as SharedArticleCard, Newsletter } from './shared'
import './index.css'
import heroImg from './assets/hero_new.webp'
import bookCoverImg from './assets/book_cover.webp'
import profileAvatarImg from './assets/badr_profile.webp'
import { supabase } from './supabaseClient'
import { LanguageProvider, useLanguage, localizeArticle, usePageContent } from './LanguageContext'
import {
  Navbar, Footer, ScrollToTop,
  ArrowLeftIcon, CalendarIcon,
  EmailIcon, LinkedInIcon, YouTubeIcon, TwitterIcon,
} from './shared'
// Route-level code splitting: these pages (and Admin's rich text editor in
// particular, which pulls in a large third-party library) are only fetched
// when someone actually visits that page, instead of being downloaded by
// every visitor up front.
const AboutMe = lazy(() => import('./AboutMe'))
const AboutBlog = lazy(() => import('./AboutBlog'))
const Books = lazy(() => import('./Books'))
const Articles = lazy(() => import('./Articles'))
const Events = lazy(() => import('./Events'))
const Admin = lazy(() => import('./Admin'))

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  const navigate = useNavigate()
  const { lang, t: tr } = useLanguage()
  const [rawFeatured, setRawFeatured] = useState(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    supabase.from('articles').select('*').order('featured', { ascending: false }).order('sort_date', { ascending: false, nullsFirst: false }).order('id', { ascending: false }).limit(1).then(({ data }) => {
      if (data && data[0]) setRawFeatured(data[0])
    })
  }, [])

  const featured = localizeArticle(rawFeatured, lang)

  return (
    <section style={{
      position: 'relative', width: '100%', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#04141c',
      overflow: 'hidden',
    }}>
      {/* Page backdrop photo, near full color, behind the card */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${heroImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.9,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.25) 100%)',
      }} />
      {/* Subtle color texture on top of the backdrop */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 25% 30%, rgba(20,184,166,0.10) 0%, transparent 45%), radial-gradient(circle at 75% 70%, rgba(200,169,110,0.08) 0%, transparent 45%)',
      }} />

      {/* Card: article image always visible, zooms in slightly on hover */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => navigate(rawFeatured ? `/article/${rawFeatured.id}` : '/articles')}
        style={{
          position: 'relative', zIndex: 10, cursor: 'pointer',
          width: 'min(92%, 780px)', minHeight: '420px',
          borderRadius: '20px', overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: hovered ? '0 30px 70px rgba(0,0,0,0.55)' : '0 20px 50px rgba(0,0,0,0.4)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'transform 0.4s ease, box-shadow 0.4s ease',
          display: 'flex', alignItems: 'flex-end',
        }}
      >
        {/* Base panel color, shows if the article has no image */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #0a3d52 0%, #04334c 60%, #072a3d 100%)',
        }} />
        {/* Article photo — only rendered once loaded, to avoid a flash of the wrong image */}
        {rawFeatured?.img && (
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${rawFeatured.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.6s ease',
          }} />
        )}
        {/* Overlay — dark wash that keeps text legible over the photo */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(4,20,28,0.75) 0%, rgba(4,20,28,0.45) 45%, rgba(4,20,28,0.15) 100%)',
        }} />
        {/* Thin gold/teal accent line, top */}
        <div style={{
          position: 'absolute', top: 0, insetInline: 0, height: '4px',
          background: 'linear-gradient(to left, #c8a96e, #e8c98e, #14b8a6)',
        }} />

        {/* Text content */}
        <div style={{
          position: 'relative', zIndex: 1,
          width: '100%', padding: '48px 40px', textAlign: 'center',
        }}>
          <div style={{ marginBottom: '20px' }}>
            <span style={{
              backgroundColor: 'rgba(20,184,166,0.16)', color: '#5eead4',
              border: '1px solid rgba(94,234,212,0.4)',
              fontSize: '13px', fontWeight: '600',
              padding: '6px 20px', borderRadius: '999px',
              fontFamily: 'Cairo, sans-serif', letterSpacing: '0.02em',
            }}>
              {featured?.category ? `${tr('latest_article_pill')} · ${featured.category}` : tr('latest_article_pill')}
            </span>
          </div>
          {featured && (
            <>
              <h1 style={{
                fontFamily: 'Playfair Display, Cairo, sans-serif',
                fontSize: 'clamp(26px, 4.5vw, 42px)', fontWeight: '700', color: '#ffffff',
                marginBottom: '16px', lineHeight: 1.3,
              }}>
                {featured.title}
              </h1>
              <p style={{
                fontFamily: 'Cairo, sans-serif', fontSize: '16px',
                color: 'rgba(255,255,255,0.82)', maxWidth: '560px',
                margin: '0 auto 30px', lineHeight: 1.85,
              }}>
                {featured.excerpt}
              </p>
            </>
          )}
          <button
            style={{
              backgroundColor: '#14b8a6', color: '#ffffff',
              padding: '13px 30px', fontSize: '15px',
              fontFamily: 'Cairo, sans-serif', fontWeight: '600',
              border: 'none', borderRadius: '999px', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              boxShadow: '0 4px 24px rgba(20,184,166,0.5)',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0d9488'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#14b8a6'}
            onClick={e => { e.stopPropagation(); navigate(rawFeatured ? `/article/${rawFeatured.id}` : '/articles') }}
          >
            {lang === 'en' ? 'Continue Reading' : 'أكمل القراءة'}
            <ArrowLeftIcon size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Book Feature ─────────────────────────────────────────────────────────────
function BookFeature() {
  const [bookHovered, setBookHovered] = useState(false)
  const navigate = useNavigate()
  const { t: tr } = useLanguage()
  return (
    <section style={{ backgroundColor: '#0a3d52', padding: '60px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          gap: '48px', flexDirection: 'row-reverse',
        }}>
          {/* Text — left side */}
          <div style={{ flex: '1 1 320px', textAlign: 'right' }}>
            <h2 style={{
              fontFamily: 'Playfair Display, Cairo, sans-serif',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '700', color: '#ffffff',
              marginBottom: '20px', lineHeight: 1.3,
            }}>
              {tr('book_title')}
            </h2>
            <p style={{
              fontFamily: 'Cairo, sans-serif', fontSize: '17px',
              color: 'rgba(255,255,255,0.80)', lineHeight: 1.85,
              marginBottom: '36px', maxWidth: '460px',
            }}>
              {tr('book_teaser')}
            </p>
            <button
              style={{
                backgroundColor: '#14b8a6', color: '#ffffff',
                padding: '14px 32px', fontSize: '16px',
                fontFamily: 'Cairo, sans-serif', fontWeight: '600',
                border: 'none', borderRadius: '12px', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                boxShadow: '0 4px 20px rgba(20,184,166,0.35)',
                transition: 'background-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0d9488'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#14b8a6'; e.currentTarget.style.transform = 'translateY(0)' }}
              onClick={() => navigate('/books')}
            >
              {tr('view_book')}
              <ArrowLeftIcon size={15} />
            </button>
          </div>

          {/* Book cover — floating with glow */}
          <div style={{ flexShrink: 0, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* الكتب pill */}
            <span style={{
              backgroundColor: '#0d7377', color: '#ffffff',
              fontSize: '13px', fontWeight: '600',
              padding: '5px 18px', borderRadius: '999px',
              fontFamily: 'Cairo, sans-serif',
              marginBottom: '28px', display: 'inline-block',
            }}>
              {tr('books_pill')}
            </span>

            {/* Ambient glow behind book */}
            <div style={{
              position: 'absolute',
              top: '60px', left: '50%',
              transform: 'translateX(-50%)',
              width: '260px', height: '320px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(20,184,166,0.25) 0%, transparent 70%)',
              WebkitFilter: 'blur(24px)',
              filter: 'blur(24px)',
              pointerEvents: 'none',
            }} />

            {/* Book */}
            <div
              style={{
                position: 'relative', zIndex: 1,
                transform: bookHovered
                  ? 'translateY(-10px) rotate(-3deg) scale(1.04)'
                  : 'translateY(0) rotate(-6deg)',
                transition: 'transform 0.4s ease',
                cursor: 'pointer',
                WebkitFilter: 'drop-shadow(0 32px 40px rgba(0,0,0,0.55)) drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
                filter: 'drop-shadow(0 32px 40px rgba(0,0,0,0.55)) drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
              }}
              onMouseEnter={() => setBookHovered(true)}
              onMouseLeave={() => setBookHovered(false)}
              onClick={() => navigate('/books')}
            >
              <img
                src={bookCoverImg}
                alt="سيرة غير ذاتية"
                style={{ width: '240px', maxWidth: '100%', height: 'auto', borderRadius: '6px', display: 'block' }}
              />
            </div>

            {/* Ground shadow/reflection */}
            <div style={{
              width: '160px', height: '16px',
              background: 'radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 75%)',
              borderRadius: '50%',
              marginTop: '-8px',
              WebkitFilter: 'blur(6px)',
              filter: 'blur(6px)',
            }} />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Profile Section ──────────────────────────────────────────────────────────
function Profile() {
  const navigate = useNavigate()
  const { t } = useTheme()
  const { get } = usePageContent('home')
  const { t: tr } = useLanguage()
  const socials = [
    { icon: <EmailIcon />, label: 'البريد الإلكتروني' },
    { icon: <LinkedInIcon />, label: 'لينكد إن' },
    { icon: <YouTubeIcon />, label: 'يوتيوب' },
    { icon: <TwitterIcon />, label: 'تويتر' },
  ]

  return (
    <section style={{ backgroundColor: t.bgSoft, padding: '110px 0', transition: 'background-color 0.3s' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{
          width: '148px', height: '148px', borderRadius: '50%',
          outline: '4px solid #14b8a6',
          outlineOffset: '4px',
          overflow: 'hidden',
          marginBottom: '24px', flexShrink: 0,
          boxShadow: '0 8px 28px rgba(0,0,0,0.12)',
        }}>
          <img
            src={profileAvatarImg}
            alt="بدر بن حمود البدر"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <span style={{ display: 'inline-block', backgroundColor: 'rgba(20,184,166,0.15)', color: '#0d7377', fontSize: '12px', fontWeight: '600', padding: '5px 14px', borderRadius: '999px', marginBottom: '16px', fontFamily: 'Cairo, sans-serif' }}>{tr('about_me_pill')}</span>
        <h2 style={{ fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: '700', color: t.text, marginBottom: '12px', transition: 'color 0.3s' }}>{get('profile_name', 'بدر بن حمود البدر')}</h2>
        <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '14px', color: '#0d7377', letterSpacing: '0.08em', marginBottom: '32px' }}>{get('profile_title', 'عضو مجلس إدارة · مؤلف · متحدث رئيسي')}</p>

        <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', color: t.textBody, lineHeight: 1.85, maxWidth: '560px', marginBottom: '32px', transition: 'color 0.3s' }}>
          {get('profile_bio', 'مهتم بتمكين الشباب وقيادة التحول وريادة الأعمال. أرحب بكم في مدونتي التي أشارككم فيها تجاربي ومحطاتي.')}
        </p>

        <button
          style={{ backgroundColor: 'transparent', color: '#14b8a6', border: '2px solid #14b8a6', padding: '12px 28px', fontSize: '15px', fontFamily: 'Cairo, sans-serif', fontWeight: '600', borderRadius: '999px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '32px', transition: 'background-color 0.2s, color 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#14b8a6'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#14b8a6' }}
          onClick={() => navigate('/about')}
        >
          اقرأ المزيد عني
          <ArrowLeftIcon size={15} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {socials.map((s) => (
            <button key={s.label} aria-label={s.label} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(20,184,166,0.12)', color: '#14b8a6', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s, color 0.2s, transform 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#14b8a6'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(20,184,166,0.12)'; e.currentTarget.style.color = '#14b8a6'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {s.icon}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Articles Grid ────────────────────────────────────────────────────────────
// Homepage shows the 6 most recent articles, fetched live from Supabase.
function ArticleCard({ article }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  const { t } = useTheme()
  const { dir } = useLanguage()
  const textAlign = dir === 'ltr' ? 'left' : 'right'
  return (
    <div style={{ backgroundColor: t.surface, borderRadius: '12px', overflow: 'hidden', boxShadow: hovered ? t.shadowHover : t.shadow, transform: hovered ? 'translateY(-4px)' : 'translateY(0)', transition: 'all 0.25s ease', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/article/${article.id}`)}
    >
      <div style={{ height: '240px', background: article.bg, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {article.img ? (
          <>
            <img src={article.img} alt={article.title} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(4,51,76,0.18) 0%, rgba(4,51,76,0.55) 100%)' }} />
          </>
        ) : (
          <>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 25% 75%, white 1.5px, transparent 1.5px), radial-gradient(circle at 75% 25%, white 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />
            <span style={{ fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: '72px', color: 'rgba(255,255,255,0.12)', fontWeight: '700', userSelect: 'none' }}>{article.title.charAt(0)}</span>
          </>
        )}
        <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <span style={{ backgroundColor: '#14b8a6', color: '#ffffff', padding: '4px 12px', borderRadius: '999px', fontSize: '13px', fontFamily: 'Cairo, sans-serif', fontWeight: '500' }}>{article.category}</span>
          {article.featured && <span style={{ backgroundColor: '#c8a96e', color: '#04334c', padding: '4px 12px', borderRadius: '999px', fontSize: '13px', fontFamily: 'Cairo, sans-serif', fontWeight: '700' }}>مميز</span>}
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: '13px', color: '#9ca3af' }}>{article.date}</span>
          <span style={{ color: '#14b8a6' }}><CalendarIcon /></span>
        </div>
        <h3 style={{ fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: '18px', fontWeight: '700', color: t.text, marginBottom: '10px', lineHeight: 1.4, textAlign }}>{article.title}</h3>
        <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '14px', color: t.textMuted, lineHeight: 1.8, marginBottom: '16px', textAlign, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.excerpt}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: '13px', color: '#14b8a6', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#0d9488'} onMouseLeave={e => e.currentTarget.style.color = '#14b8a6'}
          >
            اقرأ المزيد <ArrowLeftIcon size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}

function ArticlesGrid() {
  const { t } = useTheme()
  const { lang, t: tr } = useLanguage()
  const [articles, setArticles] = useState(null)

  useEffect(() => {
    supabase.from('articles').select('*').order('sort_date', { ascending: false, nullsFirst: false }).order('id', { ascending: false }).limit(6).then(({ data }) => {
      setArticles(data || [])
    })
  }, [])

  const localized = (articles || []).map(a => localizeArticle(a, lang))

  return (
    <section style={{ backgroundColor: t.bg, padding: '80px 0', transition: 'background-color 0.3s' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ display: 'inline-block', backgroundColor: 'rgba(20,184,166,0.12)', color: '#0d7377', fontSize: '13px', fontWeight: '600', padding: '5px 14px', borderRadius: '999px', marginBottom: '16px', fontFamily: 'Cairo, sans-serif' }}>{tr('articles_pill')}</span>
          <h2 style={{ fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: '700', color: t.text, textAlign: 'center', marginBottom: '8px' }}>{tr('latest_articles_heading')}</h2>
          <div style={{ width: '40px', height: '3px', background: 'linear-gradient(to left, #c8a96e, #e8c98e)', borderRadius: '999px', margin: '0 auto' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {localized.map((article) => <ArticleCard key={article.id} article={article} />)}
        </div>
      </div>
    </section>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────
function Home() {
  const { dir } = useLanguage()
  return (
    <div dir={dir} style={{ overflowX: 'hidden', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <Hero />
        <BookFeature />
        <Profile />
        <ArticlesGrid />
      </main>
      <Footer />
    </div>
  )
}

// ─── Comments Section ──────────────────────────────────────────────────────────
function CommentsSection({ articleId }) {
  const { t } = useTheme()
  const [comments, setComments] = useState(null)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    if (!articleId) return
    const { data } = await supabase.from('article_comments').select('*').eq('article_id', articleId).order('created_at', { ascending: true })
    setComments(data || [])
  }

  useEffect(() => { load() }, [articleId])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setSubmitting(true)
    setError('')
    const { error } = await supabase.from('article_comments').insert({ article_id: articleId, name: name.trim(), message: message.trim() })
    if (error) {
      setError('حدث خطأ أثناء إرسال ردك، حاول مرة أخرى.')
    } else {
      setName('')
      setMessage('')
      await load()
    }
    setSubmitting(false)
  }

  if (!articleId) return null

  return (
    <section style={{ padding: '20px 0 60px' }}>
      <div style={{ maxWidth: '740px', margin: '0 auto', padding: '0 24px' }}>
        <h2 style={{ fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: '22px', fontWeight: '700', color: t.text, marginBottom: '24px', textAlign: 'right' }}>
          الردود
        </h2>

        {comments === null ? (
          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '14px', color: '#9ca3af' }}>جارٍ التحميل...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '36px' }}>
            {comments.map(c => (
              <div key={c.id} style={{ display: 'flex', gap: '14px', textAlign: 'right', justifyContent: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '14px', color: t.text, marginBottom: '4px' }}>
                    <span style={{ fontStyle: 'italic', fontWeight: '600' }}>{c.name}</span>:
                  </p>
                  <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', color: t.textBody, lineHeight: 1.9, whiteSpace: 'pre-line' }}>
                    {c.message}
                  </p>
                  <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '12px', color: '#9ca3af', marginTop: '6px' }}>
                    {new Date(c.created_at).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
                  backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#9ca3af', fontFamily: 'Cairo, sans-serif', fontWeight: '700', fontSize: '16px',
                }}>
                  {c.name.charAt(0)}
                </div>
              </div>
            ))}
            {comments.length === 0 && (
              <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '14px', color: '#9ca3af', textAlign: 'right' }}>
                لا توجد ردود بعد. كن أول من يعلق.
              </p>
            )}
          </div>
        )}

        <div style={{ backgroundColor: t.bgSoft, borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontFamily: 'Cairo, sans-serif', fontSize: '16px', fontWeight: '700', color: t.text, marginBottom: '16px', textAlign: 'right' }}>
            اترك ردًا
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="text" dir="rtl" placeholder="اسمك" value={name} onChange={e => setName(e.target.value)}
              required
              style={{
                fontFamily: 'Cairo, sans-serif', fontSize: '14px', padding: '10px 14px',
                borderRadius: '8px', border: `1px solid ${t.border}`, backgroundColor: t.inputBg,
                color: t.text, textAlign: 'right', outline: 'none',
              }}
            />
            <textarea
              dir="rtl" placeholder="اكتب تعليقًا..." value={message} onChange={e => setMessage(e.target.value)}
              rows={4} required
              style={{
                fontFamily: 'Cairo, sans-serif', fontSize: '14px', padding: '10px 14px',
                borderRadius: '8px', border: `1px solid ${t.border}`, backgroundColor: t.inputBg,
                color: t.text, textAlign: 'right', outline: 'none', resize: 'vertical',
              }}
            />
            {error && <p style={{ color: '#dc2626', fontSize: '13px', fontFamily: 'Cairo, sans-serif' }}>{error}</p>}
            <div>
              <button type="submit" disabled={submitting} style={{
                backgroundColor: '#14b8a6', color: '#fff', border: 'none',
                padding: '10px 28px', fontSize: '14px', fontFamily: 'Cairo, sans-serif', fontWeight: '700',
                borderRadius: '8px', cursor: 'pointer', opacity: submitting ? 0.6 : 1,
              }}>
                {submitting ? 'جارٍ الإرسال...' : 'تعليق'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

// ─── Single Article Page ──────────────────────────────────────────────────────
function ArticlePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTheme()
  const { lang, dir } = useLanguage()
  const [rawArticle, setRawArticle] = useState(undefined) // undefined = loading, null = not found
  const article = localizeArticle(rawArticle, lang)

  useEffect(() => {
    supabase.from('articles').select('*').eq('id', id).maybeSingle().then(({ data }) => {
      setRawArticle(data || null)
    })
  }, [id])

  if (article === undefined) {
    return (
      <div dir={dir} style={{ minHeight: '100vh', backgroundColor: t.bg }}>
        <Navbar />
        <main style={{ paddingTop: '140px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '16px', color: '#9ca3af' }}>جارٍ التحميل...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!article) {
    return (
      <div dir={dir} style={{ minHeight: '100vh', backgroundColor: t.bg }}>
        <Navbar />
        <main style={{ paddingTop: '140px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '18px', color: t.text }}>لم يتم العثور على المقال.</p>
          <button onClick={() => navigate('/articles')} style={{ marginTop: '16px', background: 'none', border: 'none', color: '#14b8a6', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: '15px', fontWeight: '700' }}>
            العودة إلى المقالات
          </button>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div dir={dir} style={{ overflowX: 'hidden', minHeight: '100vh', backgroundColor: t.bg }}>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <section style={{ padding: '48px 0 0' }}>
          <div style={{ maxWidth: '740px', margin: '0 auto', padding: '0 24px', textAlign: dir === 'ltr' ? 'left' : 'right' }}>
            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '13px', color: '#14b8a6', fontWeight: '600', marginBottom: '12px' }}>
              المدونة، مقالاتي
            </p>
            <h1 style={{ fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: '700', color: t.text, lineHeight: 1.4, marginBottom: '6px' }}>
              {article.title}
            </h1>
            <div style={{ width: '48px', height: '3px', backgroundColor: '#14b8a6', margin: dir === 'ltr' ? '16px 0' : '16px 0 16px auto' }} />
          </div>

          {article.img && (
            <div style={{ maxWidth: '740px', margin: '24px auto 0', padding: '0 24px' }}>
              <img src={article.img} alt={article.title} loading="lazy" style={{ width: '100%', height: 'auto', borderRadius: '10px', display: 'block' }} />
            </div>
          )}

          <div style={{ maxWidth: '740px', margin: '0 auto', padding: '32px 24px 0' }}>
            <div style={{ display: 'flex', gap: '8px', justifyContent: dir === 'ltr' ? 'flex-start' : 'flex-end', marginBottom: '24px' }}>
              <span style={{ backgroundColor: 'rgba(20,184,166,0.12)', color: '#0d7377', padding: '5px 14px', borderRadius: '999px', fontSize: '13px', fontFamily: 'Cairo, sans-serif', fontWeight: '600' }}>{article.category}</span>
              {article.featured && <span style={{ backgroundColor: 'rgba(200,169,110,0.15)', color: '#8a6d2f', padding: '5px 14px', borderRadius: '999px', fontSize: '13px', fontFamily: 'Cairo, sans-serif', fontWeight: '700' }}>مميز</span>}
              <span style={{ color: t.textMuted, fontSize: '13px', fontFamily: 'Cairo, sans-serif', alignSelf: 'center' }}>{article.date}</span>
            </div>
          </div>
        </section>

        <section style={{ padding: '0 0 80px' }}>
          <div style={{ maxWidth: '740px', margin: '0 auto', padding: '0 24px' }}>
            {/^\s*</.test(article.body) ? (
              // Rich text (HTML) written via the admin's editor
              <div
                className={dir === 'ltr' ? 'article-body-ltr' : 'article-body-rtl'}
                style={{
                  fontFamily: 'Cairo, sans-serif', fontSize: '17px', color: t.textBody,
                  lineHeight: 2.1, textAlign: dir === 'ltr' ? 'left' : 'right',
                }}
                dangerouslySetInnerHTML={{ __html: article.body }}
              />
            ) : (
              // Plain text (older articles saved before the rich text editor)
              article.body.split('\n\n').map((para, i) => (
                <p key={i} style={{
                  fontFamily: 'Cairo, sans-serif', fontSize: '17px', color: t.textBody,
                  lineHeight: 2.1, marginBottom: '24px', textAlign: dir === 'ltr' ? 'left' : 'right',
                }}>{para}</p>
              ))
            )}
            <button onClick={() => navigate('/articles')} style={{
              marginTop: '20px', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Cairo, sans-serif', fontSize: '14px', color: '#14b8a6', fontWeight: '700',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
            }}>
              <ArrowLeftIcon size={13} /> العودة إلى كل المقالات
            </button>
          </div>
        </section>

        <CommentsSection articleId={rawArticle?.id} />
        <Newsletter bgColor="#f0faf9" />
      </main>
      <Footer />
    </div>
  )
}

// ─── App with Router ──────────────────────────────────────────────────────────
export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <HashRouter>
          <ScrollToTop />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutMe />} />
              <Route path="/blog" element={<AboutBlog />} />
              <Route path="/books" element={<Books />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/article/:id" element={<ArticlePage />} />
              <Route path="/events" element={<Events />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Suspense>
        </HashRouter>
      </ThemeProvider>
    </LanguageProvider>
  )
}

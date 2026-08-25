import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { ThemeProvider, useTheme, ArticleCard as SharedArticleCard, Newsletter } from './shared'
import './index.css'
import heroImg from './assets/hero_new.jpeg'
import bookCoverImg from './assets/book_cover.png'
import profileAvatarImg from './assets/badr_profile.png'
import { supabase } from './supabaseClient'
import { LanguageProvider } from './LanguageContext'
import {
  Navbar, Footer, ScrollToTop,
  ArrowLeftIcon, CalendarIcon,
  EmailIcon, LinkedInIcon, YouTubeIcon, TwitterIcon,
} from './shared'
import AboutMe from './AboutMe'
import AboutBlog from './AboutBlog'
import Books from './Books'
import Articles from './Articles'
import Events from './Events'
import Admin from './Admin'

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  const navigate = useNavigate()
  return (
    <section style={{
      position: 'relative', width: '100%', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Hero background photo */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${heroImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }} />
      {/* White colour wash */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundColor: 'rgba(255,255,255,0.55)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.55) 45%, rgba(255,255,255,0.95) 85%, rgba(255,255,255,1) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to left, rgba(255,255,255,0.35) 0%, transparent 55%)',
      }} />

      {/* Main content — vertically centered */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', textAlign: 'center',
        padding: '0 24px',
      }}>
        <div style={{ marginBottom: '20px' }}>
          <span style={{
            backgroundColor: '#0d7377', color: '#ffffff',
            fontSize: '14px', fontWeight: '500',
            padding: '6px 18px', borderRadius: '999px',
            fontFamily: 'Cairo, sans-serif',
          }}>
            أحدث المقالات
          </span>
        </div>
        <h1 style={{
          fontFamily: 'Playfair Display, Cairo, sans-serif',
          fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: '700', color: '#04334c',
          marginBottom: '20px', lineHeight: 1.3,
          textShadow: '0 2px 12px rgba(255,255,255,0.6)',
        }}>
          هل أنت ضيف في المجلس؟
        </h1>
        <p style={{
          fontFamily: 'Cairo, sans-serif', fontSize: '18px',
          color: 'rgba(10,61,82,0.88)', maxWidth: '600px',
          margin: '0 auto 32px', lineHeight: 1.8,
        }}>
          من منّا لم يقابل ذلك الحكيم الصامت؟ الذي يتأمل عميقًا وينصت كثيرًا، ولكنه إذا نطق أبهر السامعين بخبرته وأقنعهم بفكرته.
        </p>
        <button
          style={{
            backgroundColor: '#14b8a6', color: '#ffffff',
            padding: '14px 32px', fontSize: '16px',
            fontFamily: 'Cairo, sans-serif', fontWeight: '600',
            border: 'none', borderRadius: '999px', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            boxShadow: '0 4px 20px rgba(20,184,166,0.4)',
            transition: 'background-color 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0d9488'; e.currentTarget.style.transform = 'scale(1.04)' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#14b8a6'; e.currentTarget.style.transform = 'scale(1)' }}
          onClick={() => navigate('/articles')}
        >
          أكمل القراءة
          <ArrowLeftIcon size={16} />
        </button>
      </div>
    </section>
  )
}

// ─── Book Feature ─────────────────────────────────────────────────────────────
function BookFeature() {
  const [bookHovered, setBookHovered] = useState(false)
  const navigate = useNavigate()
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
              سيرة غير ذاتية
            </h2>
            <p style={{
              fontFamily: 'Cairo, sans-serif', fontSize: '17px',
              color: 'rgba(255,255,255,0.80)', lineHeight: 1.85,
              marginBottom: '36px', maxWidth: '460px',
            }}>
              قصص وتجارب ملهمة في النجاح المهني والقيادة في بيئتنا. قصص تجارب حقيقية ألهمت الكثيرين في رحلة النجاح.
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
              عرض على الكتاب
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
              الكتب
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
        <span style={{ display: 'inline-block', backgroundColor: 'rgba(20,184,166,0.15)', color: '#0d7377', fontSize: '12px', fontWeight: '600', padding: '5px 14px', borderRadius: '999px', marginBottom: '16px', fontFamily: 'Cairo, sans-serif' }}>نبذة عني</span>
        <h2 style={{ fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: '700', color: t.text, marginBottom: '12px', transition: 'color 0.3s' }}>بدر بن حمود البدر</h2>
        <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '14px', color: '#0d7377', letterSpacing: '0.08em', marginBottom: '32px' }}>عضو مجلس إدارة · مؤلف · متحدث رئيسي</p>

        <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', color: t.textBody, lineHeight: 1.85, maxWidth: '560px', marginBottom: '32px', transition: 'color 0.3s' }}>
          مهتم بتمكين الشباب وقيادة التحول وريادة الأعمال. أرحب بكم في مدونتي التي أشارككم فيها تجاربي ومحطاتي.
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
  return (
    <div style={{ backgroundColor: t.surface, borderRadius: '12px', overflow: 'hidden', boxShadow: hovered ? t.shadowHover : t.shadow, transform: hovered ? 'translateY(-4px)' : 'translateY(0)', transition: 'all 0.25s ease', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/article/${article.id}`)}
    >
      <div style={{ height: '240px', background: article.bg, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {article.img ? (
          <>
            <img src={article.img} alt={article.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
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
        <h3 style={{ fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: '18px', fontWeight: '700', color: t.text, marginBottom: '10px', lineHeight: 1.4, textAlign: 'right' }}>{article.title}</h3>
        <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '14px', color: t.textMuted, lineHeight: 1.8, marginBottom: '16px', textAlign: 'right', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.excerpt}</p>
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
  const [articles, setArticles] = useState(null)

  useEffect(() => {
    supabase.from('articles').select('*').order('id', { ascending: false }).limit(6).then(({ data }) => {
      setArticles(data || [])
    })
  }, [])

  return (
    <section style={{ backgroundColor: t.bg, padding: '80px 0', transition: 'background-color 0.3s' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ display: 'inline-block', backgroundColor: 'rgba(20,184,166,0.12)', color: '#0d7377', fontSize: '13px', fontWeight: '600', padding: '5px 14px', borderRadius: '999px', marginBottom: '16px', fontFamily: 'Cairo, sans-serif' }}>المقالات</span>
          <h2 style={{ fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: '700', color: t.text, textAlign: 'center', marginBottom: '8px' }}>أحدث المقالات</h2>
          <div style={{ width: '40px', height: '3px', background: 'linear-gradient(to left, #c8a96e, #e8c98e)', borderRadius: '999px', margin: '0 auto' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {(articles || []).map((article) => <ArticleCard key={article.id} article={article} />)}
        </div>
      </div>
    </section>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────
function Home() {
  return (
    <div dir="rtl" style={{ overflowX: 'hidden', minHeight: '100vh' }}>
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

// ─── Single Article Page ──────────────────────────────────────────────────────
function ArticlePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTheme()
  const [article, setArticle] = useState(undefined) // undefined = loading, null = not found

  useEffect(() => {
    supabase.from('articles').select('*').eq('id', id).maybeSingle().then(({ data }) => {
      setArticle(data || null)
    })
  }, [id])

  if (article === undefined) {
    return (
      <div dir="rtl" style={{ minHeight: '100vh', backgroundColor: t.bg }}>
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
      <div dir="rtl" style={{ minHeight: '100vh', backgroundColor: t.bg }}>
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
    <div dir="rtl" style={{ overflowX: 'hidden', minHeight: '100vh', backgroundColor: t.bg }}>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <div style={{
          height: '360px', background: article.bg, position: 'relative',
          display: 'flex', alignItems: 'flex-end', overflow: 'hidden',
        }}>
          {article.img && (
            <>
              <img src={article.img} alt={article.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(4,51,76,0.25) 0%, rgba(4,51,76,0.85) 100%)' }} />
            </>
          )}
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', margin: '0 auto', padding: '0 24px 40px', width: '100%', textAlign: 'right' }}>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginBottom: '14px' }}>
              <span style={{ backgroundColor: '#14b8a6', color: '#fff', padding: '5px 14px', borderRadius: '999px', fontSize: '13px', fontFamily: 'Cairo, sans-serif', fontWeight: '600' }}>{article.category}</span>
              {article.featured && <span style={{ backgroundColor: '#c8a96e', color: '#04334c', padding: '5px 14px', borderRadius: '999px', fontSize: '13px', fontFamily: 'Cairo, sans-serif', fontWeight: '700' }}>مميز</span>}
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: '700', color: '#fff', lineHeight: 1.4, marginBottom: '10px' }}>
              {article.title}
            </h1>
            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>{article.date}</p>
          </div>
        </div>

        <section style={{ padding: '56px 0 80px' }}>
          <div style={{ maxWidth: '740px', margin: '0 auto', padding: '0 24px' }}>
            {article.body.split('\n\n').map((para, i) => (
              <p key={i} style={{
                fontFamily: 'Cairo, sans-serif', fontSize: '17px', color: t.textBody,
                lineHeight: 2.1, marginBottom: '24px', textAlign: 'right',
              }}>{para}</p>
            ))}
            <button onClick={() => navigate('/articles')} style={{
              marginTop: '20px', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Cairo, sans-serif', fontSize: '14px', color: '#14b8a6', fontWeight: '700',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
            }}>
              <ArrowLeftIcon size={13} /> العودة إلى كل المقالات
            </button>
          </div>
        </section>

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
        </HashRouter>
      </ThemeProvider>
    </LanguageProvider>
  )
}

/**
 * shared.jsx — icons, brand mark, Navbar, Footer, PageHero, Newsletter, ArticleCard
 */
import { useState, useEffect, createContext, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from './LanguageContext'

// ─── Theme system ─────────────────────────────────────────────────────────────
const light = {
  bg:          '#ffffff',
  bgSoft:      '#f0faf9',
  surface:     '#ffffff',
  surfaceAlt:  '#f8fafc',
  text:        '#04334c',
  textBody:    '#374151',
  textMuted:   '#6b7280',
  textSubtle:  '#9ca3af',
  border:      '#d1d5db',
  borderSoft:  'rgba(20,184,166,0.15)',
  shadow:      '0 4px 20px rgba(4,51,76,0.08)',
  shadowHover: '0 20px 48px rgba(4,51,76,0.16)',
  navBg:       '#04334c',
  inputBg:     '#ffffff',
}

const dark = {
  bg:          '#0b1e2d',
  bgSoft:      '#0d2438',
  surface:     '#112236',
  surfaceAlt:  '#0f2030',
  text:        '#e2eff8',
  textBody:    '#a8c5d6',
  textMuted:   '#6a95ab',
  textSubtle:  '#4a7a90',
  border:      'rgba(255,255,255,0.08)',
  borderSoft:  'rgba(20,184,166,0.22)',
  shadow:      '0 4px 20px rgba(0,0,0,0.30)',
  shadowHover: '0 20px 48px rgba(0,0,0,0.45)',
  navBg:       '#060f1a',
  inputBg:     '#0d2438',
}

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('albadr-theme')
    if (saved) return saved === 'dark'
    return false
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('albadr-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark(d => !d), t: isDark ? dark : light }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

// ─── Theme toggle icons ───────────────────────────────────────────────────────
const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

// ─── SVG Icons ────────────────────────────────────────────────────────────────
export const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

export const ArrowLeftIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
)

export const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

export const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

export const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
)

export const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
)

export const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

// ─── Brand mark ───────────────────────────────────────────────────────────────
export const AlbadrMark = ({ size = 40, color = '#14b8a6' }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="60" rx="12" fill={color} fillOpacity="0.18" />
    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
      fontFamily="Playfair Display, Cairo, sans-serif" fontSize="30" fontWeight="700" fill={color}>
      ب
    </text>
  </svg>
)

// ─── Navbar ───────────────────────────────────────────────────────────────────
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const location = useLocation()
  const { isDark, toggleTheme, t } = useTheme()
  const { lang, setLang, t: tr } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const navLinks = [
    { label: tr('nav_about'), to: '/about' },
    { label: tr('nav_blog'), to: '/blog' },
    { label: tr('nav_books'), to: '/books' },
    { label: tr('nav_articles'), to: '/articles' },
    { label: tr('nav_events'), to: '/events' },
  ]

  const linkStyle = (active) => ({
    color: active ? '#14b8a6' : '#ffffff',
    fontSize: '14px', fontWeight: active ? '700' : '500',
    textDecoration: 'none',
    opacity: active ? 1 : 0.85,
    fontFamily: 'Cairo, sans-serif',
    transition: 'opacity 0.2s, color 0.2s',
    borderBottom: active ? '2px solid #14b8a6' : '2px solid transparent',
    paddingBottom: '2px',
  })

  return (
    <nav style={{
      position: 'fixed', top: 0, right: 0, left: 0, zIndex: 50,
      backgroundColor: t.navBg,
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.35)' : 'none',
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    }}>
      {/* Main bar */}
      <div style={{
        height: '64px', maxWidth: '1600px', margin: '0 auto',
        padding: '0 clamp(12px, 3vw, 48px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <svg width="52" height="52" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" d="M273.7,308.8c1.4-16.3-32-62.4-49.5-94.2c-14.9-27-14.9-27.2-21.6-50.2
              c-6.8-22.9,5.4-43.2,5.4-43.2c1.9-2.2,13.6,13.4,24.6,33.2c10.9,19.8-6,53.7-6,53.7
              c-1.4,3.9,2.9,1.3,2.9,1.3c5.3-3.3,17.5-5.9,17.5-5.9c26.3-4.8,43.5,14.1,46.8,42.6
              C296.9,274.5,273.7,308.8,273.7,308.8
              M295.8,195.4c0,0-8.8-8.4-23.4-9.6c-8.1-0.6-18.8,0.8-28.8,7.3
              c0,0-7.1,2.9-1.7-6.6c4-7.1,18.7-36.9-2.3-65.2s-23.8-34.9-23.8-37.5
              c0-2.6-3.3,0.3-4.6,1.6c-1.3,1.3-17.7,14-4.2,31.7c0,0-27,33.3-16.6,69.8
              c0,0,7.9,28.9,20.5,48.3c12.6,19.5,33.7,52.4,36.9,60c3.2,7.6,26.6,42.9-1.1,87.9
              c0,0-19,27-20,32.8c-1,5.8-0.7,13.3,4,6.2c4.7-7.1,49.7-63.9,43.7-98.5l10.6-23.7
              C297.8,271.1,326.4,223.7,295.8,195.4"/>
            <path fill="#ffffff" d="M248.8,92.5c0,0,13.6-0.7,16.1-5.8c2.4-5.1,5.6-14.6,11.5-12.4
              c5.9,2.2,12.6,5.1,12.6,5.1s2.3,0.4,0.1,4.5c-2.1,4-7.9,14.9-7.9,14.9
              s-2.6,3.8-8,1.7c-5.5-2-18.1-7.2-23.6-6.7C249.7,93.8,244.8,93.8,248.8,92.5"/>
          </svg>
        </Link>

        {/* Desktop nav links */}
        <div className="desktop-nav" style={{ alignItems: 'center', gap: '32px' }}>
          {navLinks.map((link) => {
            const active = location.pathname === link.to
            return (
              <Link key={link.label} to={link.to} style={linkStyle(active)}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#14b8a6' }}
                onMouseLeave={e => {
                  e.currentTarget.style.opacity = active ? '1' : '0.85'
                  e.currentTarget.style.color = active ? '#14b8a6' : '#ffffff'
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {/* Language dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              aria-label="اختر اللغة"
              onClick={() => setLangMenuOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                color: '#ffffff', background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                cursor: 'pointer', padding: '6px 10px', borderRadius: '8px',
                fontFamily: 'Cairo, sans-serif', fontSize: '13px', fontWeight: '600',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            >
              <span style={{ fontSize: '15px' }}>{lang === 'ar' ? '🇸🇦' : '🌐'}</span>
              <span>{lang === 'ar' ? 'AR' : 'EN'}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: langMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {langMenuOpen && (
              <>
                <div onClick={() => setLangMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 59 }} />
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                  backgroundColor: '#ffffff', borderRadius: '10px',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.18)',
                  minWidth: '160px', overflow: 'hidden', zIndex: 60,
                }}>
                  <button
                    onClick={() => { setLang('ar'); setLangMenuOpen(false) }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                      padding: '12px 16px', background: lang === 'ar' ? 'rgba(20,184,166,0.1)' : 'transparent',
                      border: 'none', cursor: 'pointer', textAlign: 'right',
                      fontFamily: 'Cairo, sans-serif', fontSize: '14px', fontWeight: '600', color: '#04334c',
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>🇸🇦</span>
                    <span>العربية</span>
                    {lang === 'ar' && <span style={{ marginRight: 'auto', color: '#14b8a6' }}>✓</span>}
                  </button>
                  <button
                    onClick={() => { setLang('en'); setLangMenuOpen(false) }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                      padding: '12px 16px', background: lang === 'en' ? 'rgba(20,184,166,0.1)' : 'transparent',
                      border: 'none', cursor: 'pointer', textAlign: 'right',
                      fontFamily: 'Cairo, sans-serif', fontSize: '14px', fontWeight: '600', color: '#04334c',
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>🌐</span>
                    <span>English</span>
                    {lang === 'en' && <span style={{ marginRight: 'auto', color: '#14b8a6' }}>✓</span>}
                  </button>
                </div>
              </>
            )}
          </div>
          {/* Search — desktop only */}
          <button aria-label={tr('search')} className="desktop-only" style={{
            color: '#ffffff', opacity: 0.8, background: 'none', border: 'none',
            cursor: 'pointer', padding: '8px', borderRadius: '8px',
            alignItems: 'center', transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
          >
            <SearchIcon />
          </button>
          {/* Theme toggle */}
          <button
            aria-label={isDark ? 'الوضع النهاري' : 'الوضع الليلي'}
            onClick={toggleTheme}
            style={{
              color: isDark ? '#fbbf24' : '#ffffff',
              background: isDark ? 'rgba(251,191,36,0.12)' : 'rgba(255,255,255,0.1)',
              border: isDark ? '1px solid rgba(251,191,36,0.25)' : '1px solid rgba(255,255,255,0.15)',
              cursor: 'pointer', padding: '7px', borderRadius: '8px',
              display: 'flex', alignItems: 'center',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          {/* Hamburger — mobile only */}
          <button
            aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#ffffff', padding: '8px', borderRadius: '8px',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{
          backgroundColor: t.navBg,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '12px 0 20px',
        }}>
          {navLinks.map((link) => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '13px clamp(16px, 4vw, 32px)',
                  fontFamily: 'Cairo, sans-serif', fontSize: '15px',
                  fontWeight: active ? '700' : '500',
                  color: active ? '#14b8a6' : 'rgba(255,255,255,0.88)',
                  textDecoration: 'none',
                  borderRight: active ? '3px solid #14b8a6' : '3px solid transparent',
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export function Footer() {
  const { t: tr } = useLanguage()
  const quickLinks = [
    { label: tr('nav_about'), to: '/about' },
    { label: tr('footer_link_blog'), to: '/blog' },
    { label: tr('nav_books'), to: '/books' },
    { label: tr('footer_link_articles'), to: '/articles' },
    { label: tr('nav_events'), to: '/events' },
  ]
  const socials = [
    { icon: <EmailIcon />, label: 'البريد' },
    { icon: <LinkedInIcon />, label: 'لينكد إن' },
    { icon: <YouTubeIcon />, label: 'يوتيوب' },
    { icon: <TwitterIcon />, label: 'تويتر' },
  ]

  return (
    <footer style={{ backgroundColor: '#04334c' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px 0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px', paddingBottom: '48px',
        }}>
          {/* Brand */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-end', marginBottom: '16px' }}>
              <svg width="44" height="44" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <path fill="#ffffff" d="M273.7,308.8c1.4-16.3-32-62.4-49.5-94.2c-14.9-27-14.9-27.2-21.6-50.2
                  c-6.8-22.9,5.4-43.2,5.4-43.2c1.9-2.2,13.6,13.4,24.6,33.2c10.9,19.8-6,53.7-6,53.7
                  c-1.4,3.9,2.9,1.3,2.9,1.3c5.3-3.3,17.5-5.9,17.5-5.9c26.3-4.8,43.5,14.1,46.8,42.6
                  C296.9,274.5,273.7,308.8,273.7,308.8
                  M295.8,195.4c0,0-8.8-8.4-23.4-9.6c-8.1-0.6-18.8,0.8-28.8,7.3
                  c0,0-7.1,2.9-1.7-6.6c4-7.1,18.7-36.9-2.3-65.2s-23.8-34.9-23.8-37.5
                  c0-2.6-3.3,0.3-4.6,1.6c-1.3,1.3-17.7,14-4.2,31.7c0,0-27,33.3-16.6,69.8
                  c0,0,7.9,28.9,20.5,48.3c12.6,19.5,33.7,52.4,36.9,60c3.2,7.6,26.6,42.9-1.1,87.9
                  c0,0-19,27-20,32.8c-1,5.8-0.7,13.3,4,6.2c4.7-7.1,49.7-63.9,43.7-98.5l10.6-23.7
                  C297.8,271.1,326.4,223.7,295.8,195.4"/>
                <path fill="#ffffff" d="M248.8,92.5c0,0,13.6-0.7,16.1-5.8c2.4-5.1,5.6-14.6,11.5-12.4
                  c5.9,2.2,12.6,5.1,12.6,5.1s2.3,0.4,0.1,4.5c-2.1,4-7.9,14.9-7.9,14.9
                  s-2.6,3.8-8,1.7c-5.5-2-18.1-7.2-23.6-6.7C249.7,93.8,244.8,93.8,248.8,92.5"/>
              </svg>
            </div>
            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, maxWidth: '220px' }}>
              {tr('footer_tagline')}
            </p>
          </div>

          {/* Quick links */}
          <div style={{ textAlign: 'right' }}>
            <h4 style={{ fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: '16px', fontWeight: '700', color: '#ffffff', marginBottom: '20px' }}>
              {tr('footer_quick_links')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {quickLinks.map((link) => (
                <li key={link.label} style={{ marginBottom: '10px' }}>
                  <Link to={link.to} style={{ fontFamily: 'Cairo, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#14b8a6'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div style={{ textAlign: 'right' }}>
            <h4 style={{ fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: '16px', fontWeight: '700', color: '#ffffff', marginBottom: '20px' }}>
              {tr('footer_contact_me')}
            </h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {socials.map((s) => (
                <button key={s.label} aria-label={s.label} style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background-color 0.2s, transform 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#14b8a6'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', paddingBottom: '24px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
            © {new Date().getFullYear()} بدر بن حمود البدر — {tr('footer_rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── PageHero — shared hero for all inner pages ───────────────────────────────
export function PageHero({ pill, heading, subtitle }) {
  return (
    <section style={{
      position: 'relative', width: '100%', height: '220px',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      overflow: 'hidden', backgroundColor: '#04334c',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(155deg, #021520 0%, #04334c 45%, #07445e 100%)',
      }} />
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.05,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div style={{
          position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,115,119,0.18) 0%, transparent 65%)',
          top: '-120px', right: '-60px',
        }} />
        <div style={{
          position: 'absolute', width: '340px', height: '340px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)',
          bottom: '-40px', left: '18%',
        }} />
      </div>
      {/* Double gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, transparent 25%, rgba(4,51,76,0.88) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(4,51,76,0.55) 0%, transparent 55%)' }} />
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', padding: '0 24px 40px' }}>
        <div style={{ marginBottom: '14px' }}>
          <span style={{
            backgroundColor: '#0d7377', color: '#ffffff',
            fontSize: '13px', fontWeight: '600', padding: '5px 16px',
            borderRadius: '999px', fontFamily: 'Cairo, sans-serif',
          }}>{pill}</span>
        </div>
        <h1 style={{
          fontFamily: 'Playfair Display, Cairo, sans-serif',
          fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '700', color: '#ffffff',
          marginBottom: '10px', lineHeight: 1.25,
          textShadow: '0 2px 16px rgba(0,0,0,0.35)',
        }}>{heading}</h1>
        <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '18px', color: 'rgba(255,255,255,0.70)' }}>
          {subtitle}
        </p>
      </div>
    </section>
  )
}

// ─── SectionHeader — reusable pill + h2 block ─────────────────────────────────
export function SectionHeader({ pill, title, centered = true }) {
  const { t } = useTheme()
  return (
    <div style={{ textAlign: centered ? 'center' : 'right', marginBottom: '48px' }}>
      <span style={{
        display: 'inline-block', backgroundColor: 'rgba(20,184,166,0.13)',
        color: '#0d7377', fontSize: '13px', fontWeight: '600',
        padding: '5px 14px', borderRadius: '999px', marginBottom: '14px',
        fontFamily: 'Cairo, sans-serif',
      }}>{pill}</span>
      <h2 style={{
        fontFamily: 'Playfair Display, Cairo, sans-serif',
        fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: '700', color: t.text,
      }}>{title}</h2>
    </div>
  )
}

// ─── ArticleCard — identical to homepage card ─────────────────────────────────
export function ArticleCard({ article }) {
  const [hovered, setHovered] = useState(false)
  const { t } = useTheme()
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/article/${article.id}`)} style={{
      backgroundColor: t.surface, borderRadius: '12px', overflow: 'hidden',
      boxShadow: hovered ? t.shadowHover : t.shadow,
      transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      transition: 'all 0.25s ease', cursor: 'pointer',
    }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
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
        <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
          <span style={{ backgroundColor: '#14b8a6', color: '#fff', padding: '4px 12px', borderRadius: '999px', fontSize: '13px', fontFamily: 'Cairo, sans-serif', fontWeight: '500' }}>{article.category}</span>
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
            onMouseEnter={e => e.currentTarget.style.color = '#0d9488'} onMouseLeave={e => e.currentTarget.style.color = '#14b8a6'}>
            اقرأ المزيد <ArrowLeftIcon size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Newsletter — shared across all pages ─────────────────────────────────────
export function Newsletter({ bgColor = '#f0faf9' }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { isDark, t } = useTheme()
  const handleSubmit = (e) => { e.preventDefault(); if (email && name) setSubmitted(true) }
  const sectionBg = isDark ? t.bgSoft : bgColor
  const inp = {
    fontFamily: 'Cairo, sans-serif', fontSize: '15px', color: t.text,
    backgroundColor: t.inputBg, border: `1.5px solid ${t.borderSoft}`,
    borderRadius: '10px', padding: '13px 18px', outline: 'none', width: '100%',
    transition: 'border-color 0.2s', textAlign: 'right', direction: 'rtl',
  }
  return (
    <section style={{ backgroundColor: sectionBg, padding: '80px 0' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <span style={{ display: 'inline-block', backgroundColor: 'rgba(20,184,166,0.15)', color: '#0d7377', fontSize: '13px', fontWeight: '600', padding: '5px 14px', borderRadius: '999px', marginBottom: '16px', fontFamily: 'Cairo, sans-serif' }}>النشرة البريدية</span>
        <h2 style={{ fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: '700', color: t.text, marginBottom: '12px' }}>ابقَ على تواصل</h2>
        <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', color: t.textMuted, lineHeight: 1.8, maxWidth: '460px', margin: '0 auto 36px' }}>اشترك في نشرتي البريدية لتصلك أحدث المقالات والأفكار حول القيادة والتحول وريادة الأعمال مباشرةً إلى بريدك.</p>
        {submitted ? (
          <div style={{ backgroundColor: t.surface, borderRadius: '16px', padding: '32px 24px', boxShadow: t.shadow, border: `1.5px solid ${t.borderSoft}` }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: 'rgba(20,184,166,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <p style={{ fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: '20px', fontWeight: '700', color: t.text, marginBottom: '8px' }}>شكرًا على اشتراكك!</p>
            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '14px', color: t.textMuted }}>سيصلك أول محتوى جديد قريبًا بإذن الله.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ backgroundColor: t.surface, borderRadius: '20px', padding: '32px 28px', boxShadow: t.shadow, border: `1px solid ${t.borderSoft}` }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input type="text" placeholder="الاسم الكريم" value={name} onChange={e => setName(e.target.value)} required style={inp} onFocus={e => e.target.style.borderColor = '#14b8a6'} onBlur={e => e.target.style.borderColor = t.borderSoft} />
              <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)} required dir="ltr" style={{ ...inp, textAlign: 'left' }} onFocus={e => e.target.style.borderColor = '#14b8a6'} onBlur={e => e.target.style.borderColor = t.borderSoft} />
              <button type="submit" style={{ backgroundColor: '#14b8a6', color: '#fff', padding: '14px 28px', fontSize: '16px', fontFamily: 'Cairo, sans-serif', fontWeight: '700', border: 'none', borderRadius: '10px', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'background-color 0.2s, transform 0.15s', boxShadow: '0 4px 16px rgba(20,184,166,0.3)' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0d9488'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#14b8a6'; e.currentTarget.style.transform = 'translateY(0)' }}>
                اشترك الآن <ArrowLeftIcon size={16} />
              </button>
            </div>
            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '13px', color: t.textSubtle, marginTop: '14px' }}>لن نشارك بريدك مع أي طرف آخر. يمكنك إلغاء الاشتراك في أي وقت.</p>
          </form>
        )}
      </div>
    </section>
  )
}

// ─── ScrollToTop — resets scroll on route change ─────────────────────────────
export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

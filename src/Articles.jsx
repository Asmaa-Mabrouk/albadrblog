import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Navbar, Footer, PageHero, SectionHeader, ArticleCard, Newsletter, ArrowLeftIcon, useTheme } from './shared'
import profileAvatarImg from './assets/badr_profile.webp'
import { supabase } from './supabaseClient'
import { useLanguage, localizeArticle, usePageContent } from './LanguageContext'

const ALL_CATEGORY = 'الكل'

// ─── Welcome section ──────────────────────────────────────────────────────────
function WelcomeSection() {
  const { t } = useTheme()
  const { t: tr, dir } = useLanguage()
  const align = dir === 'ltr' ? 'left' : 'right'
  const { get } = usePageContent('about')
  const intro2 = get('about_intro_2', 'اسمي بدر بن حمود البدر، مهتم بتمكين الشباب وقيادة التحول وريادة الأعمال بالإضافة إلى توجيه المؤسسات ومساعدتها على إيجاد حلول مستدامة.')
  const intro3 = get('about_intro_3', 'بالنسبة لي، المواقف الصعبة هي مصدر تحفيز فأنا أجد متعتي بالعمل في فترات عدم اليقين، وأوقات التغيير السريع وأجدها فرصة لتحليل الواقع وتصور المستقبل وحل المشكلات.')
  return (
    <section style={{
      backgroundColor: t.bg,
      padding: '72px 0 64px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Soft background wash */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 50%, rgba(20,184,166,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1060px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', gap: '56px',
        }}>

          {/* ── Left: Avatar column ── */}
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <div style={{
              width: '196px', height: '196px', borderRadius: '50%',
              outline: '4px solid #14b8a6',
              outlineOffset: '4px',
              overflow: 'hidden',
              boxShadow: '0 8px 28px rgba(0,0,0,0.12)',
            }}>
              <img
                src={profileAvatarImg}
                alt="بدر بن حمود البدر"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Name tag below photo */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <p style={{
                fontFamily: 'Playfair Display, Cairo, sans-serif',
                fontSize: '16px', fontWeight: '700',
                color: t.text, marginBottom: '4px',
              }}>
                بدر بن حمود البدر
              </p>
              <p style={{
                fontFamily: 'Cairo, sans-serif', fontSize: '13px',
                color: '#14b8a6', fontWeight: '600',
              }}>
                {tr('role_tagline')}
              </p>
            </div>
          </div>

          {/* ── Right: Text column ── */}
          <div style={{ flex: '1 1 340px', textAlign: align, position: 'relative' }}>

            {/* Giant decorative quote mark */}
            <div style={{
              position: 'absolute', top: '-32px', right: '-16px',
              fontFamily: 'Georgia, serif', fontSize: '160px',
              color: 'rgba(20,184,166,0.08)', lineHeight: 1,
              userSelect: 'none', pointerEvents: 'none',
            }}>«</div>

            {/* Welcome heading */}
            <h2 style={{
              fontFamily: 'Playfair Display, Cairo, sans-serif',
              fontSize: 'clamp(22px, 2.8vw, 30px)',
              fontWeight: '700', color: t.text,
              lineHeight: 1.6, marginBottom: '28px',
              position: 'relative', zIndex: 1,
            }}>
              {tr('welcome_heading')}
            </h2>

            {/* Gold thin divider */}
            <div style={{
              width: '48px', height: '2px',
              background: 'linear-gradient(to left, #c8a96e, #e8c98e)',
              borderRadius: '999px', marginBottom: '24px', marginRight: 0,
            }} />

            {/* Para 1 */}
            <p style={{
              fontFamily: 'Cairo, sans-serif',
              fontSize: '15px', color: t.textBody,
              lineHeight: 1.95, marginBottom: '18px', textAlign: align,
            }}>
              {intro2}
            </p>

            {/* Para 2 */}
            <p style={{
              fontFamily: 'Cairo, sans-serif',
              fontSize: '15px', color: t.textBody,
              lineHeight: 1.95, marginBottom: '32px', textAlign: align,
            }}>
              {intro3}
            </p>

            {/* Bottom accent line */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(to left, rgba(20,184,166,0.4), transparent)',
            }} />
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Filter bar ───────────────────────────────────────────────────────────────
function FilterBar({ active, onSelect, categories }) {
  const { t } = useTheme()
  return (
    <div style={{
      position: 'sticky', top: '64px', zIndex: 40,
      backgroundColor: t.bg,
      borderBottom: `1px solid ${t.border}`,
      padding: '14px 24px',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', gap: '10px',
        overflowX: 'auto', justifyContent: 'center',
        scrollbarWidth: 'none',
      }}>
        {categories.map((cat, i) => (
          <button key={cat} onClick={() => onSelect(i === 0 ? null : cat)} style={{
            backgroundColor: (i === 0 ? active === null : active === cat) ? '#14b8a6' : t.bgSoft,
            color: (i === 0 ? active === null : active === cat) ? '#ffffff' : '#0d7377',
            border: 'none', borderRadius: '999px',
            padding: '8px 20px', fontSize: '14px',
            fontFamily: 'Cairo, sans-serif', fontWeight: '600',
            cursor: 'pointer', whiteSpace: 'nowrap',
            transition: 'background-color 0.2s, color 0.2s, transform 0.15s',
            boxShadow: (i === 0 ? active === null : active === cat) ? '0 3px 12px rgba(20,184,166,0.3)' : 'none',
          }}
            onMouseEnter={e => { if (!(i === 0 ? active === null : active === cat)) e.currentTarget.style.backgroundColor = 'rgba(20,184,166,0.15)' }}
            onMouseLeave={e => { if (!(i === 0 ? active === null : active === cat)) e.currentTarget.style.backgroundColor = t.bgSoft }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function Pagination() {
  const [current, setCurrent] = useState(1)
  const pages = [1, 2, 3]
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '52px' }}>
      {/* Prev */}
      <button style={{
        width: '40px', height: '40px', borderRadius: '50%',
        border: '2px solid rgba(20,184,166,0.35)',
        backgroundColor: 'transparent', color: '#14b8a6',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background-color 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(20,184,166,0.1)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        aria-label="السابق"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
      </button>

      {pages.map(p => (
        <button key={p} onClick={() => setCurrent(p)} style={{
          width: '40px', height: '40px', borderRadius: '50%',
          border: `2px solid ${current === p ? '#14b8a6' : 'rgba(20,184,166,0.35)'}`,
          backgroundColor: current === p ? '#14b8a6' : 'transparent',
          color: current === p ? '#ffffff' : '#14b8a6',
          cursor: 'pointer',
          fontFamily: 'Cairo, sans-serif', fontSize: '15px', fontWeight: '700',
          transition: 'background-color 0.2s, color 0.2s',
        }}>
          {p}
        </button>
      ))}

      {/* Next */}
      <button style={{
        width: '40px', height: '40px', borderRadius: '50%',
        border: '2px solid rgba(20,184,166,0.35)',
        backgroundColor: 'transparent', color: '#14b8a6',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background-color 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(20,184,166,0.1)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        aria-label="التالي"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 5 5 12 12 19" />
        </svg>
      </button>
    </div>
  )
}

// ─── Page root ────────────────────────────────────────────────────────────────
export default function Articles() {
  const [activeCategory, setActiveCategory] = useState(null) // null = "all"
  const [articles, setArticles] = useState(null)
  const { t } = useTheme()
  const { lang, t: tr, dir } = useLanguage()
  const [searchParams] = useSearchParams()
  const searchQuery = (searchParams.get('q') || '').trim().toLowerCase()

  useEffect(() => {
    supabase.from('articles').select('id, title, category, excerpt, date, sort_date, featured, bg, img, title_en, excerpt_en, date_en').order('sort_date', { ascending: false, nullsFirst: false }).order('id', { ascending: false }).then(({ data }) => {
      setArticles(data || [])
    })
  }, [])

  const localized = (articles || []).map(a => localizeArticle(a, lang))
  const searched = searchQuery
    ? localized.filter(a => (a.title || '').toLowerCase().includes(searchQuery) || (a.excerpt || '').toLowerCase().includes(searchQuery))
    : localized
  const allLabel = tr('all_category')
  const categories = [allLabel, ...new Set(searched.map(a => a.category))]
  const filtered = !articles ? [] : activeCategory === null
    ? searched
    : searched.filter(a => a.category === activeCategory)

  return (
    <div dir={dir} style={{ overflowX: 'hidden', minHeight: '100vh', backgroundColor: t.bg }}>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <PageHero pill="المقالات" heading="مقالاتي" subtitle="أفكار وتجارب في القيادة والنجاح" />
        <WelcomeSection />
        <FilterBar active={activeCategory} onSelect={setActiveCategory} categories={categories} />

        {/* Articles grid */}
        <section style={{ backgroundColor: t.bg, padding: '60px 0 80px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            {articles === null ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '16px', color: '#9ca3af' }}>جارٍ التحميل...</p>
              </div>
            ) : filtered.length > 0 ? (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                  {filtered.map(article => <ArticleCard key={article.id} article={article} />)}
                </div>
                <Pagination />
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '16px', color: '#9ca3af' }}>
                  {searchQuery ? `لا توجد نتائج بحث عن "${searchParams.get('q')}".` : 'لا توجد مقالات في هذا التصنيف حاليًا.'}
                </p>
              </div>
            )}
          </div>
        </section>

        <Newsletter bgColor="#f0faf9" />
      </main>
      <Footer />
    </div>
  )
}

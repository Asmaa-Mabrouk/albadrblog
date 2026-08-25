import { useState } from 'react'
import { Navbar, Footer, PageHero, SectionHeader, ArticleCard, Newsletter, ArrowLeftIcon, useTheme } from './shared'
import profileAvatarImg from './assets/badr_profile.png'
import ARTICLES from './data/articles.json'

// ─── All articles data ─────────────────────────────────────────────────────────
const ALL_ARTICLES = ARTICLES

const CATEGORIES = ['الكل', 'القيادة', 'التحول', 'الشباب', 'ريادة', 'المهنة', 'الإدارة']

// ─── Welcome section ──────────────────────────────────────────────────────────
function WelcomeSection() {
  const { t } = useTheme()
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
                قائد · مؤلف · متحدث
              </p>
            </div>
          </div>

          {/* ── Right: Text column ── */}
          <div style={{ flex: '1 1 340px', textAlign: 'right', position: 'relative' }}>

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
              أرحب بكم هنا في{' '}
              <span style={{ color: '#14b8a6' }}>مدونتي</span>
              {' '}والتي أدوّن بها بعضًا من{' '}
              <span style={{ color: '#14b8a6' }}>تجاربي ومحطاتي</span>
              {' '}في رحلة{' '}
              <span style={{ color: '#c8a96e' }}>آمل أن تتكلل بالنجاح.</span>
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
              lineHeight: 1.95, marginBottom: '18px', textAlign: 'right',
            }}>
              اسمي <span style={{ fontWeight: '700', color: t.text }}>بدر بن حمود البدر</span>، مهتم بتمكين الشباب وقيادة التحول وريادة الأعمال، بالإضافة إلى توجيه المؤسسات ومساعدتها على إيجاد حلول مستدامة.
            </p>

            {/* Para 2 */}
            <p style={{
              fontFamily: 'Cairo, sans-serif',
              fontSize: '15px', color: t.textBody,
              lineHeight: 1.95, marginBottom: '32px', textAlign: 'right',
            }}>
              بالنسبة لي، المواقف الصعبة هي{' '}
              <span style={{ color: '#14b8a6', fontWeight: '600' }}>مصدر تحفيز</span>
              ؛ فأنا أستمتع بالعمل في فترات عدم اليقين وفي أوقات التغيير السريع، وأجدها فرصة لتحليل الواقع وتصوّر المستقبل وحل المشكلات.
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
function FilterBar({ active, onSelect }) {
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
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => onSelect(cat)} style={{
            backgroundColor: active === cat ? '#14b8a6' : t.bgSoft,
            color: active === cat ? '#ffffff' : '#0d7377',
            border: 'none', borderRadius: '999px',
            padding: '8px 20px', fontSize: '14px',
            fontFamily: 'Cairo, sans-serif', fontWeight: '600',
            cursor: 'pointer', whiteSpace: 'nowrap',
            transition: 'background-color 0.2s, color 0.2s, transform 0.15s',
            boxShadow: active === cat ? '0 3px 12px rgba(20,184,166,0.3)' : 'none',
          }}
            onMouseEnter={e => { if (active !== cat) e.currentTarget.style.backgroundColor = 'rgba(20,184,166,0.15)' }}
            onMouseLeave={e => { if (active !== cat) e.currentTarget.style.backgroundColor = t.bgSoft }}
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
  const [activeCategory, setActiveCategory] = useState('الكل')
  const { t } = useTheme()

  const filtered = activeCategory === 'الكل'
    ? ALL_ARTICLES
    : ALL_ARTICLES.filter(a => a.category === activeCategory)

  return (
    <div dir="rtl" style={{ overflowX: 'hidden', minHeight: '100vh', backgroundColor: t.bg }}>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <PageHero pill="المقالات" heading="مقالاتي" subtitle="أفكار وتجارب في القيادة والنجاح" />
        <WelcomeSection />
        <FilterBar active={activeCategory} onSelect={setActiveCategory} />

        {/* Articles grid */}
        <section style={{ backgroundColor: t.bg, padding: '60px 0 80px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            {filtered.length > 0 ? (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                  {filtered.map(article => <ArticleCard key={article.id} article={article} />)}
                </div>
                <Pagination />
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '16px', color: '#9ca3af' }}>
                  لا توجد مقالات في هذا التصنيف حاليًا.
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

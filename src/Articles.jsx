import { useState } from 'react'
import { Navbar, Footer, PageHero, SectionHeader, ArticleCard, Newsletter, ArrowLeftIcon, useTheme } from './shared'
import profileAvatarImg from './assets/badr_profile.png'
import artImg1 from './assets/articles/imgi_10_tim-marshall-WUwKbFL81mw-unsplash-300x200.jpg'
import artImg2 from './assets/articles/imgi_27_EI-copy-e1717586612304-1024x694.jpg'
import artImg3 from './assets/articles/imgi_49_MicrosoftTeams-image-10-1024x768.jpg'
import artImg4 from './assets/articles/imgi_20_MicrosoftTeams-image-54-768x768.png'
import artImg5 from './assets/articles/imgi_45_pascal-van-de-vendel-RqjNWnQbWGU-unsplash-1-1024x731.jpg'
import artImg6 from './assets/articles/imgi_42_WFH.-2-2-1536x1024.jpg'
import artImg7 from './assets/articles/imgi_7_Picture1-1-300x300.png'
import artImg8 from './assets/articles/imgi_17_IMG_1724-2-e1711534233915-768x1024.png'
import artImg9 from './assets/articles/imgi_6_IMG_8349-300x199.jpg'

// ─── All articles data ─────────────────────────────────────────────────────────
const ALL_ARTICLES = [
  { id: 1, title: 'تمكين الشباب في عصر التحديات', category: 'الشباب', excerpt: 'نقاش معمّق حول دور الجيل الجديد في صياغة مستقبل الأمة وتحدياتهم في عالم متسارع التحولات.', date: '١٠ أبريل ٢٠٢٦', featured: false, bg: 'linear-gradient(135deg, #04334c 0%, #0a6b6b 100%)', img: artImg1 },
  { id: 2, title: 'قيادة التحول في المؤسسات', category: 'التحول', excerpt: 'كيف تقود تحولًا حقيقيًا في بيئة المؤسسات؟ أدوات ومناهج مجربة من تجارب قيادية فعلية.', date: '٢ أبريل ٢٠٢٦', featured: false, bg: 'linear-gradient(148deg, #04334c 0%, #0c7070 100%)', img: artImg2 },
  { id: 3, title: 'هل أنت ضيف في المجلس؟', category: 'القيادة', excerpt: 'من منّا لم يقابل ذلك الحكيم الصامت الذي يتأمل عميقًا وينصت كثيرًا، ولكنه إذا نطق أبهر السامعين.', date: '٢٠ مارس ٢٠٢٦', featured: true, bg: 'linear-gradient(122deg, #04334c 0%, #085f6a 100%)', img: artImg3 },
  { id: 4, title: 'فن القيادة الفعّالة', category: 'القيادة', excerpt: 'القيادة الحقيقية ليست لقبًا أو منصبًا، بل هي أثر تتركه في قلوب من تقودهم وعقولهم.', date: '١٥ مارس ٢٠٢٦', featured: false, bg: 'linear-gradient(140deg, #04334c 0%, #0b6870 100%)', img: artImg4 },
  { id: 5, title: 'ريادة الأعمال في المنطقة', category: 'ريادة', excerpt: 'المنطقة تعيش لحظة تاريخية فارقة. رواد الأعمال اليوم يبنون ما سيستفيد منه الجيل القادم.', date: '٨ مارس ٢٠٢٦', featured: false, bg: 'linear-gradient(130deg, #04334c 0%, #096565 100%)', img: artImg5 },
  { id: 6, title: 'استراتيجيات النجاح المهني', category: 'المهنة', excerpt: 'النجاح المهني لا يأتي بالصدفة، بل هو نتاج قرارات ذكية واستثمار مستمر في النمو الشخصي.', date: '١ مارس ٢٠٢٦', featured: false, bg: 'linear-gradient(145deg, #04334c 0%, #0a6b6b 100%)', img: artImg6 },
  { id: 7, title: 'مهارة تحتاجها حتى لو كنت عبقريًا', category: 'القيادة', excerpt: 'الذكاء وحده لا يكفي. ثمة مهارة واحدة تجعل الموهبة تُترجم إلى نتائج ملموسة في كل مرحلة.', date: '٢٢ فبراير ٢٠٢٦', featured: false, bg: 'linear-gradient(125deg, #04334c 0%, #0c6e6e 100%)', img: artImg7 },
  { id: 8, title: 'ماذا يخبرك رمضان عن نفسك؟', category: 'الإدارة', excerpt: 'الشهر الكريم مرآة صادقة تكشف عن طبيعتك الحقيقية في إدارة الوقت والطاقة وترتيب الأولويات.', date: '١٢ فبراير ٢٠٢٦', featured: false, bg: 'linear-gradient(138deg, #04334c 0%, #085e6a 100%)', img: artImg8 },
  { id: 9, title: 'مهارة يغفل عنها الكثيرون', category: 'المهنة', excerpt: 'مهارة التواصل الفعّال أعمق من مجرد الكلام. تعرّف على البُعد الخفي الذي يُفرق بين المؤثر والمهمَّش.', date: '3 فبراير ٢٠٢٦', featured: false, bg: 'linear-gradient(142deg, #04334c 0%, #0b6570 100%)', img: artImg9 },
]

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

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, Footer, ArrowLeftIcon, CalendarIcon, useTheme } from './shared'
import { supabase } from './supabaseClient'
import { useLanguage, localizeArticle } from './LanguageContext'

// ─── Topic icons ──────────────────────────────────────────────────────────────
const LeadershipIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
    fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
    fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
    fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)

// ─── Local article card ───────────────────────────────────────────────────────
function ArticleCard({ article }) {
  const [hovered, setHovered] = useState(false)
  const { t } = useTheme()
  const navigate = useNavigate()
  return (
    <div style={{
      backgroundColor: t.surface, borderRadius: '12px', overflow: 'hidden',
      boxShadow: hovered ? t.shadowHover : t.shadow,
      transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      transition: 'all 0.25s ease', cursor: 'pointer',
    }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/article/${article.id}`)}
    >
      {/* Image */}
      <div style={{
        height: '240px', background: article.bg, position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        {article.img ? (
          <>
            <img src={article.img} alt={article.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(4,51,76,0.18) 0%, rgba(4,51,76,0.55) 100%)' }} />
          </>
        ) : (
          <>
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.1,
              backgroundImage: 'radial-gradient(circle at 25% 75%, white 1.5px, transparent 1.5px), radial-gradient(circle at 75% 25%, white 1.5px, transparent 1.5px)',
              backgroundSize: '28px 28px',
            }} />
            <span style={{
              fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: '72px',
              color: 'rgba(255,255,255,0.12)', fontWeight: '700', userSelect: 'none',
            }}>
              {article.title.charAt(0)}
            </span>
          </>
        )}
        <div style={{
          position: 'absolute', top: '12px', right: '12px',
          display: 'flex', gap: '6px', justifyContent: 'flex-end',
        }}>
          <span style={{
            backgroundColor: '#14b8a6', color: '#ffffff',
            padding: '4px 12px', borderRadius: '999px',
            fontSize: '12px', fontFamily: 'Cairo, sans-serif', fontWeight: '500',
          }}>
            {article.category}
          </span>
          {article.featured && (
            <span style={{
              backgroundColor: '#04334c', color: '#14b8a6',
              padding: '4px 12px', borderRadius: '999px',
              fontSize: '12px', fontFamily: 'Cairo, sans-serif', fontWeight: '700',
              border: '1px solid rgba(20,184,166,0.4)',
            }}>مميز</span>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: '13px', color: t.textSubtle }}>{article.date}</span>
          <span style={{ color: '#14b8a6' }}><CalendarIcon /></span>
        </div>
        <h3 style={{
          fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: '18px', fontWeight: '700',
          color: t.text, marginBottom: '10px', lineHeight: 1.4, textAlign: 'right',
        }}>{article.title}</h3>
        <p style={{
          fontFamily: 'Cairo, sans-serif', fontSize: '14px', color: t.textMuted,
          lineHeight: 1.7, marginBottom: '16px', textAlign: 'right',
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{article.excerpt}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Cairo, sans-serif', fontSize: '13px',
            color: '#14b8a6', fontWeight: '700',
            display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#0d9488'}
            onMouseLeave={e => e.currentTarget.style.color = '#14b8a6'}
          >
            اقرأ المزيد <ArrowLeftIcon size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const questions = [
  'هل أنت قيادي صاعد ومتفتح وتتطلع للنجاح؟',
  'هل تريد تطوير ذاتك وأساليب إدارتك من خلال فهم نماذج عالمية وتجارب محلية؟',
  'هل تقود الآخرين سواء كنت مديراً أو موظفاً وسواء كان عملك ريادياً أو تطوعياً أو حكومياً؟',
]

const topics = [
  {
    icon: <LeadershipIcon />,
    title: 'القيادة وإدارة الفرق',
    desc: 'أساليب عملية لبناء فرق متماسكة، وتوجيه المواهب، وترسيخ ثقافة الأداء العالي داخل المؤسسات بمختلف أحجامها.',
  },
  {
    icon: <ClockIcon />,
    title: 'إدارة الذات والوقت',
    desc: 'أدوات وعادات ثبتت فاعليتها في تحقيق التوازن بين الطموح والراحة، وفي بناء عقلية تُنجز أكثر بجهد أذكى لا بساعات أطول.',
  },
  {
    icon: <RocketIcon />,
    title: 'ريادة الأعمال والتحول',
    desc: 'قراءة معمّقة في مشهد ريادة الأعمال الإقليمي، واستراتيجيات التحول المؤسسي في ظل التسارع التقني وتحولات السوق.',
  },
]



// ─── Section: Hero ────────────────────────────────────────────────────────────
function BlogHero() {
  return (
    <section style={{
      position: 'relative', width: '100%', height: '320px',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      overflow: 'hidden', backgroundColor: '#04334c',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(155deg, #021520 0%, #04334c 45%, #07445e 100%)',
      }} />
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 36px, rgba(20,184,166,0.8) 36px, rgba(20,184,166,0.8) 37px)',
        }} />
        <div style={{
          position: 'absolute', width: '560px', height: '560px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,115,119,0.18) 0%, transparent 65%)',
          top: '-140px', right: '-60px',
        }} />
        <div style={{
          position: 'absolute', width: '360px', height: '360px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)',
          bottom: '-60px', left: '20%',
        }} />
        {[...Array(7)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            bottom: 0,
            right: `${8 + i * 13}%`,
            width: `${28 + (i % 3) * 10}px`,
            height: `${80 + (i % 4) * 30}px`,
            background: `rgba(${i % 2 === 0 ? '13,115,119' : '4,51,76'}, ${0.25 + (i % 3) * 0.08})`,
            borderRadius: '3px 3px 0 0',
          }} />
        ))}
      </div>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent 0%, transparent 25%, rgba(4,51,76,0.88) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to left, rgba(4,51,76,0.55) 0%, transparent 55%)',
      }} />
      <div style={{
        position: 'relative', zIndex: 10, textAlign: 'center',
        width: '100%', padding: '0 24px 40px',
      }}>
        <div style={{ marginBottom: '14px' }}>
          <span style={{
            backgroundColor: '#0d7377', color: '#ffffff',
            fontSize: '13px', fontWeight: '600',
            padding: '5px 16px', borderRadius: '999px',
            fontFamily: 'Cairo, sans-serif',
          }}>
            عن المدونة
          </span>
        </div>
        <h1 style={{
          fontFamily: 'Playfair Display, Cairo, sans-serif',
          fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '700', color: '#ffffff',
          marginBottom: '10px', lineHeight: 1.25,
          textShadow: '0 2px 16px rgba(0,0,0,0.35)',
        }}>
          عن المدونة
        </h1>
        <p style={{
          fontFamily: 'Cairo, sans-serif',
          fontSize: '18px', color: 'rgba(255,255,255,0.70)',
        }}>
          النجاح رحلة وليس غاية
        </p>
      </div>
    </section>
  )
}

// ─── Section: Intro content ───────────────────────────────────────────────────
function IntroContent() {
  const { t } = useTheme()

  return (
    <section style={{ backgroundColor: t.bg, padding: '60px 0' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 24px' }}>

        {/* Bold questions */}
        <div style={{ marginBottom: '36px' }}>
          {questions.map((q, i) => (
            <p key={i} style={{
              fontFamily: 'Cairo, sans-serif',
              fontSize: '18px',
              fontWeight: '700',
              color: t.text,
              lineHeight: 1.8,
              marginBottom: '10px',
              textAlign: 'right',
            }}>
              {q}
            </p>
          ))}
        </div>

        {/* Body paragraphs */}
        <p style={{
          fontFamily: 'Cairo, sans-serif', fontSize: '16px', color: t.textBody,
          lineHeight: 1.9, marginBottom: '18px', textAlign: 'right',
        }}>
          <a href="/about" style={{ color: '#14b8a6', textDecoration: 'none', fontWeight: '600' }}>
            أنا بدر البدر
          </a>
          ، مررت برحلة عديدة في العمل الحكومي والأكاديمي وريادة الأعمال وإدارة الشركات متعددة الجنسية وقيادة المنظمات المحلية الكبرى.
        </p>

        <p style={{
          fontFamily: 'Cairo, sans-serif', fontSize: '16px', color: t.textBody,
          lineHeight: 1.9, marginBottom: '18px', textAlign: 'right',
        }}>
          تعلمت من تجاربي ومن فشلي الكثير! وأسعد أني تعلمت من هذا الفشل أضعاف ما تعلمته من تجاربي.
        </p>

        <p style={{
          fontFamily: 'Cairo, sans-serif', fontSize: '16px', color: t.textBody,
          lineHeight: 1.9, marginBottom: '0', textAlign: 'right',
        }}>
          أنشأت هذه المدونة بعدما شعرت بأن هناك شباباً يريد توثيق الأفكار والتجارب القيادية باللغة العربية وبطريقة مبسطة يفهمها الجميع. فمن خلالها أطمع لمساعدتك في فهم وتطبيق نماذج إدارية وقيادية مبسطة. ولذلك أدعوك للنجاح في مهنتك. فالمدونة تُقدم ما تعلمته في رحلتي المهنية، في أسلوب القيادة وإدارة الذات. وتتناول أيضاً إدارة الذات والوقت والنجاح في الحياة، وأحياناً أدوّن مجرد تجاربي الشخصية وطموحاتي.
        </p>
      </div>
    </section>
  )
}

// ─── Section: Topic cards ──────────────────────────────────────────────────────
function TopicCards() {
  const { t } = useTheme()
  return (
    <section style={{ backgroundColor: t.bgSoft, padding: '80px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: 'rgba(20,184,166,0.12)',
            color: '#0d7377',
            fontSize: '12px', fontWeight: '600',
            padding: '5px 14px', borderRadius: '999px',
            marginBottom: '14px', fontFamily: 'Cairo, sans-serif',
          }}>
            المحاور
          </span>
          <h2 style={{
            fontFamily: 'Playfair Display, Cairo, sans-serif',
            fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: '700', color: t.text,
          }}>
            ماذا ستجد هنا؟
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {topics.map((topic) => (
            <TopicCard key={topic.title} topic={topic} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TopicCard({ topic }) {
  const [hovered, setHovered] = useState(false)
  const { t } = useTheme()
  return (
    <div
      style={{
        backgroundColor: t.surface,
        borderRadius: '16px',
        borderTop: '4px solid #14b8a6',
        padding: '28px',
        boxShadow: hovered ? t.shadowHover : t.shadow,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.25s ease',
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: '44px', height: '44px', borderRadius: '50%',
        backgroundColor: t.bgSoft,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '18px', marginRight: 'auto',
      }}>
        {topic.icon}
      </div>

      <h3 style={{
        fontFamily: 'Playfair Display, Cairo, sans-serif',
        fontSize: '18px', fontWeight: '700',
        color: t.text, marginBottom: '12px',
        textAlign: 'right', lineHeight: 1.4,
      }}>
        {topic.title}
      </h3>
      <p style={{
        fontFamily: 'Cairo, sans-serif',
        fontSize: '14px', color: t.textMuted,
        lineHeight: 1.8, textAlign: 'right',
      }}>
        {topic.desc}
      </p>
    </div>
  )
}

// ─── Section: Popular articles ────────────────────────────────────────────────
function PopularArticles() {
  const navigate = useNavigate()
  const { t } = useTheme()
  const { lang } = useLanguage()
  const [popularArticles, setPopularArticles] = useState([])

  useEffect(() => {
    supabase.from('articles').select('*').order('featured', { ascending: false }).order('id', { ascending: false }).limit(2).then(({ data }) => {
      setPopularArticles(data || [])
    })
  }, [])

  const localized = popularArticles.map(a => localizeArticle(a, lang))

  return (
    <section style={{ backgroundColor: t.bgSoft, padding: '80px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: 'rgba(20,184,166,0.15)',
            color: '#0d7377',
            fontSize: '12px', fontWeight: '600',
            padding: '5px 14px', borderRadius: '999px',
            marginBottom: '14px', fontFamily: 'Cairo, sans-serif',
          }}>
            المقالات
          </span>
          <h2 style={{
            fontFamily: 'Playfair Display, Cairo, sans-serif',
            fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: '700', color: t.text,
          }}>
            أكثر المقالات تداولًا
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          maxWidth: '840px',
          margin: '0 auto',
        }}>
          {localized.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button style={{
            backgroundColor: 'transparent', color: '#14b8a6',
            border: '2px solid #14b8a6',
            padding: '12px 32px', fontSize: '15px',
            fontFamily: 'Cairo, sans-serif', fontWeight: '600',
            borderRadius: '999px', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            transition: 'background-color 0.2s, color 0.2s',
          }}
            onClick={() => navigate('/articles')}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#14b8a6'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#14b8a6' }}
          >
            عرض جميع المقالات
            <ArrowLeftIcon size={15} />
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Section: Newsletter ──────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { t } = useTheme()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && name) setSubmitted(true)
  }

  const inputStyle = {
    fontFamily: 'Cairo, sans-serif', fontSize: '15px',
    color: t.text, backgroundColor: t.inputBg,
    border: `1px solid ${t.border}`,
    borderRadius: '6px', padding: '10px 14px',
    outline: 'none', width: '100%',
    transition: 'border-color 0.2s',
    textAlign: 'right', direction: 'rtl',
    boxSizing: 'border-box',
  }

  return (
    <section style={{ backgroundColor: t.bg, padding: '0 0 80px' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 24px', textAlign: 'right' }}>
        <p style={{
          fontFamily: 'Cairo, sans-serif',
          fontSize: '18px', fontWeight: '700', color: t.text,
          marginBottom: '24px',
        }}>
          اشترك في النشرة البريدية للمدونة
        </p>

        {submitted ? (
          <div style={{
            backgroundColor: t.bgSoft, borderRadius: '16px', padding: '32px 24px',
            boxShadow: t.shadow,
            border: `1.5px solid ${t.borderSoft}`,
          }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '50%',
              backgroundColor: 'rgba(20,184,166,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p style={{ fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: '20px', fontWeight: '700', color: t.text, marginBottom: '8px' }}>
              شكرًا على اشتراكك!
            </p>
            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '14px', color: t.textMuted }}>
              سيصلك أول محتوى جديد قريبًا بإذن الله.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '400px' }}>
            <div>
              <label style={{ fontFamily: 'Cairo, sans-serif', fontSize: '14px', color: t.textBody, display: 'block', marginBottom: '4px' }}>
                البريد الإلكتروني
              </label>
              <input type="email" placeholder="البريد الإلكتروني" value={email}
                onChange={e => setEmail(e.target.value)} required
                dir="ltr" style={{ ...inputStyle, textAlign: 'left' }}
                onFocus={e => e.target.style.borderColor = '#14b8a6'}
                onBlur={e => e.target.style.borderColor = t.border}
              />
            </div>
            <div>
              <label style={{ fontFamily: 'Cairo, sans-serif', fontSize: '14px', color: t.textBody, display: 'block', marginBottom: '4px' }}>
                الاسم
              </label>
              <input type="text" placeholder="اسمك" value={name}
                onChange={e => setName(e.target.value)} required style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#14b8a6'}
                onBlur={e => e.target.style.borderColor = t.border}
              />
            </div>
            <div>
              <button type="submit" style={{
                backgroundColor: '#14b8a6', color: '#ffffff',
                padding: '10px 28px', fontSize: '15px',
                fontFamily: 'Cairo, sans-serif', fontWeight: '600',
                border: 'none', borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0d9488'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#14b8a6'}
              >
                انضم الآن
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

// ─── Page root ────────────────────────────────────────────────────────────────
export default function AboutBlog() {
  const { t } = useTheme()
  return (
    <div dir="rtl" style={{ overflowX: 'hidden', minHeight: '100vh', backgroundColor: t.bg }}>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <BlogHero />
        <IntroContent />
        <TopicCards />
        <PopularArticles />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

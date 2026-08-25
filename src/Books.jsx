import { useState } from 'react'
import { Navbar, Footer, PageHero, SectionHeader, ArrowLeftIcon, useTheme } from './shared'
import bookCoverImg from './assets/book_cover.png'
import padWithHandImg from './assets/pad_with_hand.png'
import profileAvatarImg from './assets/badr_profile.png'

// ─── Icons ────────────────────────────────────────────────────────────────────
const ExternalLinkIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const DownloadIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const chapters = [
  { num: '١', title: 'البداية من الصفر', desc: 'كيف تبني مسيرتك المهنية على أسس راسخة حين لا تملك شيئًا سوى الطموح والرغبة في التعلم.' },
  { num: '٢', title: 'القائد الذي لم يكن يعلم أنه قائد', desc: 'قصة اكتشاف الذات ومحطات التحول التي أعادت تعريفي لنفسي ولدوري في المحيطين بي.' },
  { num: '٣', title: 'فن الاستماع قبل الكلام', desc: 'الصمت الذكي والإنصات العميق مهارة نادرة تفصل بين من يفهم ومن يُسمع فقط.' },
  { num: '٤', title: 'الفشل كمحطة لا كنهاية', desc: 'أصعب اللحظات التي مررت بها وما علّمتني إياه عن المثابرة وإعادة ترتيب الأولويات.' },
  { num: '٥', title: 'بناء فريق لا ينكسر', desc: 'أسرار بناء الفرق عالية الأداء وكيف تحوّل الاختلاف في الشخصيات إلى قوة جماعية.' },
  { num: '٦', title: 'قرارات صعبة في أوقات أصعب', desc: 'منهجية اتخاذ القرارات المصيرية تحت الضغط وكيف تتعامل مع حالة الغموض دون شلل.' },
  { num: '٧', title: 'الأثر الذي تتركه خلفك', desc: 'القيادة التي تُورَث لا التي تنتهي بانتهاء المنصب، وكيف تبني إرثًا يتجاوز عمرك المهني.' },
]

// ─── Book cover shared component ──────────────────────────────────────────────
function BookCover({ tilt = true }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        transform: hovered ? 'rotate(-2deg) scale(1.04)' : tilt ? 'rotate(-5deg)' : 'rotate(0deg)',
        WebkitFilter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.5))',
        filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.5))',
        transition: 'transform 0.4s ease', cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <img
        src={bookCoverImg}
        alt="سيرة غير ذاتية"
        style={{ width: '280px', height: 'auto', borderRadius: '8px', display: 'block' }}
      />
    </div>
  )
}

// ─── Author intro ─────────────────────────────────────────────────────────────
function AuthorIntro() {
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

// ─── Main book feature ────────────────────────────────────────────────────────
function MainBookFeature() {
  return (
    <section style={{ backgroundColor: '#04334c', padding: '52px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '48px' }}>

          {/* Right: text */}
          <div style={{ flex: '1 1 320px', textAlign: 'right' }}>

            {/* Pill */}
            <span style={{
              display: 'inline-block', backgroundColor: 'rgba(20,184,166,0.18)',
              color: '#14b8a6', fontSize: '13px', fontWeight: '700',
              padding: '4px 14px', borderRadius: '999px', marginBottom: '14px',
              fontFamily: 'Cairo, sans-serif', border: '1px solid rgba(20,184,166,0.3)',
            }}>
              الإصدار الأول
            </span>

            {/* Addressing line */}
            <p style={{
              fontFamily: 'Playfair Display, Cairo, sans-serif',
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              color: 'rgba(255,255,255,0.70)',
              lineHeight: 1.6, marginBottom: '8px',
            }}>
              لكل شاب يطمح للنجاح في حياته المهنية ..
            </p>

            {/* Pitch */}
            <p style={{
              fontFamily: 'Cairo, sans-serif',
              fontSize: '14px',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.8, marginBottom: '20px',
              maxWidth: '440px',
            }}>
              أقدم لك كتابًا يوفر لك إلهامًا ينير دربك، وإرشادًا يخفف حيرتك أمام المواقف المهنية الصعبة والقرارات المصيرية.
            </p>

            {/* Gold divider */}
            <div style={{
              width: '40px', height: '2px',
              background: 'linear-gradient(to left, #c8a96e, #e8c98e)',
              borderRadius: '999px', marginBottom: '18px',
            }} />

            {/* Book title */}
            <h2 style={{
              fontFamily: 'Playfair Display, Cairo, sans-serif',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '700', color: '#ffffff',
              marginBottom: '8px', lineHeight: 1.2,
            }}>
              سيرة غير ذاتية
            </h2>

            {/* Subtitle */}
            <p style={{
              fontFamily: 'Cairo, sans-serif', fontSize: '15px',
              color: 'rgba(255,255,255,0.68)', lineHeight: 1.6, marginBottom: '6px',
            }}>
              قصص وتجارب ملهمة في النجاح المهني والقيادة
            </p>

            {/* Author */}
            <p style={{
              fontFamily: 'Playfair Display, Cairo, sans-serif',
              fontSize: '13px', color: '#c8a96e',
              fontWeight: '600', marginBottom: '24px',
            }}>
              بقلم: بدر بن حمود البدر
            </p>

            {/* CTA buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'flex-end' }}>
              <button style={{
                backgroundColor: '#14b8a6', color: '#fff',
                padding: '11px 26px', fontSize: '14px',
                fontFamily: 'Cairo, sans-serif', fontWeight: '700',
                border: 'none', borderRadius: '999px', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                boxShadow: '0 4px 16px rgba(20,184,166,0.35)',
                transition: 'background-color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0d9488'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#14b8a6'}
              >
                اشتر الكتاب <ExternalLinkIcon size={14} />
              </button>
              <button style={{
                backgroundColor: 'transparent', color: '#ffffff',
                padding: '10px 22px', fontSize: '14px',
                fontFamily: 'Cairo, sans-serif', fontWeight: '600',
                border: '2px solid rgba(255,255,255,0.4)', borderRadius: '999px', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#14b8a6'; e.currentTarget.style.color = '#14b8a6' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#ffffff' }}
              >
                حمّل الفصلين الأولين <DownloadIcon size={14} />
              </button>
            </div>
          </div>

          {/* Left: book cover */}
          <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
            <BookCover tilt={true} />
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Why read ─────────────────────────────────────────────────────────────────
function WhyRead() {
  const { t } = useTheme()
  const points = [
    { label: 'تجارب حقيقية', desc: 'مسيرة من الواقع' },
    { label: 'أسلوب سردي', desc: 'سلس وجذاب' },
    { label: 'دروس عملية', desc: 'قابلة للتطبيق' },
  ]
  return (
    <section style={{ backgroundColor: t.bgSoft, padding: '80px 0' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px' }}>
        <SectionHeader pill="عن الكتاب" title="لماذا تقرأ هذا الكتاب؟" />
        <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '16px', color: t.textBody, lineHeight: 1.9, textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          ليس هذا كتابًا عن نجاحاتي، بل هو صفحات من مسيرة إنسانية بكل ما فيها من تعثر وانتصار. أكتب لأنني أؤمن أن التجارب المُعاشة — بصدقها ومرارتها وعذوبتها — تستطيع أن تُلهم وأن تُقنع وأن تُغير. كل قصة في هذا الكتاب هي مفتاح لباب قد تكون تقف أمامه الآن.
        </p>
        {/* Mini feature pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
          {points.map(p => (
            <div key={p.label} style={{
              backgroundColor: t.surface, borderRadius: '12px',
              padding: '18px 28px', textAlign: 'center',
              boxShadow: t.shadow,
              minWidth: '140px',
            }}>
              <p style={{ fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: '16px', fontWeight: '700', color: '#14b8a6', marginBottom: '4px' }}>{p.label}</p>
              <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '13px', color: t.textMuted }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Reviews ─────────────────────────────────────────────────────────────────
const reviews = [
  {
    name: 'Dr Jomah Hamid',
    initials: 'JH',
    text: 'باستعراض سريع للمقدمة أجده كتابًا عمليًا ينقل تجربة قائد إداري لم يتورع عن نقل تجربته الخاصة بما فيها من مرارة أحيانًا لاستنباط الحِكَم. أثنيك على هذه الخطوة، وجميل جدًا أن نرى القياديين ينكبون على نقل تجاربهم مع تحليلها من صعاب للقراء للاستفادة. شكرًا على المشاركة.',
  },
  {
    name: 'Essam Obaid',
    initials: 'EO',
    text: 'موضوع هام لشباب رجال الأعمال والخريجين للاطلاع لإيجاد قدوة يحتذوا عنها. شكرًا على الموضوع أستاذ بدر.',
  },
  {
    name: 'Hamad AlSaghir',
    initials: 'HS',
    text: 'ألف مبروك د. بدر. كتاب سوف يكون خارطة طريق لقادة المستقبل. قراءة ممتعة للجميع.',
  },
  {
    name: 'Dr Obaid Alabdali',
    initials: 'OA',
    text: 'سيرة غير ذاتية للصديق الدكتور بدر البدر، كل شوق للاطلاع عليه، وأنصح الشباب والشابات للاستفادة منه.',
  },
]

function ReviewCard({ review }) {
  const [hovered, setHovered] = useState(false)
  const { t } = useTheme()
  return (
    <div
      style={{
        backgroundColor: t.surface,
        borderRadius: '16px',
        padding: '28px 28px 24px',
        boxShadow: hovered ? t.shadowHover : t.shadow,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.25s ease',
        display: 'flex', flexDirection: 'column', gap: '18px',
        borderTop: `3px solid ${t.bgSoft}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Quote mark */}
      <div style={{
        fontFamily: 'Georgia, serif', fontSize: '48px',
        color: 'rgba(20,184,166,0.18)', lineHeight: 1,
        textAlign: 'right', marginBottom: '-12px',
      }}>
        "
      </div>

      {/* Review text */}
      <p style={{
        fontFamily: 'Cairo, sans-serif',
        fontSize: '15px', color: t.textBody,
        lineHeight: 1.85, textAlign: 'right', flex: 1,
      }}>
        {review.text}
      </p>

      {/* Divider */}
      <div style={{ height: '1px', backgroundColor: t.bgSoft }} />

      {/* Reviewer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-end' }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{
            fontFamily: 'Cairo, sans-serif', fontSize: '14px',
            fontWeight: '700', color: t.text, margin: 0,
          }}>
            {review.name}
          </p>
        </div>
        {/* Avatar circle with initials */}
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #04334c, #0d7377)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 4px 12px rgba(4,51,76,0.2)',
        }}>
          <span style={{
            fontFamily: 'Cairo, sans-serif', fontSize: '13px',
            fontWeight: '700', color: '#ffffff', letterSpacing: '0.05em',
          }}>
            {review.initials}
          </span>
        </div>
      </div>
    </div>
  )
}

function ReviewsSection() {
  const { t } = useTheme()
  return (
    <section style={{ backgroundColor: t.bgSoft, padding: '90px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: 'rgba(20,184,166,0.13)', color: '#0d7377',
            fontSize: '13px', fontWeight: '600',
            padding: '5px 16px', borderRadius: '999px',
            marginBottom: '16px', fontFamily: 'Cairo, sans-serif',
          }}>
            عن الكتاب
          </span>
          <h2 style={{
            fontFamily: 'Playfair Display, Cairo, sans-serif',
            fontSize: 'clamp(26px, 3.5vw, 36px)',
            fontWeight: '700', color: t.text,
            marginBottom: '8px',
          }}>
            ماذا قال القراء؟
          </h2>
          <div style={{
            width: '40px', height: '3px',
            background: 'linear-gradient(to left, #c8a96e, #e8c98e)',
            borderRadius: '999px', margin: '12px auto 0',
          }} />
        </div>

        {/* 2×2 Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {reviews.map(r => <ReviewCard key={r.name} review={r} />)}
        </div>

      </div>
    </section>
  )
}

// ─── Digital edition section ──────────────────────────────────────────────────
function DigitalEdition() {
  const [hovered, setHovered] = useState(false)
  return (
    <section style={{ backgroundColor: '#04334c', padding: '72px 0' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '48px' }}>
          {/* Tablet image */}
          <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
            <div
              style={{
                transform: hovered ? 'translateY(-6px) scale(1.03)' : 'translateY(0)',
                WebkitFilter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.5))',
                filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.5))',
                transition: 'transform 0.4s ease', cursor: 'pointer',
              }}
              onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            >
              <img src={padWithHandImg} alt="الإصدار الرقمي" style={{ width: '220px', height: 'auto', display: 'block' }} />
            </div>
          </div>
          {/* Text */}
          <div style={{ flex: '1 1 280px', textAlign: 'right' }}>
            <span style={{
              display: 'inline-block', backgroundColor: 'rgba(20,184,166,0.18)',
              color: '#14b8a6', fontSize: '12px', fontWeight: '700',
              padding: '5px 14px', borderRadius: '999px', marginBottom: '18px',
              fontFamily: 'Cairo, sans-serif', border: '1px solid rgba(20,184,166,0.3)',
            }}>
              الإصدار الرقمي
            </span>
            <h3 style={{
              fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: 'clamp(22px, 3vw, 28px)',
              fontWeight: '700', color: '#ffffff', marginBottom: '14px', lineHeight: 1.4,
            }}>
              اقرأه أينما كنت
            </h3>
            <p style={{
              fontFamily: 'Cairo, sans-serif', fontSize: '15px',
              color: 'rgba(255,255,255,0.72)', lineHeight: 1.85, marginBottom: '28px', maxWidth: '420px',
            }}>
              الكتاب متاح أيضًا بنسخة رقمية كاملة يمكن قراءتها على أي جهاز — في أي وقت وأي مكان. حمّل الفصلين الأولين مجانًا وابدأ رحلتك الآن.
            </p>
            <button style={{
              backgroundColor: '#14b8a6', color: '#fff',
              padding: '12px 26px', fontSize: '15px',
              fontFamily: 'Cairo, sans-serif', fontWeight: '700',
              border: 'none', borderRadius: '999px', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              boxShadow: '0 4px 16px rgba(20,184,166,0.3)',
              transition: 'background-color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0d9488'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#14b8a6'}
            >
              حمّل الفصلين الأولين مجانًا
              <ArrowLeftIcon size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Chapters grid ────────────────────────────────────────────────────────────
function ChapterCard({ chapter }) {
  const [hovered, setHovered] = useState(false)
  const { t } = useTheme()
  return (
    <div style={{
      backgroundColor: t.surface, borderRadius: '12px', padding: '24px',
      position: 'relative',
      boxShadow: hovered ? t.shadowHover : t.shadow,
      transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      transition: 'all 0.25s ease', cursor: 'default',
    }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Chapter number badge */}
      <span style={{
        position: 'absolute', top: '16px', right: '16px',
        backgroundColor: '#14b8a6', color: '#ffffff',
        fontSize: '13px', fontWeight: '700',
        padding: '3px 10px', borderRadius: '999px',
        fontFamily: 'Cairo, sans-serif',
      }}>{chapter.num}</span>
      {/* Icon */}
      <div style={{ marginBottom: '14px', paddingTop: '8px' }}>
        <BookOpenIcon />
      </div>
      <h3 style={{ fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: '16px', fontWeight: '700', color: t.text, marginBottom: '10px', lineHeight: 1.4, textAlign: 'right', paddingLeft: '48px' }}>
        {chapter.title}
      </h3>
      <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '13px', color: t.textMuted, lineHeight: 1.75, textAlign: 'right' }}>
        {chapter.desc}
      </p>
    </div>
  )
}

function ChaptersGrid() {
  const { t } = useTheme()
  return (
    <section style={{ backgroundColor: t.bg, padding: '80px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <SectionHeader pill="محتوى الكتاب" title="فصول الكتاب" />
        {/* Flex-wrap for centered last row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {chapters.map(ch => (
            <div key={ch.num} style={{ width: 'calc(33.333% - 14px)', minWidth: '260px', flex: '1 1 260px', maxWidth: '340px' }}>
              <ChapterCard chapter={ch} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA strip ──────────────────────────────────────────────────────────
function CtaStrip() {
  return (
    <section style={{
      backgroundColor: '#04334c', padding: '64px 24px',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 50%, rgba(13,115,119,0.18) 0%, transparent 65%)' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: '700', color: '#ffffff', marginBottom: '24px' }}>
          اشتر الكتاب الآن
        </h2>
        <button style={{
          backgroundColor: '#ffffff', color: '#04334c',
          padding: '14px 36px', fontSize: '16px',
          fontFamily: 'Cairo, sans-serif', fontWeight: '700',
          border: 'none', borderRadius: '999px', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          boxShadow: '0 6px 24px rgba(0,0,0,0.2)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(0,0,0,0.3)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.2)' }}
        >
          اشتر من المتاجر الإلكترونية <ExternalLinkIcon size={15} />
        </button>
      </div>
    </section>
  )
}

// ─── Newsletter — identical to the "عن المدونة" page ──────────────────────────
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
export default function Books() {
  const { t } = useTheme()
  return (
    <div dir="rtl" style={{ overflowX: 'hidden', minHeight: '100vh', backgroundColor: t.bg }}>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <PageHero pill="الكتب" heading="كتبي" subtitle="إصدارات في القيادة والنجاح المهني" />
        <AuthorIntro />
        <MainBookFeature />
        <WhyRead />
        <ReviewsSection />
        <DigitalEdition />
        <ChaptersGrid />
        <CtaStrip />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

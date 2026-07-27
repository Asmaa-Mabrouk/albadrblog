import { useState } from 'react'
import { Navbar, Footer, PageHero, SectionHeader, Newsletter, ArrowLeftIcon, EmailIcon, useTheme } from './shared'

// ─── Icons ────────────────────────────────────────────────────────────────────
const MicIcon = ({ size = 22 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const speakingTopics = ['القيادة والتحول', 'ريادة الأعمال', 'تمكين الشباب']

const statsData = [
  { number: '١٠٠+', label: 'محاضرة' },
  { number: '٢٠+', label: 'سنة خبرة' },
  { number: '١٠+', label: 'مؤتمر دولي' },
]

const podcasts = [
  {
    ep: '٠١',
    title: 'القيادة الحقيقية — من المنصب إلى الأثر',
    desc: 'نقاش عميق حول الفرق بين من يحمل لقب قائد ومن يترك أثراً حقيقياً في المؤسسة والمجتمع.',
    platform: 'بودكاست إدارة',
    duration: '٤٨ دقيقة',
    bg: 'linear-gradient(145deg, #04334c 0%, #0d7377 100%)',
    featured: true,
  },
  {
    ep: '٠٢',
    title: 'ريادة الأعمال في المملكة: واقع وتحديات',
    platform: 'بودكاست رواد',
    duration: '٥٢ دقيقة',
    bg: 'linear-gradient(145deg, #0d5c63 0%, #14b8a6 100%)',
  },
  {
    ep: '٠٣',
    title: 'التحول المؤسسي: كيف تقود التغيير من الداخل؟',
    platform: 'بودكاست المسيرة',
    duration: '٣٩ دقيقة',
    bg: 'linear-gradient(145deg, #072a3d 0%, #0d7377 100%)',
  },
  {
    ep: '٠٤',
    title: 'تمكين الشباب: مسؤولية من؟',
    platform: 'بودكاست نجوم',
    duration: '٤٤ دقيقة',
    bg: 'linear-gradient(145deg, #04334c 0%, #0a5468 100%)',
  },
]

// ─── Speaker intro ────────────────────────────────────────────────────────────
function SpeakerIntro() {
  const { t } = useTheme()
  return (
    <section style={{ backgroundColor: t.bg, padding: '80px 0' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '16px', color: t.textBody, lineHeight: 1.9, marginBottom: '36px' }}>
          على مدار أكثر من عقدين، شاركت متحدثًا رئيسيًا في عشرات المؤتمرات والملتقيات على مستوى المملكة العربية السعودية والشرق الأوسط. أحمل إلى كل منصة رسالة واحدة: القيادة الحقيقية أعمق من الوظيفة، والنجاح أهون مما نتخيله حين نعرف الطريق. هدفي من كل محاضرة أن تغادر المكان مختلفًا عما كنت عليه حين دخلت.
        </p>
        {/* Topic pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
          {speakingTopics.map(topic => (
            <span key={topic} style={{
              backgroundColor: t.bgSoft, color: '#0d7377',
              fontSize: '14px', fontWeight: '600',
              padding: '10px 22px', borderRadius: '999px',
              fontFamily: 'Cairo, sans-serif',
              border: '1px solid rgba(13,115,119,0.15)',
            }}>{topic}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── YouTube icon ─────────────────────────────────────────────────────────────
const YouTubePlayIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="28" r="28" fill="rgba(255,255,255,0.92)" />
    <polygon points="23,18 42,28 23,38" fill="#04334c" />
  </svg>
)

// ─── Speaking bio + YouTube videos ────────────────────────────────────────────
const bioParas = [
  'كوني شغلت مناصب تنفيذية في قطاعات مختلفة من سوق العمل على مدى عقود، أجد نفسي مهتمًا بنقل خبراتي وتجاربي عن طريق المشاركة في فعاليات ومحاضرات أتواصل فيها بشكل حيّ مع الجمهور، كما أستطيع التعبير عن أفكاري وآرائي من خلال الكتب والمدونات ووسائل التواصل الاجتماعي.',
  'وعلى مدى السنوات الماضية، شاركت كمتحدث رئيسي في فعاليات عامة ومؤسسية، من بينها أهم المؤتمرات في المملكة العربية السعودية والشرق الأوسط.',
  'في حديثي مع الجمهور، أوظف قصصي الخبراتية وتحليلاتي في تحفيز وإلهام المهتمين، وإيجاد طرق للتطوير من أنفسهم ومؤسساتهم، وأساعدهم في اكتشاف الأفكار والحقائق التي ستضعهم على الطريق الصحيح بما يتوافق مع استراتيجيات أعمالهم.',
  'وأعتمد في مشاركاتي أسلوبًا تفاعليًا يُحفّز المتلقين ويساعدهم على توظيف حماسهم ودوافعهم لاتخاذ قرارات فاعلة تمكّنهم من التغلب على التحديات واستغلال الفرص وقيادة أعمالهم نحو النجاح والاستدامة.',
]

const VIDEO_CATEGORIES = ['الكل', 'فيديوهات القيادة', 'مشاركاتي الإعلامية']

const videos = [
  {
    title: 'كيف تُقرِّب بين جيل الطيبين وجيل الأبيض؟',
    channel: 'Badr AlBadr',
    bg: 'linear-gradient(145deg, #04334c 0%, #0d7377 100%)',
    category: 'فيديوهات القيادة',
  },
  {
    title: 'قصة تأسيس سك ومسيرة عثرات سنوات',
    channel: 'Badr AlBadr',
    bg: 'linear-gradient(145deg, #062f44 0%, #0a6b6b 100%)',
    category: 'فيديوهات القيادة',
  },
  {
    title: 'Fisk Foundation — FI6 Day 1',
    channel: 'FI1 Institute',
    bg: 'linear-gradient(145deg, #04334c 0%, #085f6a 100%)',
    category: 'مشاركاتي الإعلامية',
  },
]

function VideoCard({ video }) {
  const [hovered, setHovered] = useState(false)
  const { t } = useTheme()
  return (
    <div
      style={{
        borderRadius: '16px', overflow: 'hidden',
        boxShadow: hovered ? t.shadowHover : t.shadow,
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.3s ease', cursor: 'pointer',
        backgroundColor: t.surface,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div style={{
        height: '180px',
        background: video.bg,
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Subtle dot texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.08,
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        {/* Play button */}
        <div style={{
          position: 'relative', zIndex: 1,
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.3s ease',
        }}>
          <YouTubePlayIcon />
        </div>
        {/* YouTube badge top-left */}
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          backgroundColor: '#FF0000',
          borderRadius: '6px', padding: '3px 8px',
          display: 'flex', alignItems: 'center', gap: '5px',
        }}>
          <svg width="14" height="10" viewBox="0 0 24 17" fill="white">
            <path d="M23.5 2.6S23.2.6 22.4 0c-.8-.9-1.7-.9-2.1-.9C17.1 0 12 0 12 0S6.9 0 3.7-.1c-.4.1-1.3.1-2.1.9C.8.6.5 2.6.5 2.6S.2 4.9.2 7.2v2.2c0 2.3.3 4.6.3 4.6s.3 2 1.1 2.6c1 1 2.4.9 3 1C6.7 17.8 12 17.8 12 17.8s5.1 0 8.3-.2c.4-.1 1.3-.1 2.1-1 .8-.6 1.1-2.6 1.1-2.6s.3-2.3.3-4.6V7.2c0-2.3-.3-4.6-.3-4.6z"/>
            <polygon points="9.6,12.3 9.6,4.9 16.3,8.6" fill="white"/>
          </svg>
          <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: '11px', color: '#fff', fontWeight: '700' }}>YouTube</span>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '16px 18px 18px', textAlign: 'right' }}>
        <h3 style={{
          fontFamily: 'Playfair Display, Cairo, sans-serif',
          fontSize: '15px', fontWeight: '700',
          color: t.text, lineHeight: 1.5,
          marginBottom: '10px',
        }}>
          {video.title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '0',
            display: 'flex', alignItems: 'center', gap: '5px',
            fontFamily: 'Cairo, sans-serif', fontSize: '13px',
            color: '#14b8a6', fontWeight: '700',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#0d9488'}
            onMouseLeave={e => e.currentTarget.style.color = '#14b8a6'}
          >
            <ArrowLeftIcon size={13} /> شاهده على
          </button>
          <span style={{
            fontFamily: 'Cairo, sans-serif', fontSize: '12px',
            color: '#9ca3af',
          }}>
            {video.channel}
          </span>
        </div>
      </div>
    </div>
  )
}

function SpeakingBioWithVideos() {
  const [activeCategory, setActiveCategory] = useState('الكل')
  const { t } = useTheme()
  const filteredVideos = activeCategory === 'الكل'
    ? videos
    : videos.filter(v => v.category === activeCategory)

  return (
    <section style={{ backgroundColor: t.bg, padding: '80px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }}>

        {/* Bio text */}
        <div style={{ maxWidth: '820px', marginRight: 'auto', marginLeft: 'auto', marginBottom: '56px' }}>
          {bioParas.map((p, i) => (
            <p key={i} style={{
              fontFamily: 'Cairo, sans-serif',
              fontSize: '16px', color: t.textBody,
              lineHeight: 2, textAlign: 'right',
              marginBottom: i < bioParas.length - 1 ? '20px' : '0',
            }}>
              {p}
            </p>
          ))}
        </div>

        {/* Gold divider */}
        <div style={{
          width: '48px', height: '3px',
          background: 'linear-gradient(to left, #c8a96e, #e8c98e)',
          borderRadius: '999px',
          margin: '0 auto 48px',
        }} />

        {/* Section label */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: 'rgba(20,184,166,0.13)', color: '#0d7377',
            fontSize: '13px', fontWeight: '600',
            padding: '5px 16px', borderRadius: '999px',
            fontFamily: 'Cairo, sans-serif',
          }}>
            من لقاءاتي
          </span>
          <h2 style={{
            fontFamily: 'Playfair Display, Cairo, sans-serif',
            fontSize: 'clamp(22px, 3vw, 30px)',
            fontWeight: '700', color: t.text,
            marginTop: '14px',
          }}>
            مقاطع مختارة
          </h2>
        </div>

        {/* Category tabs */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px',
          marginBottom: '36px',
        }}>
          {VIDEO_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: 'Cairo, sans-serif',
                  fontSize: '14px', fontWeight: '600',
                  padding: '9px 22px', borderRadius: '999px',
                  border: isActive ? '2px solid #0d7377' : '2px solid rgba(13,115,119,0.25)',
                  backgroundColor: isActive ? '#0d7377' : t.surface,
                  color: isActive ? '#ffffff' : '#0d7377',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 14px rgba(13,115,119,0.28)' : 'none',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(13,115,119,0.08)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = t.surface
                  }
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Video cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {filteredVideos.map(v => <VideoCard key={v.title} video={v} />)}
        </div>

      </div>
    </section>
  )
}

// ─── Shared SVG pieces ────────────────────────────────────────────────────────
const WaveBars = ({ opacity = 0.4 }) => {
  const bars = [6, 14, 9, 20, 12, 26, 16, 22, 10, 18, 13, 24, 8, 20, 11]
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '30px' }}>
      {bars.map((h, i) => (
        <div key={i} style={{
          width: '3px', height: `${h}px`, borderRadius: '2px',
          backgroundColor: `rgba(255,255,255,${opacity})`,
        }} />
      ))}
    </div>
  )
}

const SpotifyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#1DB954" />
    <path d="M17.5 16.2c-.2 0-.4-.1-.5-.2-2.8-1.7-6.3-2.1-10.4-1.1-.4.1-.8-.1-.9-.5-.1-.4.1-.8.5-.9 4.5-1.1 8.4-.6 11.5 1.3.4.2.5.7.3 1-.2.3-.4.4-.5.4zm1.5-3.4c-.2 0-.4-.1-.6-.2-3.2-2-8.1-2.5-11.9-1.4-.5.1-.9-.1-1.1-.6-.1-.5.1-.9.6-1.1 4.3-1.3 9.7-.7 13.3 1.6.4.3.6.8.3 1.2-.2.4-.4.5-.6.5zm.1-3.5c-3.9-2.3-10.2-2.5-13.9-1.4-.6.2-1.1-.2-1.3-.7-.2-.6.2-1.1.7-1.3 4.2-1.3 11.1-1 15.5 1.6.5.3.7.9.4 1.4-.3.5-.9.7-1.4.4z" fill="white"/>
  </svg>
)

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#8B5CF6" />
    <path d="M12 4.5C8 4.5 8 8 8 8h8s0-3.5-4-3.5zm0 0v.5M7 8h10l-1 9.5H8L7 8z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="12" cy="13" r="2" fill="white"/>
    <path d="M12 11v4" stroke="#8B5CF6" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const HeadphonesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#0d7377" />
    <path d="M6 15v-3a6 6 0 0 1 12 0v3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="4" y="14" width="3" height="5" rx="1.5" fill="white"/>
    <rect x="17" y="14" width="3" height="5" rx="1.5" fill="white"/>
  </svg>
)

// ─── Featured episode card ────────────────────────────────────────────────────
function FeaturedPodcast({ pod }) {
  const [playHovered, setPlayHovered] = useState(false)
  return (
    <div style={{
      borderRadius: '24px',
      overflow: 'hidden',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.10)',
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: '28px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
    }}>
      {/* Cover art side */}
      <div style={{
        width: '280px', minHeight: '260px',
        background: pod.bg,
        flexShrink: 0,
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '32px 24px',
        gap: '20px',
      }}>
        {/* Dot texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }} />
        {/* Episode badge */}
        <div style={{ position: 'absolute', top: '18px', right: '18px', zIndex: 1 }}>
          <span style={{
            fontFamily: 'Cairo, sans-serif', fontSize: '11px', fontWeight: '700',
            color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em',
            background: 'rgba(255,255,255,0.12)', padding: '3px 10px',
            borderRadius: '999px', border: '1px solid rgba(255,255,255,0.2)',
          }}>
            الحلقة {pod.ep}
          </span>
        </div>
        {/* Play button */}
        <div
          style={{
            position: 'relative', zIndex: 1,
            width: '64px', height: '64px', borderRadius: '50%',
            backgroundColor: playHovered ? '#14b8a6' : 'rgba(255,255,255,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transform: playHovered ? 'scale(1.12)' : 'scale(1)',
            boxShadow: playHovered
              ? '0 0 0 12px rgba(20,184,166,0.2), 0 8px 24px rgba(0,0,0,0.3)'
              : '0 8px 24px rgba(0,0,0,0.3)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={() => setPlayHovered(true)}
          onMouseLeave={() => setPlayHovered(false)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={playHovered ? 'white' : '#04334c'}>
            <polygon points="6,4 21,12 6,20" />
          </svg>
        </div>
        {/* Waveform */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <WaveBars opacity={0.45} />
        </div>
      </div>

      {/* Text side */}
      <div style={{
        flex: 1, minWidth: '240px',
        padding: '32px 36px',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', textAlign: 'right',
      }}>
        <span style={{
          display: 'inline-block', alignSelf: 'flex-end',
          backgroundColor: 'rgba(20,184,166,0.15)',
          color: '#14b8a6', fontSize: '12px', fontWeight: '700',
          padding: '4px 14px', borderRadius: '999px',
          fontFamily: 'Cairo, sans-serif',
          border: '1px solid rgba(20,184,166,0.3)',
          marginBottom: '16px',
        }}>
          {pod.platform}
        </span>
        <h3 style={{
          fontFamily: 'Playfair Display, Cairo, sans-serif',
          fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: '700',
          color: '#ffffff', lineHeight: 1.5, marginBottom: '12px',
        }}>
          {pod.title}
        </h3>
        <p style={{
          fontFamily: 'Cairo, sans-serif', fontSize: '14px',
          color: 'rgba(255,255,255,0.6)', lineHeight: 1.8,
          marginBottom: '24px',
        }}>
          {pod.desc}
        </p>
        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          {/* Platform icons */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <SpotifyIcon />
            <AppleIcon />
            <HeadphonesIcon />
          </div>
          {/* Duration + button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              fontFamily: 'Cairo, sans-serif', fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
              display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {pod.duration}
            </span>
            <button style={{
              backgroundColor: '#14b8a6', color: '#ffffff',
              padding: '9px 22px', fontSize: '13px',
              fontFamily: 'Cairo, sans-serif', fontWeight: '700',
              border: 'none', borderRadius: '999px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '7px',
              transition: 'background-color 0.2s, transform 0.2s',
              boxShadow: '0 4px 16px rgba(20,184,166,0.35)',
            }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0d9488'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#14b8a6'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              استمع الآن <ArrowLeftIcon size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Grid episode card ────────────────────────────────────────────────────────
function PodcastCard({ pod }) {
  const [hovered, setHovered] = useState(false)
  const [playHovered, setPlayHovered] = useState(false)
  return (
    <div
      style={{
        borderRadius: '20px', overflow: 'hidden',
        background: 'rgba(255,255,255,0.05)',
        border: hovered ? '1px solid rgba(20,184,166,0.4)' : '1px solid rgba(255,255,255,0.08)',
        boxShadow: hovered ? '0 20px 48px rgba(0,0,0,0.45)' : '0 4px 20px rgba(0,0,0,0.2)',
        transform: hovered ? 'translateY(-7px)' : 'translateY(0)',
        transition: 'all 0.28s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient cover area */}
      <div style={{
        background: pod.bg, height: '148px',
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 18px',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }} />
        {/* Top row: episode + platform */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'Cairo, sans-serif', fontSize: '10px', fontWeight: '700',
            color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em',
          }}>EP {pod.ep}</span>
          <span style={{
            fontFamily: 'Cairo, sans-serif', fontSize: '10px', fontWeight: '600',
            color: 'rgba(255,255,255,0.75)',
            background: 'rgba(255,255,255,0.12)', padding: '2px 9px',
            borderRadius: '999px', border: '1px solid rgba(255,255,255,0.2)',
          }}>{pod.platform}</span>
        </div>
        {/* Play button */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '46px', height: '46px', borderRadius: '50%',
              backgroundColor: playHovered ? '#14b8a6' : 'rgba(255,255,255,0.88)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: playHovered ? 'scale(1.14)' : 'scale(1)',
              boxShadow: playHovered ? '0 0 0 10px rgba(20,184,166,0.2)' : '0 4px 16px rgba(0,0,0,0.25)',
              transition: 'all 0.22s ease',
            }}
            onMouseEnter={() => setPlayHovered(true)}
            onMouseLeave={() => setPlayHovered(false)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={playHovered ? 'white' : '#04334c'}>
              <polygon points="6,4 21,12 6,20" />
            </svg>
          </div>
        </div>
        {/* Waveform */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <WaveBars opacity={0.35} />
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '18px 18px 20px', textAlign: 'right' }}>
        <h3 style={{
          fontFamily: 'Playfair Display, Cairo, sans-serif',
          fontSize: '15px', fontWeight: '700',
          color: '#ffffff', lineHeight: 1.6, marginBottom: '16px',
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {pod.title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Duration */}
          <span style={{
            fontFamily: 'Cairo, sans-serif', fontSize: '12px',
            color: 'rgba(255,255,255,0.45)',
            display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {pod.duration}
          </span>
          {/* Platform icons */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <SpotifyIcon />
            <AppleIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Podcasts section ─────────────────────────────────────────────────────────
function PodcastsSection() {
  const featured = podcasts.find(p => p.featured)
  const grid = podcasts.filter(p => !p.featured)

  return (
    <section style={{ backgroundColor: '#04334c', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background layers */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.035,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />
      <div style={{
        position: 'absolute', top: '-120px', left: '-80px',
        width: '480px', height: '480px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-100px', right: '-60px',
        width: '360px', height: '360px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(13,115,119,0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <span style={{
            display: 'inline-block',
            backgroundColor: 'rgba(20,184,166,0.15)', color: '#14b8a6',
            fontSize: '12px', fontWeight: '700',
            padding: '5px 16px', borderRadius: '999px',
            fontFamily: 'Cairo, sans-serif', marginBottom: '16px',
            border: '1px solid rgba(20,184,166,0.3)',
          }}>
            بودكاست
          </span>
          <h2 style={{
            fontFamily: 'Playfair Display, Cairo, sans-serif',
            fontSize: 'clamp(24px, 3vw, 34px)',
            fontWeight: '700', color: '#ffffff', lineHeight: 1.3, marginBottom: '10px',
          }}>
            بودكاست ومقابلات
          </h2>
          <p style={{
            fontFamily: 'Cairo, sans-serif', fontSize: '15px',
            color: 'rgba(255,255,255,0.50)',
          }}>
            حلقات مختارة من مشاركاتي في بودكاستات القيادة والأعمال
          </p>
        </div>

        {/* Featured episode */}
        {featured && <FeaturedPodcast pod={featured} />}

        {/* Episode grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
        }}>
          {grid.map(pod => <PodcastCard key={pod.title} pod={pod} />)}
        </div>

      </div>
    </section>
  )
}

// ─── Speaking inquiry CTA ─────────────────────────────────────────────────────
function SpeakingCta() {
  return (
    <section style={{ backgroundColor: '#04334c', padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Background radial glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, rgba(4,51,76,0.6) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(4,51,76,0.5) 0%, transparent 60%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(13,115,119,0.2) 0%, transparent 65%)' }} />
      {/* Subtle grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Playfair Display, Cairo, sans-serif', fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: '700', color: '#ffffff', marginBottom: '14px', lineHeight: 1.35 }}>
          هل تريد دعوتي للمشاركة في فعاليتك؟
        </h2>
        <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.70)', lineHeight: 1.8, marginBottom: '36px' }}>
          أرحب بالمشاركة في المؤتمرات والملتقيات والفعاليات التي تُعنى بالقيادة والتحول وريادة الأعمال. تواصل معي وسنجد معًا أفضل صيغة للتعاون.
        </p>
        <button style={{
          backgroundColor: '#14b8a6', color: '#ffffff',
          padding: '14px 36px', fontSize: '16px',
          fontFamily: 'Cairo, sans-serif', fontWeight: '700',
          border: 'none', borderRadius: '999px', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: '12px',
          boxShadow: '0 6px 24px rgba(20,184,166,0.4)',
          transition: 'background-color 0.2s, transform 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0d9488'; e.currentTarget.style.transform = 'scale(1.04)' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#14b8a6'; e.currentTarget.style.transform = 'scale(1)' }}
        >
          <EmailIcon />
          تواصل معي
        </button>
      </div>
    </section>
  )
}

// ─── Page root ────────────────────────────────────────────────────────────────
export default function Events() {
  const { t } = useTheme()
  return (
    <div dir="rtl" style={{ overflowX: 'hidden', minHeight: '100vh', backgroundColor: t.bg }}>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <PageHero
          pill="المؤتمرات"
          heading="مؤتمرات ولقاءات"
          subtitle="متحدث رئيسي في أبرز فعاليات المملكة والشرق الأوسط"
        />
        <SpeakerIntro />
        <SpeakingBioWithVideos />
        <PodcastsSection />
        <SpeakingCta />
        <Newsletter bgColor="#ffffff" />
      </main>
      <Footer />
    </div>
  )
}

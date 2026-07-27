import { useState } from 'react'
import { Navbar, Footer, EmailIcon, LinkedInIcon, YouTubeIcon, TwitterIcon, useTheme } from './shared'
import profileAvatarImg from './assets/badr_profile.png'

const socials = [
  { icon: <TwitterIcon />, label: 'تويتر', href: '#' },
  { icon: <LinkedInIcon />, label: 'لينكد إن', href: '#' },
  { icon: <YouTubeIcon />, label: 'يوتيوب', href: '#' },
  { icon: <EmailIcon />, label: 'البريد الإلكتروني', href: '#' },
]

const careerItems = [
  {
    title: 'الرئيس التنفيذي لمؤسسة محمد بن سلمان "مسك" 2019 – الآن',
    body: 'عُيِّنت لقيادة مؤسسة "مسك" التي تهدف إلى إعادة توجيه الاستراتيجية للتركيز على تطوير الشباب وتمكينهم، بوضع النتائج بعيدة المدى والأهداف الصعبة للمؤسسة.\nوأود التنويه هنا إلى أن آرائي في المدونة لا تمثل بالضرورة آراء المؤسسة.',
  },
  {
    title: 'الرئيس التنفيذي لشركة دور للضيافة 2019 – 2012',
    body: 'كانت ولمدة سبع سنوات رئيسي التنفيذي لشركة دور للضيافة. قدت تحول الشركة السعودية للفنادق والمنشآت السياحية إلى شركة الجديدة والمعاصرة في رحلة استراتيجية بدأت بصياغة الرؤية ووضع الاستراتيجية انطلاقاً لتتكيف للتتماشى مع تعديل نماذج السوق.',
  },
  {
    title: 'الرئيس التنفيذي لشركة سيسكو – أسيا و إفريقيا 2011 – 2009',
  },
  {
    title: 'الرئيس التنفيذي لشركة سيسكو – السعودية 2009 – 2007',
  },
  {
    title: 'المدير العام لشركة سيسكو 2009 – 2004',
    body: 'توليت قيادة سيسكو الشركة العالمية المتخصصة في الشبكات والاتصالات وتوسيعها في المملكة العربية السعودية. وطوّرت أعمال الشركة في منطقة الخليج الأوسط الشرق الأوسط وشمال أفريقيا وبفضل عملي على جائزتي أفضل مدير عام في المنطقة والمنطقة وأفضل بيئة عمل في المملكة.',
  },
  {
    title: 'الرئيس التنفيذي وعضو مجلس إدارة شركة رقمية 2004 – 2003',
  },
  {
    title: 'الرئيس التنفيذي وشريك 2003 – 2002',
  },
  {
    title: 'الرئيس التنفيذي لشركة العالمية للاتصالات والإنترنت 1999 – 2002',
    body: 'بعد أن كنت عضواً في فريق عمل مشروع الإنترنت الذي كان مسؤولاً عن تنظيم وتشغيل خدمة الإنترنت في بداية التسعينيات، شملت مسيرتي التنفيذي لشركة أو تي، وهي جزء من شركة الاتصالات السعودية STC حالياً.',
  },
]

const qualifications = [
  'بكالوريوس في تخصص علوم الحاسب مع مرتبة الشرف الأولى - جامعة الملك فهد للبترول والمعادن بالظهران',
  'درجتي الماجستير والدكتوراه في تخصص هندسة علوم الحاسب - جامعة واشنطن',
]

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading({ children }) {
  return (
    <h2 style={{
      fontFamily: 'Cairo, sans-serif',
      fontSize: '20px',
      fontWeight: '700',
      color: '#14b8a6',
      margin: '40px 0 14px',
    }}>
      {children}
    </h2>
  )
}

// ─── Newsletter ───────────────────────────────────────────────────────────────
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
    fontFamily: 'Cairo, sans-serif',
    fontSize: '15px',
    color: t.text,
    backgroundColor: t.inputBg,
    border: `1px solid ${t.border}`,
    borderRadius: '6px',
    padding: '10px 14px',
    outline: 'none',
    width: '100%',
    textAlign: 'right',
    direction: 'rtl',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ marginTop: '48px' }}>
      <p style={{
        fontFamily: 'Cairo, sans-serif',
        fontSize: '16px',
        fontWeight: '700',
        color: t.text,
        marginBottom: '18px',
      }}>
        أسعد بالانضمام للقائمة البريدية لتصلك أحدث مقالاتي
      </p>

      {submitted ? (
        <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '15px', color: '#14b8a6' }}>
          شكرًا على اشتراكك! سيصلك أول محتوى جديد قريبًا.
        </p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
          <div>
            <label style={{ fontFamily: 'Cairo, sans-serif', fontSize: '14px', color: t.textBody, display: 'block', marginBottom: '4px' }}>
              البريد الإلكتروني
            </label>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              dir="ltr"
              style={{ ...inputStyle, textAlign: 'left' }}
              onFocus={e => e.target.style.borderColor = '#14b8a6'}
              onBlur={e => e.target.style.borderColor = t.border}
            />
          </div>
          <div>
            <label style={{ fontFamily: 'Cairo, sans-serif', fontSize: '14px', color: t.textBody, display: 'block', marginBottom: '4px' }}>
              الاسم
            </label>
            <input
              type="text"
              placeholder="اسمك"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#14b8a6'}
              onBlur={e => e.target.style.borderColor = t.border}
            />
          </div>
          <div>
            <button
              type="submit"
              style={{
                backgroundColor: '#14b8a6',
                color: '#ffffff',
                padding: '10px 28px',
                fontSize: '15px',
                fontFamily: 'Cairo, sans-serif',
                fontWeight: '600',
                border: 'none',
                borderRadius: '6px',
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
  )
}

// ─── Page root ────────────────────────────────────────────────────────────────
export default function AboutMe() {
  const { t } = useTheme()
  return (
    <div dir="rtl" style={{ overflowX: 'hidden', minHeight: '100vh', backgroundColor: t.bg }}>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '48px 24px 80px' }}>

          {/* Profile photo floated right — circle style */}
          <div className="about-float" style={{ float: 'right', marginLeft: '36px', marginBottom: '20px', flexShrink: 0 }}>
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
          </div>

          {/* Intro */}
          <p style={{
            fontFamily: 'Cairo, sans-serif',
            fontSize: '16px',
            color: t.textBody,
            lineHeight: 1.9,
            marginBottom: '18px',
          }}>
            <strong>أرحب بكم هنا في</strong> مدونتي والتي أدون بها بعض من تجاربي ومحطاتي في رحلة أمل أن تلهمكم.
          </p>

          <p style={{
            fontFamily: 'Cairo, sans-serif',
            fontSize: '16px',
            color: t.textBody,
            lineHeight: 1.9,
            marginBottom: '18px',
          }}>
            اسمي بدر بن حمود البدر، مهتم بتمكين الشباب بالإضافة إلى توجيه المؤسسات ومساعدتها على إيجاد حلول مستدامة.
          </p>

          <p style={{
            fontFamily: 'Cairo, sans-serif',
            fontSize: '16px',
            color: t.textBody,
            lineHeight: 1.9,
            marginBottom: '0',
          }}>
            بالنسبة لي، المواقف الصعبة هي مصدر تحفيز أجد ماتعًا بالعمل في فترات عدم اليقين، وأوقات التغيير السريع وأجدها فرصة لتحليل الواقع وتصور المستقبل وحل المشكلات.
          </p>

          {/* Clear float */}
          <div style={{ clear: 'both' }} />

          {/* ─── مجالاتي المهنية ──────────────────────────────────────── */}
          <SectionHeading>مجالاتي المهنية</SectionHeading>

          <p style={{
            fontFamily: 'Cairo, sans-serif',
            fontSize: '16px',
            color: t.textBody,
            lineHeight: 1.9,
            marginBottom: '20px',
          }}>
            في مسيرتي المهنية، عملت في عدة قطاعات شملت تقنية المعلومات والاتصالات والضيافة وقدت شركات في مراحل مختلفة من النضج سواء الشركات الناشئة أوالشركات المدرجة في سوق الأسهم، أوالشركات المحلية والعالمية وساهمت بتوظيف خبراتي في تحول الشركات وتنمية أعمالها بنجاح.
          </p>

          <ul style={{ padding: '0 20px', margin: '0', listStyle: 'disc' }}>
            {careerItems.map((item, i) => (
              <li key={i} style={{
                fontFamily: 'Cairo, sans-serif',
                fontSize: '16px',
                color: t.textBody,
                lineHeight: 1.85,
                marginBottom: item.body ? '20px' : '10px',
              }}>
                <strong style={{ color: t.text }}>{item.title}</strong>
                {item.body && (
                  <p style={{ margin: '6px 0 0', color: t.textBody }}>
                    {item.body.split('\n').map((line, j) => (
                      <span key={j}>{line}{j < item.body.split('\n').length - 1 && <br />}</span>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ul>

          <p style={{
            fontFamily: 'Cairo, sans-serif',
            fontSize: '16px',
            color: t.textBody,
            lineHeight: 1.9,
            marginTop: '20px',
          }}>
            ثلاث جوائز عديدة خلال مسيرتي القيادية، إذ أصنفت ضمن : <strong>أفضل 100 رئيس تنفيذي في المنطقة</strong>، وضمن <strong>أقوى 20 مديراً تنفيذياً في مجال الضيافة</strong> بالمنطقة، وثلاث مرات ثلاث شركات قدمتها على جائزة أفضل بيئة عمل في المملكة.
          </p>

          {/* ─── مؤهلاتي ──────────────────────────────────────────────── */}
          <SectionHeading>مؤهلاتي</SectionHeading>

          <ul style={{ padding: '0 20px', margin: '0', listStyle: 'disc' }}>
            {qualifications.map((q, i) => (
              <li key={i} style={{
                fontFamily: 'Cairo, sans-serif',
                fontSize: '16px',
                color: t.textBody,
                lineHeight: 1.85,
                marginBottom: '10px',
              }}>
                {q}
              </li>
            ))}
          </ul>

          {/* ─── هواياتي ───────────────────────────────────────────────── */}
          <SectionHeading>هواياتي</SectionHeading>

          <p style={{
            fontFamily: 'Cairo, sans-serif',
            fontSize: '16px',
            color: t.textBody,
            lineHeight: 1.9,
          }}>
            خارج عملي، أمارس نفس الشغف الذي أمارسه في عملي بالريادة والاستكشاف والتعلم من حياتي وأعتبرها من أهم مكونات شخصيتي القيادية. أحب التمرين والسفر بالدراجة الهوائية، وأشاركم في المدونة بعض من رحلاتي وهوايتي القديمة وهي التصوير، وأحضر في الفعاليات المتعلقة بشخصي وخيراتي.
          </p>

          {/* ─── Newsletter ────────────────────────────────────────────── */}
          <Newsletter />

          {/* ─── Social links ──────────────────────────────────────────── */}
          <div style={{ marginTop: '48px' }}>
            <p style={{
              fontFamily: 'Cairo, sans-serif',
              fontSize: '16px',
              fontWeight: '700',
              color: t.text,
              marginBottom: '16px',
            }}>
              حساباتي على مواقع التواصل الاجتماعي
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    backgroundColor: 'rgba(20,184,166,0.12)',
                    color: '#14b8a6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'background-color 0.2s, color 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#14b8a6'
                    e.currentTarget.style.color = '#fff'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(20,184,166,0.12)'
                    e.currentTarget.style.color = '#14b8a6'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}

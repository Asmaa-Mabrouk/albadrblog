import { useState, useEffect, useRef } from 'react'

// ─── Configuration ──────────────────────────────────────────────────────────
// ⚠️ Change this password before you rely on this admin page.
// This is a simple client-side check, not real authentication — anyone who
// opens the page source can find it. It's meant to keep casual visitors out,
// not to be a secure login system.
const ADMIN_PASSWORD = 'badr-admin-2026'

const OWNER = 'Asmaa-Mabrouk'
const REPO = 'albadrblog'
const BRANCH = 'main'
const DATA_PATH = 'src/data/articles.json'
const IMAGES_DIR = 'public/articles'

const GITHUB_API = 'https://api.github.com'

// ─── Base64 helpers (UTF-8 safe, for Arabic text) ───────────────────────────
function utf8ToBase64(str) {
  return btoa(unescape(encodeURIComponent(str)))
}
function base64ToUtf8(b64) {
  return decodeURIComponent(escape(atob(b64.replace(/\n/g, ''))))
}

// ─── GitHub API helpers ──────────────────────────────────────────────────────
async function ghRequest(pat, path, options = {}) {
  const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${pat}`,
      Accept: 'application/vnd.github+json',
      ...(options.headers || {}),
    },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || `طلب GitHub فشل (${res.status})`)
  }
  return res.json()
}

async function getFile(pat, path) {
  try {
    return await ghRequest(pat, `contents/${path}?ref=${BRANCH}`)
  } catch (e) {
    if (e.message.includes('404')) return null
    throw e
  }
}

async function putFile(pat, path, contentBase64, sha, message) {
  return ghRequest(pat, `contents/${path}`, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: contentBase64,
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  })
}

async function fetchArticles(pat) {
  const file = await getFile(pat, DATA_PATH)
  if (!file) return { articles: [], sha: null }
  const text = base64ToUtf8(file.content)
  return { articles: JSON.parse(text), sha: file.sha }
}

async function saveArticles(pat, articles, message) {
  // Always re-fetch sha right before writing to avoid stale-sha conflicts.
  const current = await getFile(pat, DATA_PATH)
  const content = utf8ToBase64(JSON.stringify(articles, null, 2) + '\n')
  return putFile(pat, DATA_PATH, content, current?.sha, message)
}

function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/-+/g, '-')
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// ─── Small UI atoms ──────────────────────────────────────────────────────────
const inputStyle = {
  width: '100%', padding: '10px 12px', borderRadius: '8px',
  border: '1px solid #d1d5db', fontSize: '14px', fontFamily: 'inherit',
  boxSizing: 'border-box',
}
const labelStyle = { display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }
const buttonPrimary = {
  backgroundColor: '#14b8a6', color: '#fff', border: 'none', borderRadius: '8px',
  padding: '10px 20px', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
}
const buttonSecondary = {
  backgroundColor: '#fff', color: '#374151', border: '1px solid #d1d5db', borderRadius: '8px',
  padding: '10px 20px', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
}
const buttonDanger = {
  backgroundColor: '#fff', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '8px',
  padding: '8px 14px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
}

const GRADIENT_PRESETS = [
  'linear-gradient(135deg, #04334c 0%, #0a6b6b 100%)',
  'linear-gradient(148deg, #04334c 0%, #0c7070 100%)',
  'linear-gradient(122deg, #04334c 0%, #085f6a 100%)',
  'linear-gradient(130deg, #04334c 0%, #096565 100%)',
  'linear-gradient(125deg, #04334c 0%, #0c6e6e 100%)',
  'linear-gradient(138deg, #04334c 0%, #085e6a 100%)',
]

const EMPTY_FORM = { id: null, title: '', category: '', excerpt: '', body: '', date: '', featured: false, bg: GRADIENT_PRESETS[0], img: '' }

// ─── Login gate ──────────────────────────────────────────────────────────────
function PasswordGate({ onSuccess }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (value === ADMIN_PASSWORD) {
            sessionStorage.setItem('admin_authed', '1')
            onSuccess()
          } else {
            setError('كلمة المرور غير صحيحة.')
          }
        }}
        style={{ backgroundColor: '#fff', padding: '36px', borderRadius: '14px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', width: '320px' }}
      >
        <h1 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '18px', color: '#111827' }}>لوحة إدارة المدونة</h1>
        <label style={labelStyle}>كلمة المرور</label>
        <input type="password" autoFocus value={value} onChange={e => setValue(e.target.value)} style={inputStyle} />
        {error && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
        <button type="submit" style={{ ...buttonPrimary, width: '100%', marginTop: '16px' }}>دخول</button>
      </form>
    </div>
  )
}

// ─── GitHub token gate ───────────────────────────────────────────────────────
function TokenGate({ onSuccess }) {
  const [pat, setPat] = useState('')
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setChecking(true)
    setError('')
    try {
      await ghRequest(pat, '')
      localStorage.setItem('admin_gh_pat', pat)
      onSuccess(pat)
    } catch {
      setError('تعذّر الاتصال بـ GitHub. تأكد من صحة الرمز (Token) والصلاحيات.')
    } finally {
      setChecking(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '36px', borderRadius: '14px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', width: '420px' }}>
        <h1 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#111827' }}>ربط GitHub</h1>
        <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6, marginBottom: '16px' }}>
          الصق هنا Personal Access Token (بصلاحية Contents: Read and write على مستودع {REPO}). يُحفظ فقط في متصفحك ولا يُرسل لأي جهة أخرى.
        </p>
        <label style={labelStyle}>GitHub Personal Access Token</label>
        <input type="password" autoFocus value={pat} onChange={e => setPat(e.target.value)} style={inputStyle} placeholder="ghp_xxxxxxxxxxxx" />
        {error && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
        <button type="submit" disabled={checking || !pat} style={{ ...buttonPrimary, width: '100%', marginTop: '16px', opacity: checking || !pat ? 0.6 : 1 }}>
          {checking ? 'جارٍ التحقق...' : 'حفظ ومتابعة'}
        </button>
      </form>
    </div>
  )
}

// ─── Article form ────────────────────────────────────────────────────────────
function ArticleForm({ initial, categories, onCancel, onSave, saving }) {
  const [form, setForm] = useState(initial)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(initial.img || '')
  const fileInputRef = useRef(null)

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
      <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '18px', color: '#111827' }}>
        {form.id ? 'تعديل مقال' : 'مقال جديد'}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={labelStyle}>العنوان</label>
          <input dir="rtl" style={inputStyle} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <label style={labelStyle}>التصنيف</label>
          <input dir="rtl" style={inputStyle} list="categories" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
          <datalist id="categories">
            {categories.map(c => <option key={c} value={c} />)}
          </datalist>
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>الملخص (يظهر في بطاقة المقال)</label>
        <textarea dir="rtl" rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>نص المقال الكامل (افصل بين الفقرات بسطر فارغ)</label>
        <textarea dir="rtl" rows={8} style={{ ...inputStyle, resize: 'vertical' }} value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={labelStyle}>التاريخ (كما يظهر في الموقع)</label>
          <input dir="rtl" style={inputStyle} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="١٠ أبريل ٢٠٢٦" />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#374151', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
            مقال مميز
          </label>
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>لون الخلفية (يظهر إن لم توجد صورة)</label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {GRADIENT_PRESETS.map(g => (
            <button
              key={g} type="button" onClick={() => setForm({ ...form, bg: g })}
              style={{
                width: '36px', height: '36px', borderRadius: '8px', background: g, cursor: 'pointer',
                border: form.bg === g ? '3px solid #111827' : '1px solid rgba(0,0,0,0.1)',
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>صورة المقال</label>
        <div style={{
          height: '160px', borderRadius: '10px', background: form.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', position: 'relative', marginBottom: '10px',
        }}>
          {imagePreview ? (
            <img src={imagePreview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>بدون صورة (سيظهر التدرج اللوني)</span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <button type="button" style={buttonDanger} onClick={() => {
              setImageFile(null)
              setImagePreview('')
              setForm({ ...form, img: '' })
              if (fileInputRef.current) fileInputRef.current.value = ''
            }}>إزالة الصورة</button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button type="button" style={buttonSecondary} onClick={onCancel} disabled={saving}>إلغاء</button>
        <button
          type="button" style={{ ...buttonPrimary, opacity: saving ? 0.6 : 1 }} disabled={saving}
          onClick={() => onSave(form, imageFile)}
        >
          {saving ? 'جارٍ الحفظ...' : 'حفظ ونشر'}
        </button>
      </div>
    </div>
  )
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
function Dashboard({ pat }) {
  const [articles, setArticles] = useState(null)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null) // null | 'new' | article
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')

  async function load() {
    setError('')
    try {
      const { articles } = await fetchArticles(pat)
      setArticles(articles)
    } catch (e) {
      setError(e.message)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load() }, [])

  const categories = [...new Set((articles || []).map(a => a.category).filter(Boolean))]

  async function handleSave(form, imageFile) {
    setSaving(true)
    setError('')
    try {
      let imgPath = form.img || ''
      if (imageFile) {
        const base64 = await fileToBase64(imageFile)
        const filename = `${Date.now()}-${sanitizeFilename(imageFile.name)}`
        const path = `${IMAGES_DIR}/${filename}`
        await putFile(pat, path, base64, null, `رفع صورة مقال: ${filename}`)
        imgPath = `/articles/${filename}`
      }

      let updated
      if (form.id) {
        updated = articles.map(a => a.id === form.id ? { ...form, img: imgPath } : a)
      } else {
        const nextId = articles.length ? Math.max(...articles.map(a => a.id)) + 1 : 1
        updated = [...articles, { ...form, id: nextId, img: imgPath }]
      }

      await saveArticles(pat, updated, form.id ? `تحديث مقال: ${form.title}` : `إضافة مقال جديد: ${form.title}`)
      setArticles(updated)
      setEditing(null)
      setNotice('تم الحفظ! سيقوم Netlify بإعادة نشر الموقع خلال دقيقة أو دقيقتين.')
      setTimeout(() => setNotice(''), 6000)
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(article) {
    if (!confirm(`هل تريد حذف المقال "${article.title}"؟`)) return
    setSaving(true)
    setError('')
    try {
      const updated = articles.filter(a => a.id !== article.id)
      await saveArticles(pat, updated, `حذف مقال: ${article.title}`)
      setArticles(updated)
      setNotice('تم الحذف! سيقوم Netlify بإعادة نشر الموقع خلال دقيقة أو دقيقتين.')
      setTimeout(() => setNotice(''), 6000)
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div dir="rtl" style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '32px 24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111827' }}>إدارة المقالات</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            {!editing && (
              <button style={buttonPrimary} onClick={() => setEditing('new')}>+ مقال جديد</button>
            )}
            <button style={buttonSecondary} onClick={() => {
              sessionStorage.removeItem('admin_authed')
              localStorage.removeItem('admin_gh_pat')
              window.location.reload()
            }}>تسجيل الخروج</button>
          </div>
        </div>

        {notice && (
          <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
            {notice}
          </div>
        )}
        {error && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        {editing && (
          <ArticleForm
            initial={editing === 'new' ? EMPTY_FORM : { ...editing }}
            categories={categories}
            saving={saving}
            onCancel={() => setEditing(null)}
            onSave={handleSave}
          />
        )}

        {articles === null && !error && <p style={{ color: '#6b7280' }}>جارٍ التحميل...</p>}

        {articles && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {articles.map(article => (
              <div key={article.id} style={{
                backgroundColor: '#fff', borderRadius: '10px', padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: '14px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '8px', flexShrink: 0,
                  background: article.bg, backgroundImage: article.img ? `url(${article.img})` : undefined,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: '700', color: '#111827', fontSize: '14px', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{article.title}</p>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>{article.category} · {article.date}{article.featured ? ' · مميز' : ''}</p>
                </div>
                <button style={buttonSecondary} onClick={() => setEditing(article)}>تعديل</button>
                <button style={buttonDanger} onClick={() => handleDelete(article)}>حذف</button>
              </div>
            ))}
            {articles.length === 0 && <p style={{ color: '#6b7280', textAlign: 'center', padding: '40px 0' }}>لا توجد مقالات بعد.</p>}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Root ────────────────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_authed') === '1')
  const [pat, setPat] = useState(() => localStorage.getItem('admin_gh_pat') || '')

  if (!authed) return <PasswordGate onSuccess={() => setAuthed(true)} />
  if (!pat) return <TokenGate onSuccess={setPat} />
  return <Dashboard pat={pat} />
}

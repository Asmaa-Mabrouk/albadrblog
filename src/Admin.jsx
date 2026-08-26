import { useState, useEffect, useRef } from 'react'
import { supabase } from './supabaseClient'
import { CATEGORY_TRANSLATIONS } from './LanguageContext'

const IMAGES_BUCKET = 'article-images'

function sanitizeFilename(name) {
  return name.toLowerCase().replace(/[^a-z0-9.-]/g, '-').replace(/-+/g, '-')
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

const EMPTY_FORM = { id: null, title: '', category: '', excerpt: '', body: '', date: '', title_en: '', excerpt_en: '', body_en: '', date_en: '', featured: false, bg: GRADIENT_PRESETS[0], img: '' }

// ─── Login screen (real Supabase auth) ──────────────────────────────────────
function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.')
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '36px', borderRadius: '14px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', width: '340px' }}>
        <h1 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '18px', color: '#111827' }}>لوحة إدارة المدونة</h1>
        <label style={labelStyle}>البريد الإلكتروني</label>
        <input type="email" autoFocus value={email} onChange={e => setEmail(e.target.value)} style={{ ...inputStyle, marginBottom: '14px' }} />
        <label style={labelStyle}>كلمة المرور</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
        {error && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ ...buttonPrimary, width: '100%', marginTop: '18px', opacity: loading ? 0.6 : 1 }}>
          {loading ? 'جارٍ الدخول...' : 'دخول'}
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
  const [formLang, setFormLang] = useState('ar')
  const fileInputRef = useRef(null)

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const suf = formLang === 'en' ? '_en' : ''

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
      <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '18px', color: '#111827' }}>
        {form.id ? 'تعديل مقال' : 'مقال جديد'}
      </h2>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', borderBottom: '1px solid #e5e7eb' }}>
        <button type="button" onClick={() => setFormLang('ar')} style={{
          padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer',
          fontSize: '14px', fontWeight: '600', fontFamily: 'Cairo, sans-serif',
          color: formLang === 'ar' ? '#14b8a6' : '#9ca3af',
          borderBottom: formLang === 'ar' ? '2px solid #14b8a6' : '2px solid transparent',
          marginBottom: '-1px',
        }}>🇸🇦 العربية</button>
        <button type="button" onClick={() => setFormLang('en')} style={{
          padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer',
          fontSize: '14px', fontWeight: '600', fontFamily: 'Cairo, sans-serif',
          color: formLang === 'en' ? '#14b8a6' : '#9ca3af',
          borderBottom: formLang === 'en' ? '2px solid #14b8a6' : '2px solid transparent',
          marginBottom: '-1px',
        }}>🌐 English</button>
      </div>

      {formLang === 'en' && (
        <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '16px' }}>
          Optional — if left blank, the site falls back to the Arabic version when a visitor selects English.
        </p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: formLang === 'ar' ? '1fr 1fr' : '1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={labelStyle}>{formLang === 'ar' ? 'العنوان' : 'Title'}</label>
          <input dir={formLang === 'ar' ? 'rtl' : 'ltr'} style={inputStyle} value={form[`title${suf}`] || ''} onChange={e => setForm({ ...form, [`title${suf}`]: e.target.value })} />
        </div>
        {formLang === 'ar' && (
          <div>
            <label style={labelStyle}>التصنيف</label>
            <input dir="rtl" style={inputStyle} list="categories" value={form.category || ''} onChange={e => setForm({ ...form, category: e.target.value })} />
            <datalist id="categories">
              {categories.map(c => <option key={c} value={c} />)}
            </datalist>
          </div>
        )}
      </div>
      {formLang === 'en' && form.category && (
        <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '-10px', marginBottom: '16px' }}>
          Category: <strong>{CATEGORY_TRANSLATIONS[form.category] || form.category}</strong> (translated automatically — set once in code, not per article)
        </p>
      )}

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>{formLang === 'ar' ? 'الملخص (يظهر في بطاقة المقال)' : 'Excerpt (shown on the article card)'}</label>
        <textarea dir={formLang === 'ar' ? 'rtl' : 'ltr'} rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={form[`excerpt${suf}`] || ''} onChange={e => setForm({ ...form, [`excerpt${suf}`]: e.target.value })} />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>{formLang === 'ar' ? 'نص المقال الكامل (افصل بين الفقرات بسطر فارغ)' : 'Full article body (blank line between paragraphs)'}</label>
        <textarea dir={formLang === 'ar' ? 'rtl' : 'ltr'} rows={8} style={{ ...inputStyle, resize: 'vertical' }} value={form[`body${suf}`] || ''} onChange={e => setForm({ ...form, [`body${suf}`]: e.target.value })} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={labelStyle}>{formLang === 'ar' ? 'التاريخ (كما يظهر في الموقع)' : 'Date (as shown on the site)'}</label>
          <input dir={formLang === 'ar' ? 'rtl' : 'ltr'} style={inputStyle} value={form[`date${suf}`] || ''} onChange={e => setForm({ ...form, [`date${suf}`]: e.target.value })} placeholder={formLang === 'ar' ? '١٠ أبريل ٢٠٢٦' : 'April 10, 2026'} />
        </div>
        {formLang === 'ar' && (
          <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#374151', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
              مقال مميز
            </label>
          </div>
        )}
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

// ─── Page content editor (Home, About, Books, Events...) ────────────────────
// Config of editable pages, added incrementally. Each entry lists its
// section keys with an Arabic label so the admin form is self-explanatory.
const PAGES_CONFIG = {
  home: {
    label: 'الصفحة الرئيسية',
    sections: [
      { key: 'profile_name', label: 'الاسم' },
      { key: 'profile_title', label: 'المسمى الوظيفي' },
      { key: 'profile_bio', label: 'نبذة عني (النص)' },
    ],
  },
  about: {
    label: 'تعرف علي',
    sections: [
      { key: 'about_intro_1', label: 'الفقرة التعريفية الأولى' },
      { key: 'about_intro_2', label: 'الفقرة التعريفية الثانية' },
      { key: 'about_intro_3', label: 'الفقرة التعريفية الثالثة' },
      {
        key: 'career_items', label: 'محطاتي المهنية', type: 'list',
        itemFields: [{ key: 'title', label: 'المسمى الوظيفي والتاريخ' }, { key: 'body', label: 'الوصف (اختياري)' }],
      },
      {
        key: 'qualifications', label: 'مؤهلاتي', type: 'list',
        itemFields: [{ key: 'text', label: 'المؤهل' }],
      },
      { key: 'awards_text', label: 'فقرة الجوائز' },
      { key: 'hobbies_text', label: 'هواياتي (النص)' },
    ],
  },
}

function emptyListItem(itemFields) {
  const obj = {}
  for (const f of itemFields) obj[f.key] = ''
  return obj
}

function ListSectionEditor({ section, valueAr, valueEn, onChange }) {
  const itemsAr = (() => { try { return JSON.parse(valueAr || '[]') } catch { return [] } })()
  const itemsEn = (() => { try { return JSON.parse(valueEn || '[]') } catch { return [] } })()
  // Keep both language arrays the same length, indexed together.
  const count = Math.max(itemsAr.length, itemsEn.length)
  const rows = Array.from({ length: count }, (_, i) => ({
    ar: itemsAr[i] || emptyListItem(section.itemFields),
    en: itemsEn[i] || emptyListItem(section.itemFields),
  }))

  function updateRow(i, lang, fieldKey, value) {
    const newRows = rows.map((r, idx) => idx === i ? { ...r, [lang]: { ...r[lang], [fieldKey]: value } } : r)
    onChange(JSON.stringify(newRows.map(r => r.ar)), JSON.stringify(newRows.map(r => r.en)))
  }

  function addRow() {
    const newRows = [...rows, { ar: emptyListItem(section.itemFields), en: emptyListItem(section.itemFields) }]
    onChange(JSON.stringify(newRows.map(r => r.ar)), JSON.stringify(newRows.map(r => r.en)))
  }

  function removeRow(i) {
    const newRows = rows.filter((_, idx) => idx !== i)
    onChange(JSON.stringify(newRows.map(r => r.ar)), JSON.stringify(newRows.map(r => r.en)))
  }

  return (
    <div>
      {rows.map((row, i) => (
        <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '14px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600' }}>#{i + 1}</span>
            <button type="button" onClick={() => removeRow(i)} style={{ ...buttonDanger, padding: '3px 10px', fontSize: '12px' }}>حذف</button>
          </div>
          {section.itemFields.map(field => (
            <div key={field.key} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
              <div>
                <label style={{ ...labelStyle, fontSize: '12px' }}>🇸🇦 {field.label}</label>
                <input dir="rtl" style={inputStyle} value={row.ar[field.key] || ''} onChange={e => updateRow(i, 'ar', field.key, e.target.value)} />
              </div>
              <div>
                <label style={{ ...labelStyle, fontSize: '12px' }}>🌐 {field.label} (English)</label>
                <input dir="ltr" style={inputStyle} value={row.en[field.key] || ''} onChange={e => updateRow(i, 'en', field.key, e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      ))}
      <button type="button" onClick={addRow} style={buttonSecondary}>+ إضافة عنصر</button>
    </div>
  )
}

function PageContentEditor({ pageKey }) {
  const config = PAGES_CONFIG[pageKey]
  const [values, setValues] = useState(null) // { [section_key]: { ar, en } }
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  async function load() {
    setError('')
    const { data, error } = await supabase.from('page_content').select('*').eq('page', pageKey)
    if (error) { setError(error.message); return }
    const map = {}
    for (const section of config.sections) {
      const row = (data || []).find(r => r.section_key === section.key)
      map[section.key] = { ar: row?.content_ar || '', en: row?.content_en || '' }
    }
    setValues(map)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load() }, [pageKey])

  async function handleSave() {
    setSaving(true)
    setError('')
    try {
      const rows = config.sections.map(s => ({
        page: pageKey, section_key: s.key,
        content_ar: values[s.key].ar, content_en: values[s.key].en,
      }))
      const { error } = await supabase.from('page_content').upsert(rows, { onConflict: 'page,section_key' })
      if (error) throw error
      setNotice('تم الحفظ! التغييرات ظاهرة على الموقع الآن مباشرة.')
      setTimeout(() => setNotice(''), 6000)
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  if (!values) return <p style={{ color: '#6b7280' }}>جارٍ التحميل...</p>

  return (
    <div>
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
      {config.sections.map(section => (
        <div key={section.key} style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '18px 20px', marginBottom: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <p style={{ fontWeight: '700', fontSize: '14px', color: '#111827', marginBottom: '12px' }}>{section.label}</p>
          {section.type === 'list' ? (
            <ListSectionEditor
              section={section}
              valueAr={values[section.key].ar}
              valueEn={values[section.key].en}
              onChange={(ar, en) => setValues({ ...values, [section.key]: { ar, en } })}
            />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={labelStyle}>🇸🇦 العربية</label>
                <textarea dir="rtl" rows={2} style={{ ...inputStyle, resize: 'vertical' }}
                  value={values[section.key].ar}
                  onChange={e => setValues({ ...values, [section.key]: { ...values[section.key], ar: e.target.value } })}
                />
              </div>
              <div>
                <label style={labelStyle}>🌐 English</label>
                <textarea dir="ltr" rows={2} style={{ ...inputStyle, resize: 'vertical' }}
                  value={values[section.key].en}
                  onChange={e => setValues({ ...values, [section.key]: { ...values[section.key], en: e.target.value } })}
                />
              </div>
            </div>
          )}
        </div>
      ))}
      <button style={{ ...buttonPrimary, opacity: saving ? 0.6 : 1 }} disabled={saving} onClick={handleSave}>
        {saving ? 'جارٍ الحفظ...' : 'حفظ ونشر'}
      </button>
    </div>
  )
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
function Dashboard({ userEmail }) {
  const [view, setView] = useState('articles') // 'articles' | 'home'
  const [articles, setArticles] = useState(null)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null) // null | 'new' | article
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')

  async function load() {
    setError('')
    const { data, error } = await supabase.from('articles').select('*').order('id', { ascending: false })
    if (error) setError(error.message)
    else setArticles(data)
  }

  useEffect(() => { load() }, [])

  const categories = [...new Set((articles || []).map(a => a.category).filter(Boolean))]

  async function handleSave(form, imageFile) {
    setSaving(true)
    setError('')
    try {
      let imgPath = form.img || ''
      if (imageFile) {
        const filename = `${Date.now()}-${sanitizeFilename(imageFile.name)}`
        const { error: uploadError } = await supabase.storage.from(IMAGES_BUCKET).upload(filename, imageFile)
        if (uploadError) throw uploadError
        const { data: urlData } = supabase.storage.from(IMAGES_BUCKET).getPublicUrl(filename)
        imgPath = urlData.publicUrl
      }

      const record = {
        title: form.title, category: form.category, excerpt: form.excerpt,
        body: form.body, date: form.date, featured: form.featured,
        bg: form.bg, img: imgPath,
        title_en: form.title_en || null,
        excerpt_en: form.excerpt_en || null, body_en: form.body_en || null,
        date_en: form.date_en || null,
      }

      if (form.id) {
        const { error } = await supabase.from('articles').update(record).eq('id', form.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('articles').insert(record)
        if (error) throw error
      }

      await load()
      setEditing(null)
      setNotice('تم الحفظ! التغييرات ظاهرة على الموقع الآن مباشرة.')
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
      const { error } = await supabase.from('articles').delete().eq('id', article.id)
      if (error) throw error
      await load()
      setNotice('تم الحذف!')
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111827' }}>لوحة الإدارة</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            {view === 'articles' && !editing && (
              <button style={buttonPrimary} onClick={() => setEditing('new')}>+ مقال جديد</button>
            )}
            <button style={buttonSecondary} onClick={() => supabase.auth.signOut()}>تسجيل الخروج</button>
          </div>
        </div>
        <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '20px' }}>مسجّل الدخول باسم: {userEmail}</p>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid #e5e7eb', flexWrap: 'wrap' }}>
          <button onClick={() => setView('articles')} style={{
            padding: '10px 18px', border: 'none', background: 'none', cursor: 'pointer',
            fontSize: '14px', fontWeight: '600',
            color: view === 'articles' ? '#14b8a6' : '#9ca3af',
            borderBottom: view === 'articles' ? '2px solid #14b8a6' : '2px solid transparent',
            marginBottom: '-1px',
          }}>المقالات</button>
          {Object.entries(PAGES_CONFIG).map(([key, cfg]) => (
            <button key={key} onClick={() => setView(key)} style={{
              padding: '10px 18px', border: 'none', background: 'none', cursor: 'pointer',
              fontSize: '14px', fontWeight: '600',
              color: view === key ? '#14b8a6' : '#9ca3af',
              borderBottom: view === key ? '2px solid #14b8a6' : '2px solid transparent',
              marginBottom: '-1px',
            }}>{cfg.label}</button>
          ))}
        </div>

        {PAGES_CONFIG[view] && <PageContentEditor pageKey={view} />}

        {view === 'articles' && (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}

// ─── Root ────────────────────────────────────────────────────────────────────
export default function Admin() {
  const [session, setSession] = useState(undefined) // undefined = loading, null = logged out

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => listener.subscription.unsubscribe()
  }, [])

  if (session === undefined) return null
  if (!session) return <LoginScreen />
  return <Dashboard userEmail={session.user.email} />
}

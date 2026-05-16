import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { companyInfo } from '../data/mockData'
import { getProductById } from '../data/products'

// ─────────────────────────────────────────────────────────────────────────────
// Line OA — ส่งผ่าน Vercel Serverless Function /api/notify
// ─────────────────────────────────────────────────────────────────────────────
async function sendLineMessage(message) {
  const res = await fetch('/api/notify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
  return res
}

function buildMessage(data, preProduct, lang) {
  const productLine = preProduct
    ? `🏭 สินค้า: ${preProduct.name.th} (${preProduct.sku})${preProduct.price ? ' ราคา ฿' + preProduct.price.toLocaleString() : ''}\n`
    : ''
  return `
🔔 ใบเสนอราคาใหม่ — Apex Lift
──────────────────
👤 ชื่อ: ${data.name}
📞 โทร: ${data.phone}
🏢 บริษัท: ${data.company || '-'}
💬 Line: ${data.lineId || '-'}
${productLine}📋 สนใจ: ${data.interest}
📝 รายละเอียด:
${data.message || '-'}
──────────────────
⏰ ${new Date().toLocaleString('th-TH')}
  `.trim()
}

export default function ContactPage() {
  const { t, lang } = useLanguage()
  const c = t.contact
  const [searchParams] = useSearchParams()

  // ดึง product จาก URL ?product=id
  const productId = searchParams.get('product')
  const preProduct = productId ? getProductById(productId) : null

  const [form, setForm] = useState({
    name: '', phone: '', company: '', lineId: '',
    interest: preProduct ? (lang === 'th' ? preProduct.name.th : preProduct.name.en) : '',
    message: preProduct
      ? (lang === 'th'
          ? `สนใจ ${preProduct.name.th} (${preProduct.sku}) ราคา ${preProduct.price ? '฿' + preProduct.price.toLocaleString() : 'ขอใบเสนอราคา'}`
          : `Interested in ${preProduct.name.en} (${preProduct.sku}) Price: ${preProduct.price ? '฿' + preProduct.price.toLocaleString() : 'Request quote'}`)
      : '',
  })

  // sync ถ้า lang เปลี่ยนหลัง preProduct โหลด
  useEffect(() => {
    if (preProduct) {
      setForm(f => ({
        ...f,
        interest: lang === 'th' ? preProduct.name.th : preProduct.name.en,
      }))
    }
  }, [lang])
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errors, setErrors] = useState({})

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())     e.name = lang === 'th' ? 'กรุณากรอกชื่อ' : 'Name is required'
    if (!form.phone.trim())    e.phone = lang === 'th' ? 'กรุณากรอกเบอร์โทร' : 'Phone is required'
    if (!form.interest || form.interest === c.interestOptions[0])
                               e.interest = lang === 'th' ? 'กรุณาเลือกบริการ' : 'Please select a service'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('sending')
    try {
      const message = buildMessage(form, preProduct, lang)
      const res = await sendLineMessage(message)
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', phone: '', company: '', lineId: '', interest: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (field) =>
    `w-full bg-white border ${errors[field] ? 'border-red-400' : 'border-gray-300'} focus:border-gold-500 focus:outline-none px-4 py-3 font-body text-sm text-gray-900 placeholder-gray-400 transition-colors`

  return (
    <div className="min-h-screen bg-gray-50 pt-20">

      {/* Header */}
      <div className="bg-industrial-900 border-b border-industrial-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-px bg-gold-500" />
            <span className="font-heading text-gold-500 text-xs tracking-[0.3em] uppercase">Apex Lift</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wide mb-3">{c.pageTitle}</h1>
          <p className="font-body text-industrial-400 text-lg max-w-xl">{c.pageSub}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 p-8">
              <h2 className="font-display text-2xl text-gray-900 tracking-wide mb-6 pb-3 border-b border-gray-100">
                {c.formTitle}
              </h2>

              {/* Pre-filled product banner */}
              {preProduct && (
                <div className="flex items-center gap-4 bg-gold-500/10 border border-gold-500/30 px-5 py-4 mb-6">
                  <span className="text-2xl flex-shrink-0">🏭</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-bold text-gray-900 text-sm truncate">
                      {preProduct.name[lang]}
                    </p>
                    <p className="font-body text-gray-500 text-xs mt-0.5">
                      {preProduct.sku}
                      {preProduct.price && ` · ฿${preProduct.price.toLocaleString()}`}
                    </p>
                  </div>
                  <span className="font-heading font-bold text-[10px] tracking-widest uppercase bg-gold-500 text-black px-2.5 py-1 flex-shrink-0">
                    {lang === 'th' ? 'สินค้าที่เลือก' : 'Selected'}
                  </span>
                </div>
              )}

              {/* Line Notify note */}
              {LINE_TOKEN && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-3 mb-6 text-sm font-body text-green-700">
                  <span>💬</span> {c.lineNotifyNote}
                </div>
              )}

              {/* Success */}
              {status === 'success' && (
                <div className="flex flex-col items-center py-12 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="font-heading font-bold text-gray-900 text-xl mb-2">{c.successTitle}</h3>
                  <p className="font-body text-gray-500 text-sm max-w-sm">{c.successMsg}</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 bg-gold-500 hover:bg-gold-400 text-black font-heading font-bold text-xs tracking-widest uppercase px-8 py-3 transition-colors"
                  >
                    {lang === 'th' ? 'ส่งใหม่' : 'Send Another'}
                  </button>
                </div>
              )}

              {/* Error */}
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 px-4 py-3 mb-6 text-sm font-body text-red-700">
                  ⚠️ {c.errorMsg}
                </div>
              )}

              {/* Form */}
              {status !== 'success' && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block font-heading font-semibold text-xs tracking-wider uppercase text-gray-600 mb-2">{c.name}</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => set('name', e.target.value)}
                        placeholder={c.namePlaceholder}
                        className={inputClass('name')}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block font-heading font-semibold text-xs tracking-wider uppercase text-gray-600 mb-2">{c.phone}</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => set('phone', e.target.value)}
                        placeholder={c.phonePlaceholder}
                        className={inputClass('phone')}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block font-heading font-semibold text-xs tracking-wider uppercase text-gray-600 mb-2">{c.company}</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={e => set('company', e.target.value)}
                        placeholder={c.companyPlaceholder}
                        className={inputClass('company')}
                      />
                    </div>

                    {/* Line ID */}
                    <div>
                      <label className="block font-heading font-semibold text-xs tracking-wider uppercase text-gray-600 mb-2">{c.lineId}</label>
                      <input
                        type="text"
                        value={form.lineId}
                        onChange={e => set('lineId', e.target.value)}
                        placeholder={c.lineIdPlaceholder}
                        className={inputClass('lineId')}
                      />
                    </div>
                  </div>

                  {/* Interest */}
                  <div>
                    <label className="block font-heading font-semibold text-xs tracking-wider uppercase text-gray-600 mb-2">{c.interest}</label>
                    <select
                      value={form.interest}
                      onChange={e => set('interest', e.target.value)}
                      className={`${inputClass('interest')} cursor-pointer`}
                    >
                      {c.interestOptions.map((opt, i) => (
                        <option key={i} value={i === 0 ? '' : opt}>{opt}</option>
                      ))}
                    </select>
                    {errors.interest && <p className="text-red-500 text-xs mt-1">{errors.interest}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-heading font-semibold text-xs tracking-wider uppercase text-gray-600 mb-2">{c.message}</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={e => set('message', e.target.value)}
                      placeholder={c.messagePlaceholder}
                      className={`${inputClass('message')} resize-none`}
                    />
                  </div>

                  <p className="font-body text-gray-400 text-xs">{c.required}</p>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-heading font-bold text-sm tracking-widest uppercase py-4 transition-all hover:shadow-[0_0_20px_rgba(245,200,66,0.4)]"
                  >
                    {status === 'sending' ? c.submitting : c.submit}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-5">

            {/* Contact Info */}
            <div className="bg-industrial-900 p-7">
              <h3 className="font-display text-xl text-white tracking-wide mb-6">{c.infoTitle}</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-white text-xs tracking-wider uppercase mb-1">{lang === 'th' ? 'โทรศัพท์' : 'Phone'}</p>
                    <a href={`tel:${companyInfo.phone}`} className="font-body text-industrial-300 hover:text-gold-400 transition-colors">
                      {companyInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-500/10 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-white text-xs tracking-wider uppercase mb-1">Line</p>
                    <a href={`https://line.me/ti/p/~${companyInfo.lineId}`} target="_blank" rel="noopener noreferrer" className="font-body text-industrial-300 hover:text-green-400 transition-colors">
                      {companyInfo.lineId}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-white text-xs tracking-wider uppercase mb-1">Email</p>
                    <a href={`mailto:${companyInfo.email}`} className="font-body text-industrial-300 hover:text-blue-400 transition-colors text-sm">
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-industrial-700 border border-industrial-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-industrial-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-white text-xs tracking-wider uppercase mb-1">{lang === 'th' ? 'ที่อยู่' : 'Address'}</p>
                    <p className="font-body text-industrial-400 text-xs leading-relaxed">
                      {companyInfo.address[lang]}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white border border-gray-200 p-6">
              <h4 className="font-heading font-bold text-gray-900 text-xs tracking-wider uppercase mb-4">{c.hours}</h4>
              <p className="font-body text-gray-600 text-sm mb-3">{c.hoursVal}</p>
              <div className="flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 px-3 py-2">
                <span className="text-gold-600 text-sm">🚨</span>
                <div>
                  <p className="font-heading font-bold text-xs text-gold-700">{c.emergency}</p>
                  <p className="font-body text-xs text-gold-600">{companyInfo.phone}</p>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-white border border-gray-200 p-6">
              <h4 className="font-heading font-bold text-gray-900 text-xs tracking-wider uppercase mb-4">
                {lang === 'th' ? 'ติดต่อด่วน' : 'Quick Contact'}
              </h4>
              <div className="space-y-3">
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-center gap-3 bg-gold-500 hover:bg-gold-400 text-black font-heading font-bold text-xs tracking-widest uppercase py-3 px-4 transition-all w-full"
                >
                  📞 {lang === 'th' ? 'โทรเลย' : 'Call Now'}
                </a>
                <a
                  href={`https://line.me/ti/p/~${companyInfo.lineId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#00B900] hover:bg-[#00a000] text-white font-heading font-bold text-xs tracking-widest uppercase py-3 px-4 transition-all w-full"
                >
                  💬 Line: {companyInfo.lineId}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
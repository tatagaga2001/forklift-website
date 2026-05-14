import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import { fetchProductById, createProduct, updateProduct, uploadProductImage } from '../../lib/productApi'
import { CATEGORIES, categoryMeta, POWER_TYPES, CONDITIONS, MAST_TYPES, TIRE_TYPES } from '../../data/products'

const COND_OPTIONS   = [{ v: 'new', l: 'มือหนึ่ง (New)' }, { v: 'used', l: 'มือสอง (Used)' }, { v: 'rental', l: 'เช่า (Rental)' }]
const POWER_OPTIONS  = [{ v: 'diesel', l: 'Diesel' }, { v: 'lpg', l: 'LPG' }, { v: 'electric', l: 'Electric' }, { v: 'manual', l: 'Manual' }]
const MAST_OPTIONS   = [{ v: '', l: 'ไม่มีเสา' }, { v: '1-stage', l: '1-Stage Simplex' }, { v: '2-stage', l: '2-Stage Duplex' }, { v: '3-stage', l: '3-Stage Triplex' }, { v: '4-stage', l: '4-Stage Quad' }]
const TIRE_OPTIONS   = [{ v: '', l: '—' }, { v: 'cushion', l: 'Cushion' }, { v: 'pneumatic', l: 'Pneumatic' }, { v: 'solid_pneumatic', l: 'Solid Pneumatic' }, { v: 'polyurethane', l: 'Polyurethane' }]

const emptyForm = () => ({
  id: '', sku: '', category: CATEGORIES.ENGINE_CB, brand: '', model: '',
  condition: 'new', year: new Date().getFullYear(), operatingHours: '',
  name: { th: '', en: '' },
  price: '', rentalMonthly: '',
  isFeatured: false, isAvailable: true,
  specs: {
    liftingCapacityKg: '', loadCenterMm: 500, liftHeightMm: '',
    mastType: '3-stage', mastCollapsedHeightMm: '', freeLiftMm: '',
    powerType: 'electric', batteryVoltage: '', batteryCapacityAh: '',
    tireType: 'cushion', driveWheels: '4-wheel',
    aisleWidthMm: '', turningRadiusMm: '',
    travelSpeedKmh: '', gradeabilityPct: '',
    overallLengthMm: '', overallWidthMm: '', weightKg: '',
    environment: ['indoor'], coldRoomRated: false, nonMarkingTire: false, exProof: false,
  },
  features: { th: '', en: '' },
  suitableFor: { th: '', en: '' },
  warranty: { th: '', en: '' },
  images: [],
})

function Field({ label, children, required }) {
  return (
    <div>
      <label className="block font-heading font-semibold text-xs tracking-wider uppercase text-gray-500 mb-1.5">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = "w-full bg-white border border-gray-300 focus:border-gold-500 focus:outline-none px-3 py-2.5 font-body text-sm text-gray-900"
const selectCls = inputCls + " cursor-pointer"

export default function AdminProductForm() {
  const { id }    = useParams()
  const navigate  = useNavigate()
  const isEdit    = id && id !== 'new'

  const [form,     setForm]     = useState(emptyForm())
  const [loading,  setLoading]  = useState(isEdit)
  const [saving,   setSaving]   = useState(false)
  const [error,    setError]    = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    fetchProductById(id).then(p => {
      setForm({
        ...p,
        price:          p.price || '',
        rentalMonthly:  p.rentalMonthly || '',
        operatingHours: p.operatingHours || '',
        features:  { th: (p.features.th || []).join('\n'), en: (p.features.en || []).join('\n') },
        suitableFor: { th: (p.suitableFor.th || []).join('\n'), en: (p.suitableFor.en || []).join('\n') },
        warranty:  { th: p.warranty?.th || '', en: p.warranty?.en || '' },
        specs: { ...emptyForm().specs, ...p.specs },
      })
      setLoading(false)
    }).catch(() => { setError('ไม่พบสินค้า'); setLoading(false) })
  }, [id])

  const setField  = (key, val)       => setForm(f => ({ ...f, [key]: val }))
  const setNested = (obj, key, val)  => setForm(f => ({ ...f, [obj]: { ...f[obj], [key]: val } }))
  const setSpec   = (key, val)       => setNested('specs', key, val)

  const toggleEnv = (env) => {
    const curr = form.specs.environment || []
    const next = curr.includes(env) ? curr.filter(e => e !== env) : [...curr, env]
    setSpec('environment', next)
  }

  // Image upload handler
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    if (!form.id && !form.sku) { setError('กรุณากรอก SKU ก่อนอัพโหลดรูป'); return }

    setUploading(true)
    setError('')
    try {
      const productId = form.id || form.sku
      const urls = await Promise.all(files.map(f => uploadProductImage(productId, f)))
      setForm(f => ({ ...f, images: [...f.images, ...urls] }))
    } catch (err) {
      setError('อัพโหลดรูปไม่สำเร็จ: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (url) => {
    setForm(f => ({ ...f, images: f.images.filter(i => i !== url) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.sku || !form.name.th || !form.category) {
      setError('กรุณากรอกข้อมูลที่จำเป็น: SKU, ชื่อ TH, ประเภท')
      return
    }
    setSaving(true)
    setError('')
    try {
      const payload = {
        ...form,
        price:          form.price          ? Number(form.price)          : null,
        rentalMonthly:  form.rentalMonthly   ? Number(form.rentalMonthly)   : null,
        operatingHours: form.operatingHours  ? Number(form.operatingHours)  : null,
        features:    { th: form.features.th.split('\n').filter(Boolean), en: form.features.en.split('\n').filter(Boolean) },
        suitableFor: { th: form.suitableFor.th.split('\n').filter(Boolean), en: form.suitableFor.en.split('\n').filter(Boolean) },
        warranty:    form.warranty.th ? form.warranty : null,
        specs: {
          ...form.specs,
          liftingCapacityKg:    Number(form.specs.liftingCapacityKg)    || null,
          liftHeightMm:         Number(form.specs.liftHeightMm)         || null,
          loadCenterMm:         Number(form.specs.loadCenterMm)         || 500,
          mastCollapsedHeightMm:Number(form.specs.mastCollapsedHeightMm)|| null,
          freeLiftMm:           Number(form.specs.freeLiftMm)           || null,
          batteryVoltage:       Number(form.specs.batteryVoltage)       || null,
          batteryCapacityAh:    Number(form.specs.batteryCapacityAh)    || null,
          aisleWidthMm:         Number(form.specs.aisleWidthMm)         || null,
          turningRadiusMm:      Number(form.specs.turningRadiusMm)      || null,
          travelSpeedKmh:       Number(form.specs.travelSpeedKmh)       || null,
          gradeabilityPct:      Number(form.specs.gradeabilityPct)      || null,
          overallLengthMm:      Number(form.specs.overallLengthMm)      || null,
          overallWidthMm:       Number(form.specs.overallWidthMm)       || null,
          weightKg:             Number(form.specs.weightKg)             || null,
        },
      }
      if (isEdit) {
        await updateProduct(id, payload)
      } else {
        if (!payload.id) payload.id = payload.sku
        await createProduct(payload)
      }
      navigate('/admin/products')
    } catch (err) {
      setError('บันทึกไม่สำเร็จ: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <AdminLayout><div className="text-center py-20 text-gray-400">กำลังโหลด...</div></AdminLayout>

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-3xl text-gray-900 tracking-wide">
            {isEdit ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
          </h2>
          {isEdit && <p className="font-body text-gray-400 text-sm mt-1">{form.sku}</p>}
        </div>
        <Link to="/admin/products" className="font-body text-sm text-gray-500 hover:text-gray-700">← กลับ</Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 font-body text-sm px-4 py-3 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Basic Info */}
        <section className="bg-white border border-gray-200 p-6">
          <h3 className="font-heading font-bold text-gray-900 text-sm tracking-wider uppercase mb-5 pb-3 border-b border-gray-100">ข้อมูลพื้นฐาน</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field label="SKU / รหัสสินค้า" required>
              <input value={form.sku} onChange={e => setField('sku', e.target.value)} className={inputCls} placeholder="APX-CB-30-D-001" required />
            </Field>
            <Field label="ประเภทสินค้า" required>
              <select value={form.category} onChange={e => setField('category', e.target.value)} className={selectCls}>
                {Object.entries(CATEGORIES).map(([, v]) => (
                  <option key={v} value={v}>{categoryMeta[v].th}</option>
                ))}
              </select>
            </Field>
            <Field label="สภาพ" required>
              <select value={form.condition} onChange={e => setField('condition', e.target.value)} className={selectCls}>
                {COND_OPTIONS.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
              </select>
            </Field>
            <Field label="ยี่ห้อ">
              <input value={form.brand} onChange={e => setField('brand', e.target.value)} className={inputCls} placeholder="Toyota" />
            </Field>
            <Field label="รุ่น (Model)">
              <input value={form.model} onChange={e => setField('model', e.target.value)} className={inputCls} placeholder="8FD30" />
            </Field>
            <Field label="ปีผลิต">
              <input type="number" value={form.year} onChange={e => setField('year', e.target.value)} className={inputCls} min={1990} max={2030} />
            </Field>
            {form.condition === 'used' && (
              <Field label="ชั่วโมงใช้งาน">
                <input type="number" value={form.operatingHours} onChange={e => setField('operatingHours', e.target.value)} className={inputCls} placeholder="4800" />
              </Field>
            )}
            <Field label="ราคาขาย (บาท)">
              <input type="number" value={form.price} onChange={e => setField('price', e.target.value)} className={inputCls} placeholder="980000" />
            </Field>
            {form.condition === 'rental' && (
              <Field label="ค่าเช่า/เดือน (บาท)">
                <input type="number" value={form.rentalMonthly} onChange={e => setField('rentalMonthly', e.target.value)} className={inputCls} placeholder="14500" />
              </Field>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <Field label="ชื่อสินค้า (ไทย)" required>
              <input value={form.name.th} onChange={e => setNested('name', 'th', e.target.value)} className={inputCls} placeholder="โฟล์คลิฟท์ดีเซล Toyota 8FD30 (3 ตัน)" required />
            </Field>
            <Field label="ชื่อสินค้า (English)">
              <input value={form.name.en} onChange={e => setNested('name', 'en', e.target.value)} className={inputCls} placeholder="Toyota 8FD30 Diesel Forklift (3-Ton)" />
            </Field>
          </div>
          <div className="flex items-center gap-6 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isFeatured} onChange={e => setField('isFeatured', e.target.checked)} className="w-4 h-4 accent-yellow-500" />
              <span className="font-body text-sm text-gray-700">⭐ Featured (แสดงหน้าแรก)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isAvailable} onChange={e => setField('isAvailable', e.target.checked)} className="w-4 h-4 accent-green-500" />
              <span className="font-body text-sm text-gray-700">✅ พร้อมขาย</span>
            </label>
          </div>
        </section>

        {/* Images */}
        <section className="bg-white border border-gray-200 p-6">
          <h3 className="font-heading font-bold text-gray-900 text-sm tracking-wider uppercase mb-5 pb-3 border-b border-gray-100">รูปสินค้า</h3>

          {/* Existing images */}
          {form.images.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4">
              {form.images.map((url, i) => (
                <div key={url} className="relative group">
                  <img src={url} alt="" className="w-24 h-20 object-cover border border-gray-200" />
                  {i === 0 && (
                    <span className="absolute top-1 left-1 bg-gold-500 text-black font-heading text-[9px] font-bold px-1">หลัก</span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >✕</button>
                </div>
              ))}
            </div>
          )}

          {/* Upload */}
          <label className={`flex items-center gap-3 border-2 border-dashed border-gray-300 hover:border-gold-400 p-5 cursor-pointer transition-colors ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <div>
              <p className="font-body text-sm text-gray-600">
                {uploading ? 'กำลังอัพโหลด...' : 'คลิกเพื่ออัพโหลดรูป (PNG, JPG)'}
              </p>
              <p className="font-body text-xs text-gray-400 mt-0.5">รูปแรกจะเป็นรูปหลัก สามารถเลือกหลายรูปได้</p>
            </div>
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
          </label>
        </section>

        {/* Specs */}
        <section className="bg-white border border-gray-200 p-6">
          <h3 className="font-heading font-bold text-gray-900 text-sm tracking-wider uppercase mb-5 pb-3 border-b border-gray-100">Specifications</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Field label="น้ำหนักยก (kg)">
              <input type="number" value={form.specs.liftingCapacityKg} onChange={e => setSpec('liftingCapacityKg', e.target.value)} className={inputCls} placeholder="3000" />
            </Field>
            <Field label="ความสูงยก (mm)">
              <input type="number" value={form.specs.liftHeightMm} onChange={e => setSpec('liftHeightMm', e.target.value)} className={inputCls} placeholder="4500" />
            </Field>
            <Field label="Load Center (mm)">
              <input type="number" value={form.specs.loadCenterMm} onChange={e => setSpec('loadCenterMm', e.target.value)} className={inputCls} placeholder="500" />
            </Field>
            <Field label="Free Lift (mm)">
              <input type="number" value={form.specs.freeLiftMm} onChange={e => setSpec('freeLiftMm', e.target.value)} className={inputCls} placeholder="150" />
            </Field>
            <Field label="ประเภทเสา">
              <select value={form.specs.mastType || ''} onChange={e => setSpec('mastType', e.target.value)} className={selectCls}>
                {MAST_OPTIONS.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
              </select>
            </Field>
            <Field label="ความสูงเสา Collapsed (mm)">
              <input type="number" value={form.specs.mastCollapsedHeightMm} onChange={e => setSpec('mastCollapsedHeightMm', e.target.value)} className={inputCls} placeholder="2100" />
            </Field>
            <Field label="พลังงาน">
              <select value={form.specs.powerType || ''} onChange={e => setSpec('powerType', e.target.value)} className={selectCls}>
                {POWER_OPTIONS.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
              </select>
            </Field>
            {form.specs.powerType === 'electric' && <>
              <Field label="Battery Voltage (V)">
                <input type="number" value={form.specs.batteryVoltage} onChange={e => setSpec('batteryVoltage', e.target.value)} className={inputCls} placeholder="48" />
              </Field>
              <Field label="Battery Capacity (Ah)">
                <input type="number" value={form.specs.batteryCapacityAh} onChange={e => setSpec('batteryCapacityAh', e.target.value)} className={inputCls} placeholder="500" />
              </Field>
            </>}
            <Field label="ประเภทยาง">
              <select value={form.specs.tireType || ''} onChange={e => setSpec('tireType', e.target.value)} className={selectCls}>
                {TIRE_OPTIONS.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
              </select>
            </Field>
            <Field label="Aisle Width (mm)">
              <input type="number" value={form.specs.aisleWidthMm} onChange={e => setSpec('aisleWidthMm', e.target.value)} className={inputCls} placeholder="3800" />
            </Field>
            <Field label="Turning Radius (mm)">
              <input type="number" value={form.specs.turningRadiusMm} onChange={e => setSpec('turningRadiusMm', e.target.value)} className={inputCls} placeholder="2300" />
            </Field>
            <Field label="ความเร็ว (km/h)">
              <input type="number" value={form.specs.travelSpeedKmh} onChange={e => setSpec('travelSpeedKmh', e.target.value)} className={inputCls} placeholder="19" />
            </Field>
            <Field label="Gradeability (%)">
              <input type="number" value={form.specs.gradeabilityPct} onChange={e => setSpec('gradeabilityPct', e.target.value)} className={inputCls} placeholder="18" />
            </Field>
            <Field label="ความยาวรถ (mm)">
              <input type="number" value={form.specs.overallLengthMm} onChange={e => setSpec('overallLengthMm', e.target.value)} className={inputCls} placeholder="4000" />
            </Field>
            <Field label="ความกว้างรถ (mm)">
              <input type="number" value={form.specs.overallWidthMm} onChange={e => setSpec('overallWidthMm', e.target.value)} className={inputCls} placeholder="1430" />
            </Field>
            <Field label="น้ำหนักรถ (kg)">
              <input type="number" value={form.specs.weightKg} onChange={e => setSpec('weightKg', e.target.value)} className={inputCls} placeholder="4650" />
            </Field>
          </div>

          {/* Environment */}
          <div className="mt-4 flex flex-wrap gap-4">
            {['indoor','outdoor'].map(env => (
              <label key={env} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={(form.specs.environment || []).includes(env)} onChange={() => toggleEnv(env)} className="w-4 h-4 accent-gold-500" />
                <span className="font-body text-sm text-gray-700">{env === 'indoor' ? '🏠 ในร่ม' : '🌤 กลางแจ้ง'}</span>
              </label>
            ))}
            {[['coldRoomRated','❄️ ห้องเย็น'],['nonMarkingTire','⬜ Non-marking'],['exProof','🔥 EX-Proof']].map(([k,l]) => (
              <label key={k} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={!!form.specs[k]} onChange={e => setSpec(k, e.target.checked)} className="w-4 h-4 accent-gold-500" />
                <span className="font-body text-sm text-gray-700">{l}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Features & Suitable */}
        <section className="bg-white border border-gray-200 p-6">
          <h3 className="font-heading font-bold text-gray-900 text-sm tracking-wider uppercase mb-5 pb-3 border-b border-gray-100">จุดเด่น & เหมาะกับงาน</h3>
          <p className="font-body text-xs text-gray-400 mb-4">ใส่แต่ละบรรทัด = 1 รายการ</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="จุดเด่น (ไทย)">
              <textarea rows={5} value={form.features.th} onChange={e => setNested('features','th',e.target.value)} className={inputCls + ' resize-none'} placeholder={'ยกสูง 9.6 เมตร\nFree Lift 1,020 mm\nประหยัดพลังงาน'} />
            </Field>
            <Field label="จุดเด่น (English)">
              <textarea rows={5} value={form.features.en} onChange={e => setNested('features','en',e.target.value)} className={inputCls + ' resize-none'} placeholder={'Lift height 9.6m\n1020mm free lift\nEnergy efficient'} />
            </Field>
            <Field label="เหมาะกับงาน (ไทย)">
              <textarea rows={4} value={form.suitableFor.th} onChange={e => setNested('suitableFor','th',e.target.value)} className={inputCls + ' resize-none'} placeholder={'High-Bay Warehouse\nห้องเย็น\nE-commerce'} />
            </Field>
            <Field label="เหมาะกับงาน (English)">
              <textarea rows={4} value={form.suitableFor.en} onChange={e => setNested('suitableFor','en',e.target.value)} className={inputCls + ' resize-none'} placeholder={'High-bay warehouse\nCold storage\nE-commerce'} />
            </Field>
            <Field label="การรับประกัน (ไทย)">
              <input value={form.warranty.th} onChange={e => setNested('warranty','th',e.target.value)} className={inputCls} placeholder="3 เดือน ชิ้นส่วนหลัก" />
            </Field>
            <Field label="การรับประกัน (English)">
              <input value={form.warranty.en} onChange={e => setNested('warranty','en',e.target.value)} className={inputCls} placeholder="3-month warranty on major components" />
            </Field>
          </div>
        </section>

        {/* Submit */}
        <div className="flex items-center gap-4 pb-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-black font-heading font-bold text-sm tracking-widest uppercase px-10 py-3.5 transition-all"
          >
            {saving ? 'กำลังบันทึก...' : isEdit ? 'บันทึกการแก้ไข' : 'เพิ่มสินค้า'}
          </button>
          <Link to="/admin/products" className="font-body text-sm text-gray-500 hover:text-gray-700">ยกเลิก</Link>
        </div>
      </form>
    </AdminLayout>
  )
}

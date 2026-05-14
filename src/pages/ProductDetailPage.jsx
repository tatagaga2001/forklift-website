import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { getProductById, products, categoryMeta, CONDITIONS, POWER_TYPES } from '../data/products'
import ProductCard from '../components/products/ProductCard'
import { companyInfo } from '../data/mockData'

const powerLabel = {
  diesel:   { th: 'ดีเซล',    en: 'Diesel',   icon: '🔥' },
  lpg:      { th: 'LPG',      en: 'LPG',      icon: '💨' },
  electric: { th: 'ไฟฟ้า',   en: 'Electric', icon: '⚡' },
  manual:   { th: 'แรงคน',    en: 'Manual',   icon: '💪' },
}
const tireLabel = {
  cushion:          { th: 'ยางแข็ง (Cushion)',      en: 'Cushion' },
  pneumatic:        { th: 'ยางลม (Pneumatic)',       en: 'Pneumatic' },
  solid_pneumatic:  { th: 'ยางแข็ง Solid Pneumatic', en: 'Solid Pneumatic' },
  polyurethane:     { th: 'Polyurethane',            en: 'Polyurethane' },
}
const mastLabel = {
  '1-stage': { th: '1 ชั้น (Simplex)',  en: '1-Stage Simplex' },
  '2-stage': { th: '2 ชั้น (Duplex)',   en: '2-Stage Duplex' },
  '3-stage': { th: '3 ชั้น (Triplex)',  en: '3-Stage Triplex' },
  '4-stage': { th: '4 ชั้น (Quad)',     en: '4-Stage Quad' },
}
const condLabel = {
  new:    { th: 'มือหนึ่ง', en: 'New',    style: 'bg-gold-500 text-industrial-900' },
  used:   { th: 'มือสอง',  en: 'Used',   style: 'bg-industrial-600 text-white border border-industrial-500' },
  rental: { th: 'เช่า',    en: 'Rental', style: 'bg-blue-600 text-white' },
}

function SpecRow({ label, value, unit = '' }) {
  if (!value && value !== 0) return null
  return (
    <div className="flex items-start justify-between py-3 border-b border-industrial-700/60">
      <span className="font-body text-industrial-400 text-sm">{label}</span>
      <span className="font-heading font-semibold text-white text-sm text-right">
        {value}{unit && <span className="text-industrial-400 font-normal ml-1">{unit}</span>}
      </span>
    </div>
  )
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, lang } = useLanguage()
  const d = t.detail

  const product = getProductById(id)
  const [activeImg, setActiveImg] = useState(0)

  if (!product) {
    return (
      <div className="min-h-screen bg-industrial-900 pt-28 flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4 opacity-30">🔍</div>
        <h2 className="font-display text-4xl text-white mb-4">ไม่พบสินค้า</h2>
        <p className="text-industrial-400 mb-8">Product not found</p>
        <Link to="/products" className="bg-gold-500 text-industrial-900 font-heading font-bold text-sm tracking-widest uppercase px-8 py-3 hover:bg-gold-400 transition-colors">
          {d.backToProducts}
        </Link>
      </div>
    )
  }

  const s = product.specs
  const cat = categoryMeta[product.category]
  const cond = condLabel[product.condition]
  const pw = product.specs.powerType ? powerLabel[product.specs.powerType] : null
  const tire = s.tireType ? tireLabel[s.tireType] : null
  const mast = s.mastType ? mastLabel[s.mastType] : null

  // Related products: same category, different id
  const related = products
    .filter(pr => pr.category === product.category && pr.id !== product.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-industrial-900 pt-20">

      {/* Breadcrumb */}
      <div className="bg-industrial-800 border-b border-industrial-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs font-heading text-industrial-500">
          <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-gold-400 transition-colors">{t.nav.products}</Link>
          <span>/</span>
          <span className="text-industrial-300 truncate max-w-[200px]">{product.name[lang]}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Top: Image + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

          {/* Left: Images */}
          <div>
            {/* Main image */}
            <div className="relative aspect-[4/3] bg-industrial-800 border border-industrial-700 overflow-hidden mb-3">
              <img
                src={product.images[activeImg]}
                alt={product.name[lang]}
                className="w-full h-full object-cover"
              />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold-500 pointer-events-none" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold-500 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold-500 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold-500 pointer-events-none" />
              {/* Condition */}
              <div className="absolute top-4 left-4">
                <span className={`font-heading font-bold text-xs tracking-widest uppercase px-3 py-1.5 ${cond.style}`}>
                  {cond[lang]}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative w-20 h-16 overflow-hidden border-2 transition-all duration-150 flex-shrink-0 ${
                      activeImg === i ? 'border-gold-500' : 'border-industrial-700 hover:border-industrial-500'
                    }`}
                  >
                    <img src={img} alt={`view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div>
            {/* Category */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{cat.icon}</span>
              <span className="font-heading font-medium text-gold-500 text-xs tracking-[0.25em] uppercase">{cat[lang]}</span>
            </div>

            {/* Name */}
            <h1 className="font-heading font-bold text-white text-2xl sm:text-3xl leading-tight mb-2">
              {product.name[lang]}
            </h1>

            {/* Brand + Model + SKU */}
            <div className="flex flex-wrap gap-3 mb-6 text-sm font-body text-industrial-400">
              <span>{d.brand}: <span className="text-white">{product.brand}</span></span>
              <span className="text-industrial-600">|</span>
              <span>{d.model}: <span className="text-white">{product.model}</span></span>
              <span className="text-industrial-600">|</span>
              <span>{d.sku}: <span className="text-industrial-300 font-mono text-xs">{product.sku}</span></span>
            </div>

            {/* Key 4 Specs Hero */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {s.liftingCapacityKg && (
                <div className="bg-industrial-800 border border-industrial-700 p-4">
                  <div className="text-[10px] text-industrial-500 font-heading tracking-wider uppercase mb-1">{d.capacity}</div>
                  <div className="font-display text-3xl text-gold-400 leading-none">
                    {(s.liftingCapacityKg / 1000).toFixed(1)}
                    <span className="text-base font-body text-industrial-400 ml-1">ตัน</span>
                  </div>
                </div>
              )}
              {s.liftHeightMm > 0 && (
                <div className="bg-industrial-800 border border-industrial-700 p-4">
                  <div className="text-[10px] text-industrial-500 font-heading tracking-wider uppercase mb-1">{d.liftHeight}</div>
                  <div className="font-display text-3xl text-gold-400 leading-none">
                    {(s.liftHeightMm / 1000).toFixed(1)}
                    <span className="text-base font-body text-industrial-400 ml-1">ม.</span>
                  </div>
                </div>
              )}
              {s.powerType && pw && (
                <div className="bg-industrial-800 border border-industrial-700 p-4">
                  <div className="text-[10px] text-industrial-500 font-heading tracking-wider uppercase mb-1">{d.powerType}</div>
                  <div className="font-heading font-semibold text-white text-lg flex items-center gap-1.5">
                    {pw.icon} {pw[lang]}
                  </div>
                </div>
              )}
              {mast && (
                <div className="bg-industrial-800 border border-industrial-700 p-4">
                  <div className="text-[10px] text-industrial-500 font-heading tracking-wider uppercase mb-1">{d.mastType}</div>
                  <div className="font-heading font-semibold text-white text-base leading-tight">{mast[lang]}</div>
                </div>
              )}
            </div>

            {/* Environment tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {s.environment?.includes('indoor') && (
                <span className="font-heading text-xs tracking-wider bg-industrial-700 text-industrial-300 px-3 py-1">{d.indoor}</span>
              )}
              {s.environment?.includes('outdoor') && (
                <span className="font-heading text-xs tracking-wider bg-industrial-700 text-industrial-300 px-3 py-1">{d.outdoor}</span>
              )}
              {s.coldRoomRated && (
                <span className="font-heading text-xs tracking-wider bg-blue-900/40 text-blue-400 border border-blue-700 px-3 py-1">{d.coldRoom}</span>
              )}
              {s.nonMarkingTire && (
                <span className="font-heading text-xs tracking-wider bg-green-900/40 text-green-400 border border-green-700 px-3 py-1">{d.nonMarking}</span>
              )}
              {s.exProof && (
                <span className="font-heading text-xs tracking-wider bg-red-900/40 text-red-400 border border-red-700 px-3 py-1">{d.exProof}</span>
              )}
            </div>

            {/* Price */}
            <div className="bg-industrial-800/60 border border-industrial-700 p-5 mb-6">
              {product.condition === CONDITIONS.RENTAL && product.rentalMonthly ? (
                <div>
                  <div className="text-xs text-industrial-500 font-body mb-1">{d.rentalLabel}</div>
                  <div className="font-display text-4xl text-gold-400">
                    ฿{product.rentalMonthly.toLocaleString()}
                    <span className="text-sm font-body text-industrial-400 ml-2">/เดือน</span>
                  </div>
                  <p className="text-xs text-industrial-500 font-body mt-2">รวม PM + ประกันอุบัติเหตุ</p>
                </div>
              ) : product.price ? (
                <div>
                  <div className="text-xs text-industrial-500 font-body mb-1">{d.priceLabel}</div>
                  <div className="font-display text-4xl text-gold-400">
                    ฿{product.price.toLocaleString()}
                  </div>
                  {product.condition === CONDITIONS.USED && (
                    <p className="text-xs text-industrial-500 font-body mt-2">
                      ปี {product.year} · {product.operatingHours?.toLocaleString()} ชั่วโมง · ผ่านตรวจสอบ 100 จุด
                    </p>
                  )}
                </div>
              ) : (
                <div className="font-heading text-industrial-300">{d.priceOnRequest}</div>
              )}
            </div>

            {/* Contact CTAs */}
            <div className="grid grid-cols-3 gap-3">
              <a
                href={`tel:${companyInfo.phone}`}
                className="flex flex-col items-center gap-1 bg-gold-500 hover:bg-gold-400 text-industrial-900 font-heading font-bold text-xs tracking-wider uppercase py-3.5 transition-all hover:shadow-[0_0_20px_rgba(245,200,66,0.5)]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {d.callNow}
              </a>
              <a
                href="https://line.me/ti/p/~apexlift"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 bg-[#00B900] hover:bg-[#00a000] text-white font-heading font-bold text-xs tracking-wider uppercase py-3.5 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
                {d.lineChat}
              </a>
              <a
                href="#contact"
                className="flex flex-col items-center gap-1 border border-industrial-500 hover:border-gold-500 text-industrial-300 hover:text-gold-400 font-heading font-bold text-xs tracking-wider uppercase py-3.5 transition-all text-center"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {d.getQuote}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: Specs + Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

          {/* Specifications */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl text-white tracking-wide mb-6 pb-3 border-b border-gold-500/40">
              {d.specsTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <div>
                <SpecRow label={d.capacity}         value={s.liftingCapacityKg ? `${(s.liftingCapacityKg/1000).toFixed(1)} ตัน (${s.liftingCapacityKg.toLocaleString()} kg)` : null} />
                <SpecRow label={d.liftHeight}        value={s.liftHeightMm > 0 ? `${(s.liftHeightMm/1000).toFixed(1)} ม. (${s.liftHeightMm.toLocaleString()} mm)` : null} />
                <SpecRow label={d.loadCenter}        value={s.loadCenterMm ? `${s.loadCenterMm} mm` : null} />
                <SpecRow label={d.freeLift}          value={s.freeLiftMm != null ? `${s.freeLiftMm} mm` : null} />
                <SpecRow label={d.mastType}          value={mast?.[lang]} />
                <SpecRow label={d.collapsedHeight}   value={s.mastCollapsedHeightMm ? `${s.mastCollapsedHeightMm} mm` : null} />
                <SpecRow label={d.powerType}         value={pw ? `${pw.icon} ${pw[lang]}` : null} />
                <SpecRow label={d.batteryVoltage}    value={s.batteryVoltage ? `${s.batteryVoltage}V` : null} />
                <SpecRow label={d.batteryCapacity}   value={s.batteryCapacityAh ? `${s.batteryCapacityAh} Ah` : null} />
              </div>
              <div>
                <SpecRow label={d.tireType}          value={tire?.[lang]} />
                <SpecRow label={d.driveWheels}       value={s.driveWheels} />
                <SpecRow label={d.aisleWidth}        value={s.aisleWidthMm ? `${(s.aisleWidthMm/1000).toFixed(2)} ม.` : null} />
                <SpecRow label={d.turningRadius}     value={s.turningRadiusMm ? `${s.turningRadiusMm} mm` : null} />
                <SpecRow label={d.travelSpeed}       value={s.travelSpeedKmh ? `${s.travelSpeedKmh} km/h` : null} />
                <SpecRow label={d.gradeability}      value={s.gradeabilityPct != null ? `${s.gradeabilityPct}%` : null} />
                <SpecRow label={d.overallLength}     value={s.overallLengthMm ? `${s.overallLengthMm} mm` : null} />
                <SpecRow label={d.overallWidth}      value={s.overallWidthMm ? `${s.overallWidthMm} mm` : null} />
                <SpecRow label={d.weight}            value={s.weightKg ? `${s.weightKg.toLocaleString()} kg` : null} />
                {product.operatingHours && (
                  <SpecRow label={d.operatingHours} value={`${product.operatingHours.toLocaleString()} ชม.`} />
                )}
                <SpecRow label={d.yearManufactured}  value={product.year} />
              </div>
            </div>
          </div>

          {/* Features + Suitable For */}
          <div className="space-y-8">
            {/* Features */}
            <div>
              <h2 className="font-display text-2xl text-white tracking-wide mb-4 pb-3 border-b border-gold-500/40">
                {d.featuresTitle}
              </h2>
              <ul className="space-y-3">
                {product.features[lang].map((f, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-gold-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className="font-body text-industrial-300 text-sm leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suitable For */}
            <div>
              <h2 className="font-display text-2xl text-white tracking-wide mb-4 pb-3 border-b border-gold-500/40">
                {d.suitableTitle}
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.suitableFor[lang].map((item, i) => (
                  <span key={i} className="font-heading text-xs tracking-wider bg-industrial-800 border border-industrial-700 text-industrial-300 px-3 py-1.5">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-gold-500" />
              <h2 className="font-display text-3xl text-white tracking-wide">{d.relatedTitle}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(pr => <ProductCard key={pr.id} product={pr} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

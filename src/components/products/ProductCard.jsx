import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { categoryMeta, POWER_TYPES, CONDITIONS } from '../../data/products'

const powerColors = {
  diesel:   { bg: 'bg-amber-500/15',  text: 'text-amber-400',  label: 'Diesel' },
  lpg:      { bg: 'bg-blue-500/15',   text: 'text-blue-400',   label: 'LPG' },
  electric: { bg: 'bg-green-500/15',  text: 'text-green-400',  label: 'Electric' },
  manual:   { bg: 'bg-gray-500/15',   text: 'text-gray-400',   label: 'Manual' },
}

const conditionConfig = {
  new:    { label: { th: 'ใหม่',    en: 'New' },    style: 'bg-gold-500 text-industrial-900' },
  used:   { label: { th: 'มือสอง', en: 'Used' },   style: 'bg-industrial-900 text-white border border-industrial-900' },
  rental: { label: { th: 'เช่า',   en: 'Rental' }, style: 'bg-blue-600 text-white' },
}

export default function ProductCard({ product }) {
  const { t, lang } = useLanguage()

  const name = product.name[lang]
  const catMeta = categoryMeta[product.category]
  const power = powerColors[product.specs.powerType] || powerColors.manual
  const cond = conditionConfig[product.condition]
  const img = product.images[0]

  const priceDisplay = () => {
    if (product.condition === CONDITIONS.RENTAL && product.rentalMonthly) {
      return (
        <div>
          <span className="text-xs text-industrial-500 font-body">{t.detail.rentalLabel}</span>
          <div className="font-display text-2xl text-gold-600 leading-none">
            ฿{product.rentalMonthly.toLocaleString()}
            <span className="text-xs font-body text-industrial-500 ml-1">/เดือน</span>
          </div>
        </div>
      )
    }
    if (product.price) {
      return (
        <div>
          <span className="text-xs text-industrial-500 font-body">{t.detail.priceLabel}</span>
          <div className="font-display text-2xl text-gold-600 leading-none">
            ฿{product.price.toLocaleString()}
          </div>
        </div>
      )
    }
    return (
      <div className="font-heading font-semibold text-sm text-industrial-500">
        {t.detail.priceOnRequest}
      </div>
    )
  }

  return (
    <div className="group relative bg-white border border-industrial-200 hover:border-gold-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(17,17,17,0.08)] flex flex-col">

      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-industrial-100">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-industrial-900/55 to-transparent" />

        {/* Condition badge */}
        <div className="absolute top-3 left-3">
          <span className={`font-heading font-bold text-xs tracking-widest uppercase px-2.5 py-1 ${cond.style}`}>
            {cond.label[lang]}
          </span>
        </div>

        {/* Featured badge */}
        {product.isFeatured && (
          <div className="absolute top-3 right-3">
            <span className="font-heading font-bold text-xs tracking-widest uppercase px-2.5 py-1 bg-gold-500/20 text-gold-600 border border-gold-500/40 backdrop-blur-sm">
              ★ {t.products.featured}
            </span>
          </div>
        )}

        {/* Category icon + name */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <span className="text-base">{catMeta.icon}</span>
          <span className="font-heading text-xs text-white/80 tracking-wider">
            {catMeta[lang]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">

        {/* Brand + Model */}
        <div className="flex items-center justify-between mb-1">
          <span className="font-heading text-xs text-gold-600 tracking-widest uppercase">{product.brand}</span>
          <span className="font-body text-xs text-industrial-500">{product.model}</span>
        </div>

        {/* Name */}
        <h3 className="font-heading font-semibold text-industrial-900 text-base leading-snug mb-4 group-hover:text-gold-500 transition-colors duration-200 line-clamp-2">
          {name}
        </h3>

        {/* Key Specs */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {product.specs.liftingCapacityKg && (
            <div className="bg-industrial-50 border border-industrial-200 px-3 py-2">
              <div className="text-[10px] text-industrial-500 font-heading tracking-wider uppercase mb-0.5">{t.detail.capacity}</div>
              <div className="font-heading font-semibold text-industrial-900 text-sm">
                {(product.specs.liftingCapacityKg / 1000).toFixed(1)} ตัน
              </div>
            </div>
          )}
          {product.specs.liftHeightMm > 0 && (
            <div className="bg-industrial-50 border border-industrial-200 px-3 py-2">
              <div className="text-[10px] text-industrial-500 font-heading tracking-wider uppercase mb-0.5">{t.detail.liftHeight}</div>
              <div className="font-heading font-semibold text-industrial-900 text-sm">
                {(product.specs.liftHeightMm / 1000).toFixed(1)} ม.
              </div>
            </div>
          )}
        </div>

        {/* Power type tag */}
        {product.specs.powerType && (
          <div className="mb-4">
            <span className={`inline-flex items-center gap-1.5 text-xs font-heading font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm ${power.bg} ${power.text}`}>
              {product.specs.powerType === POWER_TYPES.ELECTRIC && '⚡'}
              {product.specs.powerType === POWER_TYPES.DIESEL && '🔥'}
              {product.specs.powerType === POWER_TYPES.LPG && '💨'}
              {power.label}
            </span>
            {product.condition === CONDITIONS.USED && product.operatingHours && (
              <span className="ml-2 text-xs text-industrial-500 font-body">
                {product.operatingHours.toLocaleString()} ชม.
              </span>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price */}
        <div className="mb-4 pt-3 border-t border-industrial-200">
          {priceDisplay()}
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/products/${product.id}`}
            className="flex items-center justify-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-industrial-900 font-heading font-bold text-xs tracking-wider uppercase py-2.5 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {t.products.viewDetail}
          </Link>
          <a
            href="#contact"
            className="flex items-center justify-center gap-1.5 border border-industrial-300 hover:border-gold-500/60 text-industrial-700 hover:text-gold-500 font-heading font-bold text-xs tracking-wider uppercase py-2.5 transition-all duration-200"
          >
            {t.products.requestQuote}
          </a>
        </div>
      </div>

      {/* Bottom gold line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  )
}

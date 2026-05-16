import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useProducts } from '../../hooks/useProducts'

const promoColors = [
  { accent: 'border-gold-500', badge: 'bg-gold-500 text-industrial-900', glow: 'hover:shadow-[0_12px_28px_rgba(17,17,17,0.08)]' },
  { accent: 'border-blue-500',  badge: 'bg-blue-500 text-white',          glow: 'hover:shadow-[0_12px_28px_rgba(17,17,17,0.08)]' },
  { accent: 'border-green-500', badge: 'bg-green-500 text-white',         glow: 'hover:shadow-[0_12px_28px_rgba(17,17,17,0.08)]' },
]

const condLabel = {
  new:    { th: 'ใหม่',    en: 'New' },
  used:   { th: 'มือสอง', en: 'Used' },
  rental: { th: 'เช่า',   en: 'Rental' },
}

export default function Promotions() {
  const { t, lang } = useLanguage()
  const p = t.promos
  const { data: allProducts } = useProducts()

  // ดึงสินค้า Featured จาก Supabase (สูงสุด 3 คัน)
  const featuredProducts = allProducts
    .filter(pr => pr.isFeatured && pr.isAvailable)
    .slice(0, 3)

  // ถ้ายังไม่มี featured products ใช้ static promos แทน
  const useStatic = featuredProducts.length === 0

  const staticPromos = [
    { badge: p.badge1, title: p.title1, desc: p.desc1 },
    { badge: p.badge2, title: p.title2, desc: p.desc2 },
    { badge: p.badge3, title: p.title3, desc: p.desc3 },
  ]

  return (
    <section className="bg-industrial-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-gold-500" />
            <span className="font-heading font-medium text-gold-600 text-xs tracking-[0.3em] uppercase">{p.sectionBadge}</span>
          </div>
          <h2 className="font-display text-5xl sm:text-6xl text-industrial-900 tracking-wide">{p.sectionTitle}</h2>
          <p className="font-body text-industrial-500 mt-3 max-w-xl">{p.sectionSub}</p>
        </div>

        {/* Promo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useStatic ? (
            // Static promos ถ้ายังไม่มีสินค้าจริง
            staticPromos.map((promo, i) => {
              const color = promoColors[i]
              return (
                <div
                  key={i}
                  className={`relative bg-white border-t-2 ${color.accent} border border-industrial-200 p-8 group cursor-pointer transition-all duration-300 ${color.glow} hover:-translate-y-1`}
                >
                  <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                    <div className={`absolute top-0 right-0 w-full h-full ${color.badge} opacity-10 rotate-45 translate-x-6 -translate-y-6`} />
                  </div>
                  <span className={`inline-block ${color.badge} font-heading font-bold text-xs tracking-widest uppercase px-3 py-1 mb-5`}>
                    {promo.badge}
                  </span>
                  <h3 className="font-heading font-semibold text-industrial-900 text-xl leading-tight mb-3">{promo.title}</h3>
                  <p className="font-body text-industrial-500 text-sm leading-relaxed mb-6">{promo.desc}</p>
                  <div className="flex items-center justify-between pt-5 border-t border-industrial-200">
                    <span className="font-body text-industrial-500 text-xs">{p.valid}</span>
                    <a href="#contact" className="font-heading font-semibold text-sm text-gold-600 hover:text-gold-400 flex items-center gap-1.5 transition-colors group/link">
                      {p.cta}
                      <svg className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              )
            })
          ) : (
            // สินค้า Featured จริงจาก Supabase
            featuredProducts.map((product, i) => {
              const color = promoColors[i] || promoColors[0]
              const cond = condLabel[product.condition]
              return (
                <div
                  key={product.id}
                  className={`relative bg-white border-t-2 ${color.accent} border border-industrial-200 group transition-all duration-300 ${color.glow} hover:-translate-y-1 overflow-hidden`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={product.images?.[0]}
                      alt={product.name[lang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className={`absolute top-3 left-3 font-heading font-bold text-xs tracking-widest uppercase px-2.5 py-1 ${color.badge}`}>
                      {cond?.[lang]}
                    </span>
                    {product.isFeatured && (
                      <span className="absolute top-3 right-3 font-heading font-bold text-[10px] tracking-widest uppercase px-2 py-1 bg-black/50 text-gold-400 backdrop-blur-sm">
                        ★ {lang === 'th' ? 'แนะนำ' : 'Featured'}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="font-heading text-xs text-gold-600 tracking-widest uppercase mb-1">{product.brand} · {product.model}</p>
                    <h3 className="font-heading font-semibold text-industrial-900 text-lg leading-tight mb-3 group-hover:text-gold-500 transition-colors line-clamp-2">
                      {product.name[lang]}
                    </h3>

                    {/* Key specs */}
                    <div className="flex gap-3 mb-4">
                      {product.specs?.liftingCapacityKg && (
                        <span className="font-body text-xs text-industrial-500 bg-industrial-50 border border-industrial-200 px-2 py-1">
                          {(product.specs.liftingCapacityKg / 1000).toFixed(1)} ตัน
                        </span>
                      )}
                      {product.specs?.liftHeightMm > 0 && (
                        <span className="font-body text-xs text-industrial-500 bg-industrial-50 border border-industrial-200 px-2 py-1">
                          {(product.specs.liftHeightMm / 1000).toFixed(1)} ม.
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-industrial-200">
                      <div>
                        {product.condition === 'rental' && product.rentalMonthly ? (
                          <span className="font-display text-xl text-gold-600">฿{product.rentalMonthly.toLocaleString()}<span className="text-xs font-body text-industrial-500">/เดือน</span></span>
                        ) : product.price ? (
                          <span className="font-display text-xl text-gold-600">฿{product.price.toLocaleString()}</span>
                        ) : (
                          <span className="font-body text-sm text-industrial-500">{lang === 'th' ? 'ติดต่อสอบถาม' : 'Contact us'}</span>
                        )}
                      </div>
                      <Link
                        to={`/products/${product.id}`}
                        className="font-heading font-semibold text-sm text-gold-600 hover:text-gold-400 flex items-center gap-1.5 transition-colors"
                      >
                        {p.cta}
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 border border-industrial-300 hover:border-gold-500 text-industrial-700 hover:text-gold-600 font-heading font-bold text-sm tracking-widest uppercase px-8 py-3.5 transition-all duration-200"
          >
            {lang === 'th' ? 'ดูสินค้าทั้งหมด' : 'View All Products'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
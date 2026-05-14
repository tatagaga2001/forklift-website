import { useLanguage } from '../../context/LanguageContext'

const promoColors = [
  { accent: 'border-gold-500', badge: 'bg-gold-500 text-industrial-900', glow: 'hover:shadow-[0_12px_28px_rgba(17,17,17,0.08)]' },
  { accent: 'border-blue-500',  badge: 'bg-blue-500 text-white',          glow: 'hover:shadow-[0_12px_28px_rgba(17,17,17,0.08)]' },
  { accent: 'border-green-500', badge: 'bg-green-500 text-white',         glow: 'hover:shadow-[0_12px_28px_rgba(17,17,17,0.08)]' },
]

export default function Promotions() {
  const { t } = useLanguage()
  const p = t.promos

  const promos = [
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
          {promos.map((promo, i) => {
            const color = promoColors[i]
            return (
              <div
                key={i}
                className={`relative bg-white border-t-2 ${color.accent} border border-industrial-200 p-8 group cursor-pointer transition-all duration-300 ${color.glow} hover:-translate-y-1`}
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                  <div className={`absolute top-0 right-0 w-full h-full ${color.badge} opacity-10 rotate-45 translate-x-6 -translate-y-6`} />
                </div>

                {/* Badge */}
                <span className={`inline-block ${color.badge} font-heading font-bold text-xs tracking-widest uppercase px-3 py-1 mb-5`}>
                  {promo.badge}
                </span>

                <h3 className="font-heading font-semibold text-industrial-900 text-xl leading-tight mb-3">
                  {promo.title}
                </h3>
                <p className="font-body text-industrial-500 text-sm leading-relaxed mb-6">
                  {promo.desc}
                </p>

                {/* Footer */}
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
          })}
        </div>
      </div>
    </section>
  )
}

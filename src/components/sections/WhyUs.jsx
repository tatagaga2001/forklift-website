import { useLanguage } from '../../context/LanguageContext'
import { brands } from '../../data/mockData'

const checkIcon = (
  <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

export default function WhyUs() {
  const { t } = useLanguage()
  const w = t.why

  return (
    <section id="why" className="bg-industrial-800 py-24 relative overflow-hidden">

      {/* Pattern background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(245,200,66,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,200,66,0.04) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-gold-500" />
            <span className="font-heading font-medium text-gold-500 text-xs tracking-[0.3em] uppercase">{w.sectionBadge}</span>
            <div className="w-8 h-px bg-gold-500" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl text-white tracking-wide mb-4">{w.sectionTitle}</h2>
          <p className="font-body text-industrial-400 max-w-xl mx-auto">{w.sectionSub}</p>
        </div>

        {/* Why Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
          {w.items.map((item, i) => (
            <div
              key={i}
              className="flex gap-5 bg-industrial-900 border border-industrial-700 p-7 group hover:border-gold-500/30 transition-all duration-300"
            >
              <div className="mt-1">{checkIcon}</div>
              <div>
                <h3 className="font-heading font-semibold text-white text-lg mb-2 group-hover:text-gold-400 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="font-body text-industrial-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Brands */}
        <div className="border-t border-industrial-700 pt-12">
          <p className="font-heading font-medium text-industrial-500 text-xs tracking-[0.3em] uppercase text-center mb-8">
            Brands We Service
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {brands.map((brand, i) => (
              <div
                key={i}
                className="bg-industrial-900 border border-industrial-700 hover:border-gold-500/40 text-industrial-400 hover:text-white font-heading font-semibold text-sm tracking-widest uppercase px-6 py-3 transition-all duration-200 cursor-default"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

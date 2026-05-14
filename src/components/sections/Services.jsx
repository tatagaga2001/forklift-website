import { useLanguage } from '../../context/LanguageContext'

export default function Services() {
  const { t } = useLanguage()
  const s = t.services

  return (
    <section id="services" className="bg-industrial-50 py-24 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-gold-500/3 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Header */}
          <div className="lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-gold-500" />
              <span className="font-heading font-medium text-gold-600 text-xs tracking-[0.3em] uppercase">{s.sectionBadge}</span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl text-industrial-900 tracking-wide leading-none mb-6">
              {s.sectionTitle}
            </h2>
            <p className="font-body text-industrial-500 leading-relaxed mb-10">
              {s.sectionSub}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-gold-500 hover:bg-gold-400 text-industrial-900 font-heading font-bold text-sm tracking-widest uppercase px-8 py-4 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {s.cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right: Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {s.items.map((item, i) => (
              <div
                key={i}
                className="group bg-white border border-industrial-200 hover:border-gold-500/40 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(17,17,17,0.08)]"
              >
                {/* Number */}
                <div className="font-display text-6xl text-industrial-200 group-hover:text-gold-500/25 transition-colors duration-300 leading-none mb-4 select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="font-heading font-semibold text-industrial-900 text-base group-hover:text-gold-500 transition-colors duration-200">
                    {item.title}
                  </h3>
                </div>

                <p className="font-body text-industrial-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

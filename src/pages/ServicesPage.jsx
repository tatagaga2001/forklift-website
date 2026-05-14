import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { services } from '../data/services'

const colorMap = {
  gold:   { border: 'border-yellow-500/40', icon: 'bg-yellow-500/10 text-yellow-500', btn: 'bg-yellow-500 hover:bg-yellow-400 text-black' },
  blue:   { border: 'border-blue-500/40',   icon: 'bg-blue-500/10 text-blue-400',     btn: 'bg-blue-600 hover:bg-blue-500 text-white' },
  orange: { border: 'border-orange-500/40', icon: 'bg-orange-500/10 text-orange-400', btn: 'bg-orange-500 hover:bg-orange-400 text-white' },
  green:  { border: 'border-green-500/40',  icon: 'bg-green-500/10 text-green-400',   btn: 'bg-green-600 hover:bg-green-500 text-white' },
  silver: { border: 'border-gray-400/40',   icon: 'bg-gray-500/10 text-gray-300',     btn: 'bg-gray-600 hover:bg-gray-500 text-white' },
  teal:   { border: 'border-teal-500/40',   icon: 'bg-teal-500/10 text-teal-400',     btn: 'bg-teal-600 hover:bg-teal-500 text-white' },
}

export default function ServicesPage() {
  const { t, lang } = useLanguage()
  const s = t.servicesPage

  return (
    <div className="min-h-screen bg-gray-50 pt-20">

      {/* Header */}
      <div className="bg-industrial-900 border-b border-industrial-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-px bg-gold-500" />
            <span className="font-heading text-gold-500 text-xs tracking-[0.3em] uppercase">Apex Lift</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wide mb-3">{s.pageTitle}</h1>
          <p className="font-body text-industrial-400 text-lg max-w-2xl">{s.pageSub}</p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => {
            const colors = colorMap[svc.color] || colorMap.gold
            return (
              <div
                key={svc.slug}
                className={`bg-white border ${colors.border} border-t-4 rounded-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col`}
              >
                {/* Icon + Name */}
                <div className="p-7 flex-1">
                  <div className={`w-14 h-14 rounded-sm flex items-center justify-center text-2xl mb-5 ${colors.icon}`}>
                    {svc.icon}
                  </div>
                  <h2 className="font-heading font-bold text-gray-900 text-xl mb-2">
                    {svc.name[lang]}
                  </h2>
                  <p className="font-body text-gold-600 text-sm font-medium mb-4">
                    {svc.tagline[lang]}
                  </p>
                  <p className="font-body text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {svc.description[lang]}
                  </p>

                  {/* Features preview */}
                  <ul className="mt-5 space-y-2">
                    {svc.features[lang].slice(0, 3).map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-sm font-body text-gray-600">
                        <span className="text-gold-500 mt-0.5 flex-shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="px-7 pb-7 flex gap-3">
                  <Link
                    to={`/services/${svc.slug}`}
                    className={`flex-1 text-center font-heading font-bold text-xs tracking-widest uppercase py-3 transition-all ${colors.btn}`}
                  >
                    {s.learnMore}
                  </Link>
                  <Link
                    to="/contact"
                    className="flex-1 text-center border border-gray-300 hover:border-gold-500 text-gray-600 hover:text-gold-600 font-heading font-bold text-xs tracking-widest uppercase py-3 transition-all"
                  >
                    {s.contactCta}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 bg-industrial-900 p-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-px bg-gold-500" />
            <span className="font-heading text-gold-500 text-xs tracking-[0.3em] uppercase">ปรึกษาฟรี</span>
            <div className="w-6 h-px bg-gold-500" />
          </div>
          <h3 className="font-display text-4xl text-white tracking-wide mb-3">
            {lang === 'th' ? 'ไม่แน่ใจว่าต้องการบริการอะไร?' : 'Not sure which service you need?'}
          </h3>
          <p className="font-body text-industrial-400 mb-8 max-w-lg mx-auto">
            {lang === 'th'
              ? 'ทีมผู้เชี่ยวชาญพร้อมให้คำปรึกษาฟรี เพื่อหาโซลูชันที่เหมาะกับธุรกิจของคุณ'
              : 'Our specialists will help you find the right solution for your business — at no cost.'}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-gold-500 hover:bg-gold-400 text-industrial-900 font-heading font-bold text-sm tracking-widest uppercase px-10 py-4 transition-all hover:shadow-[0_0_30px_rgba(245,200,66,0.4)]"
          >
            {s.contactCta}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
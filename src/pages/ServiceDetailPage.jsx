import { Link, useParams } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { getServiceBySlug, services } from '../data/services'

const colorMap = {
  gold:   { accent: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', btn: 'bg-yellow-500 hover:bg-yellow-400 text-black', step: 'bg-yellow-500 text-black' },
  blue:   { accent: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/30',   btn: 'bg-blue-600 hover:bg-blue-500 text-white',  step: 'bg-blue-500 text-white' },
  orange: { accent: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30', btn: 'bg-orange-500 hover:bg-orange-400 text-white', step: 'bg-orange-500 text-white' },
  green:  { accent: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/30',  btn: 'bg-green-600 hover:bg-green-500 text-white',  step: 'bg-green-500 text-white' },
  silver: { accent: 'text-gray-300',   bg: 'bg-gray-500/10',   border: 'border-gray-400/30',   btn: 'bg-gray-600 hover:bg-gray-500 text-white',   step: 'bg-gray-500 text-white' },
  teal:   { accent: 'text-teal-400',   bg: 'bg-teal-500/10',   border: 'border-teal-500/30',   btn: 'bg-teal-600 hover:bg-teal-500 text-white',   step: 'bg-teal-500 text-white' },
}

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const { t, lang } = useLanguage()
  const s = t.servicesPage
  const svc = getServiceBySlug(slug)

  if (!svc) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4 opacity-30">🔧</div>
        <h2 className="font-display text-4xl text-gray-900 mb-4">ไม่พบบริการ</h2>
        <Link to="/services" className="bg-gold-500 text-black font-heading font-bold text-sm tracking-widest uppercase px-8 py-3 hover:bg-gold-400 transition-colors">
          {s.backToServices}
        </Link>
      </div>
    )
  }

  const colors = colorMap[svc.color] || colorMap.gold

  // Other services (sidebar)
  const otherServices = services.filter(sv => sv.slug !== slug)

  return (
    <div className="min-h-screen bg-gray-50 pt-20">

      {/* Hero Banner */}
      <div className="bg-industrial-900 border-b border-industrial-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-heading text-industrial-500 mb-6">
            <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-gold-400 transition-colors">{s.allServices}</Link>
            <span>/</span>
            <span className="text-industrial-300">{svc.name[lang]}</span>
          </div>

          <div className="flex items-start gap-6">
            <div className={`w-16 h-16 rounded-sm flex items-center justify-center text-3xl flex-shrink-0 ${colors.bg}`}>
              {svc.icon}
            </div>
            <div>
              <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide mb-2">
                {svc.name[lang]}
              </h1>
              <p className={`font-body text-lg ${colors.accent}`}>{svc.tagline[lang]}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Description */}
            <div className="bg-white border border-gray-200 p-8">
              <p className="font-body text-gray-600 text-base leading-relaxed">{svc.description[lang]}</p>
            </div>

            {/* Features */}
            <div className="bg-white border border-gray-200 p-8">
              <h2 className="font-display text-2xl text-gray-900 tracking-wide mb-6 pb-3 border-b border-gray-100">
                {lang === 'th' ? 'สิ่งที่รวมอยู่ในบริการ' : "What's Included"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {svc.features[lang].map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className={`text-lg mt-0.5 flex-shrink-0 ${colors.accent}`}>✓</span>
                    <span className="font-body text-gray-600 text-sm leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className="bg-white border border-gray-200 p-8">
              <h2 className="font-display text-2xl text-gray-900 tracking-wide mb-8 pb-3 border-b border-gray-100">
                {s.processTitle}
              </h2>
              <div className="flex flex-col sm:flex-row gap-0">
                {svc.process[lang].map((step, i) => (
                  <div key={i} className="flex-1 flex flex-col sm:flex-row items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-sm flex-shrink-0 ${colors.step}`}>
                        {i + 1}
                      </div>
                      <p className="font-body text-gray-600 text-xs text-center mt-2 max-w-[90px] leading-tight">{step}</p>
                    </div>
                    {i < svc.process[lang].length - 1 && (
                      <div className="hidden sm:block flex-1 h-px bg-gray-200 mx-2 mb-6" />
                    )}
                    {i < svc.process[lang].length - 1 && (
                      <div className="sm:hidden w-px h-6 bg-gray-200 my-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Rental Packages */}
            {svc.packages && (
              <div className="bg-white border border-gray-200 p-8">
                <h2 className="font-display text-2xl text-gray-900 tracking-wide mb-6 pb-3 border-b border-gray-100">
                  {s.packagesTitle}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {svc.packages.map((pkg, i) => (
                    <div key={i} className={`border ${colors.border} p-5 text-center`}>
                      <div className="font-heading font-bold text-gray-900 text-lg mb-1">
                        {lang === 'th' ? pkg.name : pkg.nameEn}
                      </div>
                      <div className={`font-display text-xl mb-3 ${colors.accent}`}>{pkg.price}</div>
                      <p className="font-body text-gray-500 text-xs">{pkg.desc[lang]}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PM Schedule */}
            {svc.schedule && (
              <div className="bg-white border border-gray-200 p-8">
                <h2 className="font-display text-2xl text-gray-900 tracking-wide mb-6 pb-3 border-b border-gray-100">
                  {s.scheduleTitle}
                </h2>
                <div className="space-y-4">
                  {svc.schedule.map((row, i) => (
                    <div key={i} className={`flex gap-5 p-4 border ${colors.border} bg-gray-50`}>
                      <div className={`font-heading font-bold text-sm flex-shrink-0 w-32 ${colors.accent}`}>
                        {lang === 'th' ? row.interval : row.intervalEn}
                      </div>
                      <div className="font-body text-gray-600 text-sm">{row.items[lang]}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SLA */}
            {svc.sla && (
              <div className="bg-white border border-gray-200 p-8">
                <h2 className="font-display text-2xl text-gray-900 tracking-wide mb-6 pb-3 border-b border-gray-100">
                  {s.slaTitle}
                </h2>
                <div className="space-y-3">
                  {svc.sla.map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="font-body text-gray-600 text-sm">
                        {lang === 'th' ? row.label : row.labelEn}
                      </span>
                      <span className={`font-heading font-bold text-sm ${colors.accent}`}>
                        {lang === 'th' ? row.time : row.timeEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Battery Comparison */}
            {svc.comparison && (
              <div className="bg-white border border-gray-200 p-8">
                <h2 className="font-display text-2xl text-gray-900 tracking-wide mb-6 pb-3 border-b border-gray-100">
                  {s.comparisonTitle}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-body">
                    <thead>
                      <tr className="bg-industrial-900 text-white">
                        <th className="text-left px-4 py-3 font-heading tracking-wider text-xs uppercase">{s.specCol}</th>
                        <th className="text-center px-4 py-3 font-heading tracking-wider text-xs uppercase">{s.leadAcidCol}</th>
                        <th className="text-center px-4 py-3 font-heading tracking-wider text-xs uppercase text-gold-400">{s.lithiumCol}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {svc.comparison.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 text-gray-600">{lang === 'th' ? row.spec : row.specEn}</td>
                          <td className="px-4 py-3 text-center text-gray-700">{row.leadAcid}</td>
                          <td className={`px-4 py-3 text-center font-semibold ${colors.accent}`}>{row.lithium}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Brands */}
            {svc.brands && (
              <div className="bg-white border border-gray-200 p-8">
                <h2 className="font-display text-2xl text-gray-900 tracking-wide mb-6 pb-3 border-b border-gray-100">
                  {s.brandsTitle}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {svc.brands.map((brand, i) => (
                    <span key={i} className="font-heading font-semibold text-sm tracking-wider border border-gray-200 text-gray-600 px-4 py-2 hover:border-gold-400 hover:text-gold-600 transition-colors cursor-default">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            {svc.faq && (
              <div className="bg-white border border-gray-200 p-8">
                <h2 className="font-display text-2xl text-gray-900 tracking-wide mb-6 pb-3 border-b border-gray-100">
                  {s.faqTitle}
                </h2>
                <div className="space-y-5">
                  {svc.faq[lang].map((item, i) => (
                    <div key={i} className={`border-l-4 ${colors.border} pl-5`}>
                      <p className="font-heading font-semibold text-gray-900 text-sm mb-1.5">{item.q}</p>
                      <p className="font-body text-gray-500 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Contact CTA */}
            <div className="bg-industrial-900 p-7 sticky top-24">
              <h3 className="font-display text-2xl text-white tracking-wide mb-2">{lang === 'th' ? 'สนใจบริการนี้?' : 'Interested?'}</h3>
              <p className="font-body text-industrial-400 text-sm mb-6">{lang === 'th' ? 'ทีมของเราพร้อมให้คำปรึกษาฟรี' : 'Our team is ready for a free consultation.'}</p>
              <div className="space-y-3">
                <Link
                  to="/contact"
                  className={`flex items-center justify-center gap-2 font-heading font-bold text-xs tracking-widest uppercase py-3.5 w-full transition-all ${colors.btn}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {s.contactCta}
                </Link>
                <a
                  href="tel:02-XXX-XXXX"
                  className="flex items-center justify-center gap-2 border border-industrial-600 hover:border-gold-500 text-white hover:text-gold-400 font-heading font-bold text-xs tracking-widest uppercase py-3.5 w-full transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  02-XXX-XXXX
                </a>
              </div>
            </div>

            {/* Other Services */}
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="font-heading font-bold text-gray-900 text-sm tracking-wider uppercase mb-4">{s.allServices}</h3>
              <div className="space-y-2">
                {otherServices.map(sv => (
                  <Link
                    key={sv.slug}
                    to={`/services/${sv.slug}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all group"
                  >
                    <span className="text-xl">{sv.icon}</span>
                    <span className="font-body text-gray-600 text-sm group-hover:text-gray-900 transition-colors">{sv.name[lang]}</span>
                    <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-gold-500 ml-auto transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
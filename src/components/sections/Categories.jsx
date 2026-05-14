import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'

// SVG icons for each category
const categoryIcons = [
  // Engine Forklift
  <svg key="0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <rect x="8" y="10" width="4" height="26" fill="currentColor" opacity="0.6"/>
    <rect x="3" y="34" width="14" height="3" rx="1" fill="#D4A017"/>
    <rect x="3" y="39" width="14" height="3" rx="1" fill="#D4A017"/>
    <rect x="14" y="22" width="26" height="14" rx="2" fill="currentColor" opacity="0.8"/>
    <rect x="14" y="16" width="16" height="10" rx="1" fill="currentColor" opacity="0.5"/>
    <circle cx="21" cy="40" r="5" fill="currentColor" opacity="0.9"/>
    <circle cx="21" cy="40" r="2" fill="#D4A017"/>
    <circle cx="37" cy="40" r="5" fill="currentColor" opacity="0.9"/>
    <circle cx="37" cy="40" r="2" fill="#D4A017"/>
    <rect x="36" y="22" width="6" height="12" rx="2" fill="currentColor" opacity="0.4"/>
  </svg>,
  // Electric Forklift
  <svg key="1" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <rect x="8" y="8" width="4" height="28" fill="currentColor" opacity="0.6"/>
    <rect x="3" y="34" width="14" height="3" rx="1" fill="#D4A017"/>
    <rect x="3" y="39" width="14" height="3" rx="1" fill="#D4A017"/>
    <rect x="14" y="20" width="26" height="16" rx="2" fill="currentColor" opacity="0.8"/>
    <rect x="14" y="14" width="18" height="10" rx="1" fill="currentColor" opacity="0.5"/>
    <circle cx="21" cy="40" r="5" fill="currentColor" opacity="0.9"/>
    <circle cx="21" cy="40" r="2" fill="#D4A017"/>
    <circle cx="37" cy="40" r="5" fill="currentColor" opacity="0.9"/>
    <circle cx="37" cy="40" r="2" fill="#D4A017"/>
    <path d="M26 16 L22 24 L27 24 L23 32" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  // Reach Truck
  <svg key="2" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <rect x="10" y="4" width="3" height="36" fill="currentColor" opacity="0.5"/>
    <rect x="14" y="4" width="2" height="36" fill="currentColor" opacity="0.3"/>
    <rect x="4" y="36" width="14" height="3" rx="1" fill="#D4A017"/>
    <rect x="4" y="41" width="10" height="3" rx="1" fill="#D4A017"/>
    <rect x="16" y="26" width="22" height="14" rx="2" fill="currentColor" opacity="0.8"/>
    <rect x="16" y="18" width="14" height="10" rx="2" fill="currentColor" opacity="0.5"/>
    <rect x="30" y="26" width="8" height="14" rx="2" fill="currentColor" opacity="0.4"/>
    <circle cx="22" cy="44" r="3" fill="currentColor"/>
    <circle cx="35" cy="44" r="3" fill="currentColor"/>
    <line x1="4" y1="28" x2="16" y2="28" stroke="#D4A017" strokeWidth="1.5"/>
  </svg>,
  // Order Picker
  <svg key="3" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <rect x="10" y="2" width="3" height="40" fill="currentColor" opacity="0.5"/>
    <rect x="4" y="30" width="12" height="3" rx="1" fill="#D4A017"/>
    <rect x="4" y="35" width="12" height="3" rx="1" fill="#D4A017"/>
    <rect x="13" y="18" width="22" height="22" rx="2" fill="currentColor" opacity="0.7"/>
    <rect x="15" y="10" width="18" height="10" rx="1" fill="currentColor" opacity="0.4"/>
    <circle cx="20" cy="8" r="4" fill="currentColor" opacity="0.6"/>
    <rect x="18" y="12" width="8" height="8" rx="1" fill="currentColor" opacity="0.5"/>
    <circle cx="19" cy="43" r="3.5" fill="currentColor"/>
    <circle cx="31" cy="43" r="3.5" fill="currentColor"/>
    <rect x="34" y="18" width="6" height="22" rx="2" fill="currentColor" opacity="0.3"/>
  </svg>,
  // Hand Pallet
  <svg key="4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <rect x="6" y="10" width="3" height="28" rx="1.5" fill="currentColor" opacity="0.5"/>
    <rect x="9" y="10" width="26" height="3" rx="1.5" fill="#D4A017"/>
    <rect x="9" y="15" width="26" height="3" rx="1.5" fill="#D4A017"/>
    <rect x="4" y="38" width="36" height="5" rx="2" fill="currentColor" opacity="0.6"/>
    <circle cx="12" cy="44" r="3" fill="currentColor"/>
    <circle cx="36" cy="44" r="3" fill="currentColor"/>
    <rect x="6" y="6" width="3" height="6" rx="1" fill="currentColor" opacity="0.4"/>
  </svg>,
  // Tow Tractor
  <svg key="5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <rect x="4" y="18" width="30" height="16" rx="3" fill="currentColor" opacity="0.8"/>
    <rect x="6" y="12" width="18" height="10" rx="2" fill="currentColor" opacity="0.5"/>
    <rect x="8" y="14" width="14" height="6" rx="1" fill="currentColor" opacity="0.3"/>
    <rect x="34" y="26" width="10" height="8" rx="2" fill="currentColor" opacity="0.4"/>
    <circle cx="12" cy="38" r="6" fill="currentColor" opacity="0.9"/>
    <circle cx="12" cy="38" r="2.5" fill="#D4A017"/>
    <circle cx="30" cy="38" r="6" fill="currentColor" opacity="0.9"/>
    <circle cx="30" cy="38" r="2.5" fill="#D4A017"/>
    <rect x="34" y="30" width="10" height="2" fill="#D4A017" opacity="0.6"/>
  </svg>,
  // Battery / Parts
  <svg key="6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <rect x="8" y="14" width="28" height="20" rx="3" fill="currentColor" opacity="0.7"/>
    <rect x="17" y="10" width="6" height="4" rx="1" fill="currentColor" opacity="0.5"/>
    <rect x="25" y="10" width="6" height="4" rx="1" fill="currentColor" opacity="0.5"/>
    <rect x="12" y="20" width="6" height="8" rx="1" fill="#22c55e" opacity="0.8"/>
    <rect x="22" y="20" width="6" height="8" rx="1" fill="#22c55e" opacity="0.8"/>
    <rect x="32" y="20" width="4" height="8" rx="1" fill="#22c55e" opacity="0.5"/>
    <path d="M24 18 L20 26 L25 26 L21 34" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
]

export default function Categories() {
  const { t } = useLanguage()
  const c = t.cats

  return (
    <section id="categories" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-gold-500" />
            <span className="font-heading font-medium text-gold-600 text-xs tracking-[0.3em] uppercase">{c.sectionBadge}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="font-display text-5xl sm:text-6xl text-industrial-900 tracking-wide">{c.sectionTitle}</h2>
              <p className="font-body text-industrial-500 mt-3 max-w-xl">{c.sectionSub}</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {c.items.map((item, i) => (
            <div
              key={i}
              className={`group relative bg-white border border-industrial-200 hover:border-gold-500/50 p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(17,17,17,0.08)] ${i === 0 ? 'lg:col-span-2 lg:row-span-1' : ''}`}
            >
              {/* Tag */}
              {item.tag && (
                <span className="absolute top-4 right-4 font-heading font-bold text-[10px] tracking-widest uppercase text-gold-600 bg-gold-500/10 border border-gold-500/30 px-2 py-0.5">
                  {item.tag}
                </span>
              )}

              {/* Icon */}
              <div className="text-industrial-500 group-hover:text-gold-500 transition-colors duration-300 mb-5">
                {categoryIcons[i]}
              </div>

              {/* Name */}
              <h3 className="font-heading font-semibold text-industrial-900 text-lg mb-2 group-hover:text-gold-500 transition-colors duration-300 leading-snug">
                {item.name}
              </h3>

              {/* Desc */}
              <p className="font-body text-industrial-500 text-sm leading-relaxed mb-5">
                {item.desc}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 text-gold-600 group-hover:text-gold-400 transition-colors duration-300">
                <span className="font-heading font-semibold text-xs tracking-widest uppercase">{c.cta}</span>
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

              {/* Link overlay */}
              <Link to="/products" className="absolute inset-0" aria-label={item.name} />

              {/* Bottom gold line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

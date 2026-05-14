import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-industrial-900">

      {/* Background: gradient + grid + noise texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-industrial-900 via-industrial-800 to-industrial-900" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,200,66,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,200,66,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Diagonal accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-500/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

      {/* Gold vertical line accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold-500 to-transparent opacity-60" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="w-8 h-px bg-gold-500" />
              <span className="font-heading font-medium text-gold-500 text-xs tracking-[0.3em] uppercase">
                {h.badge}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl text-white leading-none tracking-wide mb-6">
              <span className="block">{h.headline1}</span>
              <span className="block text-gold-500">{h.headline2}</span>
            </h1>

            {/* Sub */}
            <p className="font-body text-industrial-300 text-base sm:text-lg leading-relaxed max-w-lg mb-10">
              {h.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-400 text-industrial-900 font-heading font-bold text-sm tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:shadow-[0_0_30px_rgba(245,200,66,0.5)]"
              >
                {h.cta1}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 border border-industrial-500 hover:border-gold-500 text-white hover:text-gold-400 font-heading font-bold text-sm tracking-widest uppercase px-8 py-4 transition-all duration-200"
              >
                {h.cta2}
              </a>
            </div>

            {/* Stats */}
            <div className="mt-14 flex items-center gap-8 pt-8 border-t border-industrial-700">
              {[
                { value: h.stat1Value, label: h.stat1Label },
                { value: h.stat2Value, label: h.stat2Label },
                { value: h.stat3Value, label: h.stat3Label },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-3xl text-gold-500 leading-none">{s.value}</div>
                  <div className="font-body text-industrial-400 text-xs mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Forklift Visual */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Outer ring */}
            <div className="absolute w-[480px] h-[480px] border border-gold-500/20 rounded-full" />
            <div className="absolute w-[380px] h-[380px] border border-gold-500/10 rounded-full" />

            {/* Main card */}
            <div className="relative w-[420px] h-[340px] bg-industrial-800/60 border border-industrial-600 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold-500" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold-500" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold-500" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold-500" />

              {/* Forklift SVG illustration */}
              <svg viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-72 h-52">
                {/* Mast */}
                <rect x="60" y="20" width="12" height="130" fill="#4A4A4A" />
                <rect x="78" y="20" width="8" height="130" fill="#2E2E2E" />
                {/* Forks */}
                <rect x="40" y="148" width="55" height="8" rx="2" fill="#E8B800" />
                <rect x="40" y="162" width="55" height="8" rx="2" fill="#E8B800" />
                {/* Fork carriage */}
                <rect x="58" y="140" width="24" height="38" fill="#3A3A3A" />
                {/* Body */}
                <rect x="86" y="95" width="130" height="65" rx="4" fill="#3A3A3A" />
                {/* Cabin */}
                <rect x="90" y="75" width="75" height="50" rx="3" fill="#2E2E2E" />
                <rect x="94" y="79" width="67" height="42" rx="2" fill="#1E1E1E" />
                {/* Window */}
                <rect x="98" y="83" width="55" height="28" rx="1" fill="#2a3a4a" opacity="0.8" />
                <line x1="125" y1="83" x2="125" y2="111" stroke="#3a5a7a" strokeWidth="1" />
                {/* Operator silhouette */}
                <circle cx="115" cy="88" r="6" fill="#4A4A4A" />
                <rect x="109" y="94" width="12" height="14" rx="2" fill="#4A4A4A" />
                {/* Counterweight */}
                <rect x="206" y="110" width="30" height="50" rx="3" fill="#252525" />
                <rect x="210" y="118" width="22" height="6" rx="1" fill="#1a1a1a" />
                <rect x="210" y="128" width="22" height="6" rx="1" fill="#1a1a1a" />
                {/* Wheels */}
                <circle cx="115" cy="165" r="22" fill="#1E1E1E" stroke="#4A4A4A" strokeWidth="3" />
                <circle cx="115" cy="165" r="12" fill="#2E2E2E" />
                <circle cx="115" cy="165" r="4" fill="#E8B800" />
                <circle cx="200" cy="165" r="20" fill="#1E1E1E" stroke="#4A4A4A" strokeWidth="3" />
                <circle cx="200" cy="165" r="11" fill="#2E2E2E" />
                <circle cx="200" cy="165" r="4" fill="#E8B800" />
                {/* Exhaust */}
                <rect x="158" y="80" width="6" height="18" rx="3" fill="#3A3A3A" />
                <circle cx="161" cy="77" r="4" fill="#2E2E2E" opacity="0.5" />
                <circle cx="161" cy="70" r="6" fill="#2E2E2E" opacity="0.25" />
                {/* Gold stripe on body */}
                <rect x="86" y="150" width="130" height="4" fill="#E8B800" opacity="0.6" />
                {/* APEX LIFT text on body */}
                <text x="102" y="142" fontFamily="monospace" fontSize="9" fill="#E8B800" opacity="0.8" letterSpacing="1">APEX LIFT</text>
              </svg>

              {/* Label */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="bg-gold-500/10 border border-gold-500/30 px-4 py-1.5">
                  <span className="font-heading text-gold-500 text-xs tracking-[0.25em] uppercase">Premium Forklift Solutions</span>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-gold-500 text-industrial-900 font-heading font-bold text-xs tracking-wider px-3 py-2 shadow-lg">
              NEW ARRIVALS
            </div>
            <div className="absolute -bottom-4 -left-4 bg-industrial-700 border border-industrial-500 text-white font-heading text-xs tracking-wider px-3 py-2">
              USED • CERTIFIED
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-industrial-900 to-transparent" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-industrial-500">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-gold-500/60 animate-pulse" />
      </div>
    </section>
  )
}

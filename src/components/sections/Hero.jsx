import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { heroSlides } from '../../data/heroSlides'

const AUTOPLAY_MS = 30000

export default function Hero() {
  const { lang, t } = useLanguage()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const h = t.hero

  const slide = heroSlides[active]
  const nextSlide = () => setActive(current => (current + 1) % heroSlides.length)
  const prevSlide = () => setActive(current => (current - 1 + heroSlides.length) % heroSlides.length)

  useEffect(() => {
    if (paused) return undefined
    const timer = window.setInterval(nextSlide, AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [paused])

  const stats = useMemo(() => ([
    { value: h.stat1Value, label: h.stat1Label },
    { value: h.stat2Value, label: h.stat2Label },
    { value: h.stat3Value, label: h.stat3Label },
  ]), [h])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-industrial-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-industrial-900 via-industrial-800 to-industrial-900" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,160,23,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,160,23,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-500/5 to-transparent" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold-500 to-transparent opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div key={slide.id} className="animate-[fadeIn_500ms_ease-out]">
            <div className="inline-flex items-center gap-2 mb-6 sm:mb-8">
              <div className="w-8 h-px bg-gold-500" />
              <span className="font-heading font-medium text-gold-500 text-xs tracking-[0.3em] uppercase">
                {slide.badge[lang]}
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-6xl xl:text-7xl text-white leading-none tracking-wide mb-5 sm:mb-6">
              <span className="block">{slide.title[lang]}</span>
              <span className="block text-gold-500">{slide.subtitle[lang]}</span>
            </h1>

            <p className="font-body text-industrial-300 text-base sm:text-lg leading-relaxed max-w-xl mb-8 sm:mb-10">
              {slide.description[lang]}
            </p>

            <div key={`${slide.id}-mobile-visual`} className="relative md:hidden h-36 mb-8 bg-industrial-800/60 border border-industrial-600 overflow-hidden animate-[fadeIn_500ms_ease-out]">
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-gold-500" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-gold-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <HeroVisual type={slide.visual} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <HeroLink
                href={slide.primaryHref}
                className="group inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-400 text-industrial-900 font-heading font-bold text-sm tracking-widest uppercase px-8 py-4 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {slide.primaryCta[lang]}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </HeroLink>
              <HeroLink
                href={slide.secondaryHref}
                className="inline-flex items-center justify-center gap-3 border border-industrial-500 hover:border-gold-500 text-white hover:text-gold-400 font-heading font-bold text-sm tracking-widest uppercase px-8 py-4 transition-all duration-200"
              >
                {slide.secondaryCta[lang]}
              </HeroLink>
            </div>

            <div className="mt-12 sm:mt-14 flex items-center gap-6 sm:gap-8 pt-8 border-t border-industrial-700">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-3xl text-gold-500 leading-none">{s.value}</div>
                  <div className="font-body text-industrial-400 text-xs mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden md:flex items-center justify-center min-h-[340px] lg:min-h-[460px]">
            <div className="absolute w-[320px] h-[320px] lg:w-[480px] lg:h-[480px] border border-gold-500/20 rounded-full transition-all duration-500" />
            <div className="absolute w-[250px] h-[250px] lg:w-[380px] lg:h-[380px] border border-gold-500/10 rounded-full transition-all duration-500" />

            <div key={`${slide.id}-visual`} className="relative w-[330px] h-[270px] lg:w-[420px] lg:h-[340px] bg-industrial-800/60 border border-industrial-600 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden animate-[fadeIn_500ms_ease-out]">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold-500" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold-500" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold-500" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold-500" />

              <HeroVisual type={slide.visual} />

              <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4">
                <div className="bg-gold-500/10 border border-gold-500/30 px-4 py-1.5">
                  <span className="font-heading text-gold-500 text-xs tracking-[0.25em] uppercase">{slide.label}</span>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 right-4 lg:-right-4 bg-gold-500 text-industrial-900 font-heading font-bold text-xs tracking-wider px-3 py-2 shadow-lg">
              {slide.badge.en}
            </div>
            <div className="absolute -bottom-4 left-4 lg:-left-4 bg-industrial-700 border border-industrial-500 text-white font-heading text-xs tracking-wider px-3 py-2">
              APEX LIFT
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-industrial-900 to-transparent" />

      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={prevSlide}
              className="flex w-9 h-9 sm:w-10 sm:h-10 items-center justify-center border border-white/20 text-white hover:border-gold-500 hover:text-gold-400 transition-colors"
              aria-label="Previous slide"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="grid grid-cols-3 gap-2 flex-1" role="tablist" aria-label="Hero slides">
              {heroSlides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  className="group text-left"
                  aria-label={`Go to slide ${index + 1}: ${item.badge[lang]}`}
                  aria-selected={active === index}
                  role="tab"
                >
                  <span className="block h-1 bg-white/20 overflow-hidden">
                    <span
                      className={`block h-full bg-gold-500 transition-all duration-300 ${
                        active === index ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </span>
                  <span className={`mt-2 hidden sm:block font-heading text-[10px] tracking-[0.22em] uppercase transition-colors ${
                    active === index ? 'text-gold-500' : 'text-industrial-400 group-hover:text-white'
                  }`}>
                    {item.badge[lang]}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              className="flex w-9 h-9 sm:w-10 sm:h-10 items-center justify-center border border-white/20 text-white hover:border-gold-500 hover:text-gold-400 transition-colors"
              aria-label="Next slide"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

function HeroLink({ href, className, children }) {
  if (href.startsWith('/')) {
    return <Link to={href} className={className}>{children}</Link>
  }

  return <a href={href} className={className}>{children}</a>
}

function HeroVisual({ type }) {
  const service = type === 'service'
  const certified = type === 'certified'

  return (
    <svg viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-64 h-48 lg:w-72 lg:h-52">
      <rect x="60" y="20" width="12" height="130" fill="#4A4A4A" />
      <rect x="78" y="20" width="8" height="130" fill="#2E2E2E" />
      <rect x="40" y="148" width="55" height="8" rx="2" fill="#D4A017" />
      <rect x="40" y="162" width="55" height="8" rx="2" fill="#D4A017" />
      <rect x="58" y="140" width="24" height="38" fill="#3A3A3A" />
      <rect x="86" y="95" width="130" height="65" rx="4" fill={certified ? '#333333' : '#3A3A3A'} />
      <rect x="90" y="75" width="75" height="50" rx="3" fill="#2E2E2E" />
      <rect x="94" y="79" width="67" height="42" rx="2" fill="#1E1E1E" />
      <rect x="98" y="83" width="55" height="28" rx="1" fill="#2a3a4a" opacity="0.8" />
      <line x1="125" y1="83" x2="125" y2="111" stroke="#3a5a7a" strokeWidth="1" />
      <circle cx="115" cy="88" r="6" fill="#4A4A4A" />
      <rect x="109" y="94" width="12" height="14" rx="2" fill="#4A4A4A" />
      <rect x="206" y="110" width="30" height="50" rx="3" fill="#252525" />
      <rect x="210" y="118" width="22" height="6" rx="1" fill="#1a1a1a" />
      <rect x="210" y="128" width="22" height="6" rx="1" fill="#1a1a1a" />
      <circle cx="115" cy="165" r="22" fill="#1E1E1E" stroke="#4A4A4A" strokeWidth="3" />
      <circle cx="115" cy="165" r="12" fill="#2E2E2E" />
      <circle cx="115" cy="165" r="4" fill="#D4A017" />
      <circle cx="200" cy="165" r="20" fill="#1E1E1E" stroke="#4A4A4A" strokeWidth="3" />
      <circle cx="200" cy="165" r="11" fill="#2E2E2E" />
      <circle cx="200" cy="165" r="4" fill="#D4A017" />
      <rect x="158" y="80" width="6" height="18" rx="3" fill="#3A3A3A" />
      <rect x="86" y="150" width="130" height="4" fill="#D4A017" opacity="0.7" />
      <text x="102" y="142" fontFamily="monospace" fontSize="9" fill="#D4A017" opacity="0.9" letterSpacing="1">APEX LIFT</text>

      {certified && (
        <g>
          <circle cx="236" cy="86" r="18" fill="#111111" stroke="#D4A017" strokeWidth="3" />
          <path d="M228 86l5 5 11-12" stroke="#D4A017" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}

      {service && (
        <g>
          <rect x="222" y="76" width="34" height="44" rx="4" fill="#111111" stroke="#D4A017" strokeWidth="2" />
          <path d="M239 86v24M227 98h24" stroke="#D4A017" strokeWidth="4" strokeLinecap="round" />
          <circle cx="244" cy="137" r="10" fill="#D4A017" opacity="0.9" />
          <path d="M238 137h12" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
    </svg>
  )
}

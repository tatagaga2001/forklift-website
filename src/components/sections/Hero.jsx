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
      <div
        key={`${slide.id}-background`}
        className="absolute inset-0 bg-cover bg-center animate-[heroBg_700ms_ease-out]"
        style={{ backgroundImage: `url(${slide.image})` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
      <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-black via-black/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-transparent to-black/20" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,160,23,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,160,23,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold-500 to-transparent opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-28">
        <div className="max-w-2xl">
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
        @keyframes heroBg {
          from { opacity: 0; transform: scale(1.025); }
          to { opacity: 1; transform: scale(1); }
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

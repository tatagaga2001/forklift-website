import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'

export default function Navbar() {
  const { t, lang, setLanguage } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const location = useLocation()
  const navLinks = [
    { label: t.nav.products, href: '/products', key: 'products', isRoute: true },
    { label: t.nav.used,     href: '/used',     key: 'used',     isRoute: true },
    { label: t.nav.services, href: '/services', key: 'services', isRoute: true },
    { label: t.nav.about,    href: '/about',    key: 'about',    isRoute: true },
    { label: t.nav.contact,  href: '/contact',  key: 'contact',  isRoute: true },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-industrial-900/95 backdrop-blur-md border-b border-industrial-700 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gold-500 flex items-center justify-center font-display text-industrial-900 text-lg leading-none">
              AL
            </div>
            <span className="font-display text-2xl tracking-widest text-white">
              APEX<span className="text-gold-500"> LIFT</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-heading font-medium text-sm tracking-widest uppercase text-industrial-200 hover:text-gold-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-heading font-medium text-sm tracking-widest uppercase text-industrial-200 hover:text-gold-400 transition-colors duration-200"
                >
                  {link.label}
                </a>
              )
            ))}
          </nav>

          {/* Right: Language Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-4">

            {/* Language Toggle */}
            <div className="flex items-center gap-1 bg-industrial-800 border border-industrial-600 rounded p-0.5">
              <button
                onClick={() => setLanguage('th')}
                className={`px-3 py-1.5 text-xs font-heading font-semibold tracking-wider uppercase rounded transition-all duration-200 ${
                  lang === 'th'
                    ? 'bg-gold-500 text-industrial-900'
                    : 'text-industrial-300 hover:text-white'
                }`}
              >
                TH
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-xs font-heading font-semibold tracking-wider uppercase rounded transition-all duration-200 ${
                  lang === 'en'
                    ? 'bg-gold-500 text-industrial-900'
                    : 'text-industrial-300 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              className="bg-gold-500 hover:bg-gold-400 text-industrial-900 font-heading font-bold text-sm tracking-widest uppercase px-5 py-2.5 transition-all duration-200 hover:shadow-[0_0_20px_rgba(245,200,66,0.4)]"
            >
              {t.nav.quote}
            </a>
          </div>

          {/* Mobile: Lang + Hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex items-center gap-1 bg-industrial-800 border border-industrial-600 rounded p-0.5">
              <button
                onClick={() => setLanguage('th')}
                className={`px-2.5 py-1 text-xs font-heading font-semibold rounded transition-all duration-200 ${
                  lang === 'th' ? 'bg-gold-500 text-industrial-900' : 'text-industrial-300'
                }`}
              >TH</button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-heading font-semibold rounded transition-all duration-200 ${
                  lang === 'en' ? 'bg-gold-500 text-industrial-900' : 'text-industrial-300'
                }`}
              >EN</button>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              <div className={`w-6 h-0.5 bg-current transition-all duration-300 mb-1.5 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-6 h-0.5 bg-current transition-all duration-300 mb-1.5 ${menuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
          <nav className="flex flex-col gap-1 pb-4 border-t border-industrial-700 pt-4">
            {navLinks.map(link => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-heading font-medium text-sm tracking-widest uppercase text-industrial-200 hover:text-gold-400 py-2.5 border-b border-industrial-800 transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-heading font-medium text-sm tracking-widest uppercase text-industrial-200 hover:text-gold-400 py-2.5 border-b border-industrial-800 transition-colors"
                >
                  {link.label}
                </a>
              )
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-3 bg-gold-500 text-industrial-900 font-heading font-bold text-sm tracking-widest uppercase py-3 text-center"
            >
              {t.nav.quote}
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
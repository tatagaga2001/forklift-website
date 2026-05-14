import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { companyInfo } from '../../data/mockData'

export default function Footer() {
  const { t, lang } = useLanguage()

  const links = [
    { label: t.footer.links.products, href: '/products', key: 'products' },
    { label: t.footer.links.used,     href: '/used',     key: 'used' },
    { label: t.footer.links.services, href: '/services', key: 'services' },
    { label: t.footer.links.about,    href: '/about',    key: 'about' },
    { label: t.footer.links.contact,  href: '/contact',  key: 'contact' },
  ]

  return (
    <footer className="bg-industrial-900 border-t border-industrial-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-gold-500 flex items-center justify-center font-display text-industrial-900 text-lg">AL</div>
              <span className="font-display text-2xl tracking-widest text-white">APEX<span className="text-gold-500"> LIFT</span></span>
            </div>
            <p className="text-industrial-400 text-sm leading-relaxed mb-4">{t.footer.tagline}</p>
            <p className="text-industrial-500 text-xs leading-relaxed">{companyInfo.address[lang]}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold tracking-widest uppercase text-gold-500 text-xs mb-4">Navigation</h4>
            <ul className="space-y-2">
              {links.map(l => (
                <li key={l.key}>
                  <Link to={l.href} className="text-industrial-400 hover:text-white text-sm transition-colors font-body">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold tracking-widest uppercase text-gold-500 text-xs mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-industrial-400 font-body">
              <p>📞 {companyInfo.phone}</p>
              <p>💬 Line: {companyInfo.lineId}</p>
              <p>✉️ {companyInfo.email}</p>
              <p className="text-industrial-500 text-xs mt-3">{companyInfo.hours[lang]}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-industrial-800 text-center text-industrial-600 text-xs font-body">
          {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}
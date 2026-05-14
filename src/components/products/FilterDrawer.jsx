import { useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import ProductFilter from './ProductFilter'

export default function FilterDrawer({ open, onClose, filters, onChange, counts }) {
  const { t } = useLanguage()

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-industrial-800 border-r border-industrial-700 z-50 overflow-y-auto transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Drawer Header */}
        <div className="sticky top-0 bg-industrial-800 border-b border-industrial-700 flex items-center justify-between px-5 py-4 z-10">
          <span className="font-heading font-bold text-white tracking-wider uppercase text-sm">
            {t.products.filterTitle}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-industrial-400 hover:text-white transition-colors"
            aria-label="Close filters"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-5">
          <ProductFilter filters={filters} onChange={onChange} counts={counts} />
        </div>

        {/* Apply button */}
        <div className="sticky bottom-0 bg-industrial-800 border-t border-industrial-700 p-4">
          <button
            onClick={onClose}
            className="w-full bg-gold-500 hover:bg-gold-400 text-industrial-900 font-heading font-bold text-sm tracking-widest uppercase py-3 transition-colors"
          >
            {t.products.filterClose} ({counts.filtered})
          </button>
        </div>
      </div>
    </>
  )
}

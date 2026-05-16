import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useProducts } from '../../hooks/useProducts'
import ProductCard from '../products/ProductCard'

export default function FeaturedProducts() {
  const { t, lang } = useLanguage()
  const { data: allProducts, loading } = useProducts()

  // ดึงสินค้าที่ is_available = true สูงสุด 6 คัน เรียงตาม featured ก่อน
  const featured = allProducts
    .filter(p => p.isAvailable)
    .sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    .slice(0, 6)

  if (loading || featured.length === 0) return null

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-gold-500" />
              <span className="font-heading font-medium text-gold-600 text-xs tracking-[0.3em] uppercase">
                {lang === 'th' ? 'สินค้าในสต็อก' : 'In Stock Now'}
              </span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl text-industrial-900 tracking-wide">
              {lang === 'th' ? 'สินค้าแนะนำ' : 'Featured Products'}
            </h2>
            <p className="font-body text-industrial-500 mt-3">
              {lang === 'th'
                ? 'รถโฟล์คลิฟท์คัดคุณภาพ พร้อมส่งทันที'
                : 'Quality forklifts — ready for immediate delivery'}
            </p>
          </div>
          <Link
            to="/products"
            className="flex-shrink-0 inline-flex items-center gap-2 border border-industrial-300 hover:border-gold-500 text-industrial-700 hover:text-gold-600 font-heading font-bold text-xs tracking-widest uppercase px-6 py-3 transition-all"
          >
            {lang === 'th' ? 'ดูทั้งหมด' : 'View All'}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

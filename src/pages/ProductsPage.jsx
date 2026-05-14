import { useState, useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { products, categoryMeta, CATEGORIES } from '../data/products'
import ProductCard from '../components/products/ProductCard'
import ProductFilter, { CAPACITY_RANGES } from '../components/products/ProductFilter'
import FilterDrawer from '../components/products/FilterDrawer'

const DEFAULT_FILTERS = {
  category: '',
  condition: '',
  powerType: '',
  capacity: 'any',
  mastType: '',
}

const SORT_OPTIONS = ['default', 'priceAsc', 'priceDesc', 'capacity']

export default function ProductsPage() {
  const { t, lang } = useLanguage()
  const p = t.products

  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sort, setSort] = useState('default')
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Apply filters
  const filtered = useMemo(() => {
    let result = [...products]

    if (filters.category) result = result.filter(pr => pr.category === filters.category)
    if (filters.condition) result = result.filter(pr => pr.condition === filters.condition)
    if (filters.powerType) result = result.filter(pr => pr.specs.powerType === filters.powerType)
    if (filters.mastType)  result = result.filter(pr => pr.specs.mastType === filters.mastType)

    const range = CAPACITY_RANGES.find(r => r.key === (filters.capacity || 'any'))
    if (range && range.key !== 'any') {
      result = result.filter(pr =>
        pr.specs.liftingCapacityKg >= range.min &&
        pr.specs.liftingCapacityKg <= range.max
      )
    }

    // Sort
    if (sort === 'priceAsc')  result.sort((a, b) => (a.price || a.rentalMonthly || 0) - (b.price || b.rentalMonthly || 0))
    if (sort === 'priceDesc') result.sort((a, b) => (b.price || b.rentalMonthly || 0) - (a.price || a.rentalMonthly || 0))
    if (sort === 'capacity')  result.sort((a, b) => (b.specs.liftingCapacityKg || 0) - (a.specs.liftingCapacityKg || 0))
    if (sort === 'default')   result.sort((a, b) => b.isFeatured - a.isFeatured)

    return result
  }, [filters, sort])

  // Counts for filter badges
  const counts = useMemo(() => {
    const byCategory = {}
    Object.values(CATEGORIES).forEach(cat => {
      byCategory[cat] = products.filter(pr => pr.category === cat).length
    })
    return { total: products.length, filtered: filtered.length, byCategory }
  }, [filtered])

  const hasActiveFilters = filters.category || filters.condition ||
    filters.powerType || (filters.capacity && filters.capacity !== 'any') || filters.mastType

  return (
    <div className="min-h-screen bg-industrial-900 pt-20">

      {/* Page Header */}
      <div className="bg-industrial-800 border-b border-industrial-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-px bg-gold-500" />
                <span className="font-heading font-medium text-gold-500 text-xs tracking-[0.3em] uppercase">
                  Apex Lift
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide">{p.pageTitle}</h1>
              <p className="font-body text-industrial-400 mt-2">{p.pageSub}</p>
            </div>

            {/* Category Quick Tabs — desktop only */}
            <div className="hidden lg:flex items-center gap-2 flex-wrap justify-end">
              {Object.entries(categoryMeta).map(([key, meta]) => (
                <button
                  key={key}
                  onClick={() => setFilters(prev => ({ ...prev, category: prev.category === key ? '' : key }))}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-heading font-semibold tracking-wider border transition-all duration-150 ${
                    filters.category === key
                      ? 'bg-gold-500 text-industrial-900 border-gold-500'
                      : 'border-industrial-600 text-industrial-400 hover:border-gold-500/50 hover:text-white'
                  }`}
                >
                  {meta.icon} {meta[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* Sidebar Filter — Desktop */}
          <div className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-24 bg-industrial-800 border border-industrial-700 p-5">
              <ProductFilter filters={filters} onChange={setFilters} counts={counts} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="lg:hidden flex items-center gap-2 border border-industrial-600 hover:border-gold-500/50 text-industrial-300 hover:text-white font-heading font-semibold text-xs tracking-wider uppercase px-4 py-2.5 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                  </svg>
                  {p.filterOpen}
                  {hasActiveFilters && (
                    <span className="w-4 h-4 rounded-full bg-gold-500 text-industrial-900 text-[9px] font-bold flex items-center justify-center">
                      !
                    </span>
                  )}
                </button>

                {/* Results count */}
                <span className="font-body text-industrial-400 text-sm">
                  {p.showing} <span className="text-white font-semibold">{counts.filtered}</span> {p.of} {counts.total} {p.items}
                </span>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-industrial-500 font-heading hidden sm:block">{p.sortBy}:</span>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="bg-industrial-800 border border-industrial-600 text-white font-heading text-xs tracking-wider py-2 px-3 focus:outline-none focus:border-gold-500 cursor-pointer"
                >
                  <option value="default">{p.sortDefault}</option>
                  <option value="priceAsc">{p.sortPriceAsc}</option>
                  <option value="priceDesc">{p.sortPriceDesc}</option>
                  <option value="capacity">{p.sortCapacity}</option>
                </select>
              </div>
            </div>

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-5">
                {filters.category && (
                  <FilterChip label={categoryMeta[filters.category][lang]} onRemove={() => setFilters(f => ({ ...f, category: '' }))} />
                )}
                {filters.condition && (
                  <FilterChip label={filters.condition} onRemove={() => setFilters(f => ({ ...f, condition: '' }))} />
                )}
                {filters.powerType && (
                  <FilterChip label={filters.powerType} onRemove={() => setFilters(f => ({ ...f, powerType: '' }))} />
                )}
                {filters.capacity && filters.capacity !== 'any' && (
                  <FilterChip label={p[CAPACITY_RANGES.find(r => r.key === filters.capacity)?.labelKey]} onRemove={() => setFilters(f => ({ ...f, capacity: 'any' }))} />
                )}
                {filters.mastType && (
                  <FilterChip label={filters.mastType} onRemove={() => setFilters(f => ({ ...f, mastType: '' }))} />
                )}
                <button
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="text-xs text-gold-400 hover:text-gold-300 font-heading underline underline-offset-2 transition-colors"
                >
                  {p.filterClear}
                </button>
              </div>
            )}

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <EmptyState t={p} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={setFilters}
        counts={counts}
      />
    </div>
  )
}

function FilterChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-gold-500/10 border border-gold-500/30 text-gold-400 font-heading text-xs tracking-wider px-2.5 py-1">
      {label}
      <button onClick={onRemove} className="text-gold-400/60 hover:text-gold-300 transition-colors leading-none">✕</button>
    </span>
  )
}

function EmptyState({ t }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-5xl mb-4 opacity-30">🔍</div>
      <h3 className="font-heading font-semibold text-white text-xl mb-2">{t.noResults}</h3>
      <p className="font-body text-industrial-500 text-sm max-w-sm">{t.noResultsSub}</p>
    </div>
  )
}

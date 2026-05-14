import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { getUsedProducts, getUsedBrands, filterUsedProducts, categoryMeta, POWER_TYPES, CONDITIONS } from '../data/products'

// ─── Filter config ────────────────────────────────────────────────────────────
const HOURS_RANGES = [
  { key: 'any',   max: Infinity },
  { key: 'low',   max: 2999 },
  { key: 'mid',   max: 6000, min: 3000 },
  { key: 'high',  max: 9000, min: 6001 },
  { key: 'vhigh', min: 9001, max: Infinity },
]
const PRICE_RANGES = [
  { key: 'any',  min: 0,      max: Infinity },
  { key: 'l1',   min: 0,      max: 199999 },
  { key: 'l2',   min: 200000, max: 400000 },
  { key: 'l3',   min: 400001, max: 600000 },
  { key: 'l4',   min: 600001, max: Infinity },
]
const YEAR_OPTIONS = [0, 2016, 2017, 2018, 2019, 2020, 2021, 2022]

const DEFAULT_FILTERS = { brand: '', powerType: '', category: '', price: 'any', hours: 'any', minYear: 0 }

// ─── Used Card ────────────────────────────────────────────────────────────────
function UsedCard({ product, t, lang }) {
  const u = t.used
  const cat = categoryMeta[product.category]

  return (
    <div className="group bg-white border border-gray-200 hover:border-gold-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col">

      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
        <img src={product.images[0]} alt={product.name[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="font-heading font-bold text-[10px] tracking-widest uppercase bg-industrial-800 text-gold-400 border border-gold-500/40 px-2.5 py-1">
            {u.inspectedBadge}
          </span>
          {product.inspection?.passed && (
            <span className="font-heading font-bold text-[10px] tracking-widest uppercase bg-green-700 text-white px-2.5 py-1">
              {u.warrantyBadge}
            </span>
          )}
        </div>

        {/* Year + Hours */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <span className="font-heading font-semibold text-white text-sm bg-black/50 px-2 py-0.5 backdrop-blur-sm">
            {product.year}
          </span>
          <span className="font-heading text-white text-xs bg-black/50 px-2 py-0.5 backdrop-blur-sm">
            {product.operatingHours?.toLocaleString()} {u.hours}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">

        {/* Brand + Category */}
        <div className="flex items-center justify-between mb-1">
          <span className="font-heading text-xs text-gold-600 tracking-widest uppercase font-semibold">{product.brand}</span>
          <span className="text-sm">{cat.icon}</span>
        </div>

        {/* Name */}
        <h3 className="font-heading font-semibold text-gray-900 text-base leading-snug mb-4 group-hover:text-gold-700 transition-colors line-clamp-2">
          {product.name[lang]}
        </h3>

        {/* Key specs */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-50 border border-gray-200 px-3 py-2">
            <div className="text-[10px] text-gray-400 font-heading tracking-wider uppercase mb-0.5">{t.detail.capacity}</div>
            <div className="font-heading font-bold text-gray-800 text-sm">{(product.specs.liftingCapacityKg / 1000).toFixed(1)} ตัน</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 px-3 py-2">
            <div className="text-[10px] text-gray-400 font-heading tracking-wider uppercase mb-0.5">{t.detail.liftHeight}</div>
            <div className="font-heading font-bold text-gray-800 text-sm">{(product.specs.liftHeightMm / 1000).toFixed(1)} ม.</div>
          </div>
        </div>

        {/* Warranty note */}
        {product.warranty && (
          <div className="flex items-center gap-2 text-xs font-body text-green-700 bg-green-50 border border-green-200 px-3 py-2 mb-4">
            <span>🛡️</span> {product.warranty[lang]}
          </div>
        )}

        <div className="flex-1" />

        {/* Price */}
        <div className="pt-3 border-t border-gray-100 mb-4">
          <div className="text-[10px] text-gray-400 font-heading tracking-wider uppercase mb-1">{t.detail.priceLabel}</div>
          <div className="font-display text-2xl text-gold-600 leading-none">
            ฿{product.price?.toLocaleString()}
          </div>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/products/${product.id}`}
            className="flex items-center justify-center bg-gold-500 hover:bg-gold-400 text-black font-heading font-bold text-xs tracking-wider uppercase py-2.5 transition-all"
          >
            {u.viewDetail}
          </Link>
          <Link
            to={`/contact?product=${product.id}`}
            className="flex items-center justify-center border border-gray-300 hover:border-gold-500 text-gray-600 hover:text-gold-600 font-heading font-bold text-xs tracking-wider uppercase py-2.5 transition-all"
          >
            {u.requestQuote}
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── Filter Sidebar ───────────────────────────────────────────────────────────
function UsedFilter({ filters, onChange, brands, t, lang, counts }) {
  const u = t.used
  const set = (key, val) => onChange({ ...filters, [key]: val })
  const hasActive = Object.entries(filters).some(([k, v]) =>
    k === 'price' ? v !== 'any' : k === 'hours' ? v !== 'any' : k === 'minYear' ? v !== 0 : !!v
  )

  const Row = ({ active, onClick, children, count }) => (
    <button onClick={onClick} className={`w-full text-left flex items-center gap-2 px-3 py-2 text-sm font-body transition-all border-l-2 ${active ? 'bg-gold-50 text-gold-700 border-gold-500' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50 border-transparent'}`}>
      <span className="flex-1">{children}</span>
      {count !== undefined && <span className="text-xs text-gray-400">{count}</span>}
    </button>
  )

  const Section = ({ title, children }) => (
    <div className="mb-6">
      <h4 className="font-heading font-semibold text-xs tracking-[0.2em] uppercase text-gold-600 mb-3">{title}</h4>
      <div className="space-y-0.5">{children}</div>
    </div>
  )

  return (
    <aside>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-bold text-gray-900 text-sm tracking-wider uppercase">{u.filterTitle}</h3>
        {hasActive && (
          <button onClick={() => onChange(DEFAULT_FILTERS)} className="text-xs text-gold-600 hover:text-gold-500 font-heading">{u.filterClear}</button>
        )}
      </div>

      {/* Brand */}
      <Section title={u.filterBrand}>
        <Row active={!filters.brand} onClick={() => set('brand', '')}>{u.allBrands} <span className="ml-auto text-xs text-gray-400">{counts.total}</span></Row>
        {brands.map(b => (
          <Row key={b} active={filters.brand === b} onClick={() => set('brand', b)}>{b}</Row>
        ))}
      </Section>

      {/* Power */}
      <Section title={u.filterPower}>
        {[
          { val: '', label: u.allPower },
          { val: POWER_TYPES.DIESEL,  label: t.products.powerDiesel },
          { val: POWER_TYPES.LPG,     label: t.products.powerLpg },
          { val: POWER_TYPES.ELECTRIC,label: t.products.powerElectric },
        ].map(o => <Row key={o.val} active={filters.powerType === o.val} onClick={() => set('powerType', o.val)}>{o.label}</Row>)}
      </Section>

      {/* Price */}
      <Section title={u.filterPrice}>
        {[
          { key: 'any', label: u.priceAny },
          { key: 'l1',  label: u.priceL1 },
          { key: 'l2',  label: u.priceL2 },
          { key: 'l3',  label: u.priceL3 },
          { key: 'l4',  label: u.priceL4 },
        ].map(o => <Row key={o.key} active={filters.price === o.key} onClick={() => set('price', o.key)}>{o.label}</Row>)}
      </Section>

      {/* Hours */}
      <Section title={u.filterHours}>
        {[
          { key: 'any',   label: u.hoursAny },
          { key: 'low',   label: u.hoursLow },
          { key: 'mid',   label: u.hoursMid },
          { key: 'high',  label: u.hoursHigh },
          { key: 'vhigh', label: u.hoursVHigh },
        ].map(o => <Row key={o.key} active={filters.hours === o.key} onClick={() => set('hours', o.key)}>{o.label}</Row>)}
      </Section>

      {/* Year */}
      <Section title={u.filterYear}>
        <select
          value={filters.minYear}
          onChange={e => set('minYear', Number(e.target.value))}
          className="w-full bg-white border border-gray-300 focus:border-gold-500 focus:outline-none px-3 py-2 text-sm font-body text-gray-700"
        >
          <option value={0}>{lang === 'th' ? 'ทุกปี' : 'Any Year'}</option>
          {YEAR_OPTIONS.filter(y => y > 0).map(y => (
            <option key={y} value={y}>{y + 543} ({y})</option>
          ))}
        </select>
      </Section>
    </aside>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function UsedPage() {
  const { t, lang } = useLanguage()
  const u = t.used

  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sort, setSort]       = useState('default')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const brands = useMemo(() => getUsedBrands(), [])

  const filtered = useMemo(() => {
    const priceRange = PRICE_RANGES.find(r => r.key === filters.price) || PRICE_RANGES[0]
    const hoursRange = HOURS_RANGES.find(r => r.key === filters.hours) || HOURS_RANGES[0]

    let result = filterUsedProducts({
      brand:     filters.brand     || undefined,
      powerType: filters.powerType || undefined,
      category:  filters.category  || undefined,
      minPrice:  priceRange.min    || undefined,
      maxPrice:  priceRange.max    || undefined,
      maxHours:  hoursRange.max    || undefined,
      minYear:   filters.minYear   || undefined,
    })

    // Hours min filter
    if (hoursRange.min) result = result.filter(p => (p.operatingHours || 0) >= hoursRange.min)

    if (sort === 'priceAsc')   result.sort((a, b) => (a.price || 0) - (b.price || 0))
    if (sort === 'priceDesc')  result.sort((a, b) => (b.price || 0) - (a.price || 0))
    if (sort === 'hoursAsc')   result.sort((a, b) => (a.operatingHours || 0) - (b.operatingHours || 0))
    if (sort === 'yearDesc')   result.sort((a, b) => (b.year || 0) - (a.year || 0))
    if (sort === 'default')    result.sort((a, b) => b.isFeatured - a.isFeatured)

    return result
  }, [filters, sort])

  const total = useMemo(() => getUsedProducts().length, [])
  const counts = { total, filtered: filtered.length }

  const whyItems = [
    { icon: '🔍', title: u.why1Title, desc: u.why1Desc },
    { icon: '🛡️', title: u.why2Title, desc: u.why2Desc },
    { icon: '🚚', title: u.why3Title, desc: u.why3Desc },
    { icon: '🔄', title: u.why4Title, desc: u.why4Desc },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">

      {/* Hero */}
      <div className="bg-industrial-900 border-b border-industrial-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-6 h-px bg-gold-500" />
                <span className="font-heading text-gold-500 text-xs tracking-[0.3em] uppercase">{u.badge}</span>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wide mb-3">{u.pageTitle}</h1>
              <p className="font-body text-industrial-400 text-base max-w-2xl">{u.pageSub}</p>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="font-display text-3xl text-gold-400">{total}</div>
                <div className="font-body text-industrial-500 text-xs">{lang === 'th' ? 'คันในสต็อก' : 'Units in Stock'}</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl text-gold-400">100</div>
                <div className="font-body text-industrial-500 text-xs">{lang === 'th' ? 'จุดตรวจสอบ' : 'Inspection Points'}</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl text-gold-400">3</div>
                <div className="font-body text-industrial-500 text-xs">{lang === 'th' ? 'เดือนรับประกัน' : 'Month Warranty'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Buy Used */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {whyItems.map((w, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{w.icon}</span>
                <div>
                  <div className="font-heading font-bold text-gray-900 text-sm mb-0.5">{w.title}</div>
                  <div className="font-body text-gray-500 text-xs leading-relaxed">{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">

          {/* Sidebar */}
          <div className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 bg-white border border-gray-200 p-5">
              <UsedFilter filters={filters} onChange={setFilters} brands={brands} t={t} lang={lang} counts={counts} />
            </div>
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                {/* Mobile filter */}
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="lg:hidden flex items-center gap-2 border border-gray-300 hover:border-gold-500 text-gray-600 font-heading font-semibold text-xs tracking-wider uppercase px-4 py-2.5 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                  </svg>
                  {u.filterTitle}
                </button>
                <span className="font-body text-gray-500 text-sm">
                  {u.showing} <span className="font-semibold text-gray-900">{counts.filtered}</span> {u.of} {counts.total} {u.items}
                </span>
              </div>

              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="bg-white border border-gray-300 text-gray-700 font-heading text-xs tracking-wider py-2 px-3 focus:outline-none focus:border-gold-500 cursor-pointer"
              >
                <option value="default">{u.sortDefault}</option>
                <option value="priceAsc">{u.sortPriceAsc}</option>
                <option value="priceDesc">{u.sortPriceDesc}</option>
                <option value="hoursAsc">{u.sortHoursAsc}</option>
                <option value="yearDesc">{u.sortYearDesc}</option>
              </select>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(p => <UsedCard key={p.id} product={p} t={t} lang={lang} />)}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-5xl mb-4 opacity-30">🔍</div>
                <h3 className="font-heading font-bold text-gray-900 text-xl mb-2">{u.noResults}</h3>
                <p className="font-body text-gray-500 text-sm max-w-sm mb-6">{u.noResultsSub}</p>
                <Link to="/contact" className="bg-gold-500 hover:bg-gold-400 text-black font-heading font-bold text-xs tracking-widest uppercase px-8 py-3 transition-colors">
                  {u.ctaBtn}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-industrial-900 p-8 text-center">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-display text-2xl text-white tracking-wide mb-2">{u.ctaTitle}</h3>
            <p className="font-body text-industrial-400 text-sm mb-6">{u.ctaSub}</p>
            <Link
              to="/contact"
              className="inline-block bg-gold-500 hover:bg-gold-400 text-black font-heading font-bold text-xs tracking-widest uppercase px-8 py-3 transition-all"
            >
              {u.ctaBtn}
            </Link>
          </div>
          <div className="bg-white border-2 border-gold-400 p-8 text-center">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="font-display text-2xl text-gray-900 tracking-wide mb-2">
              {lang === 'th' ? 'มีรถเก่าอยากขาย?' : 'Want to Sell Your Forklift?'}
            </h3>
            <p className="font-body text-gray-500 text-sm mb-6">
              {lang === 'th' ? 'รับซื้อและ Trade-in ทุกยี่ห้อ ประเมินราคาฟรีภายใน 24 ชั่วโมง' : 'We buy and trade-in all brands — free valuation within 24 hours.'}
            </p>
            <Link
              to="/contact"
              className="inline-block border-2 border-gold-500 text-gold-700 hover:bg-gold-500 hover:text-black font-heading font-bold text-xs tracking-widest uppercase px-8 py-3 transition-all"
            >
              {u.tradeInBtn}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <>
        <div
          className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 lg:hidden ${drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setDrawerOpen(false)}
        />
        <div className={`fixed top-0 left-0 bottom-0 w-72 bg-white border-r border-gray-200 z-50 overflow-y-auto transition-transform duration-300 lg:hidden ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="sticky top-0 bg-white border-b border-gray-200 flex items-center justify-between px-5 py-4">
            <span className="font-heading font-bold text-gray-900 text-sm tracking-wider uppercase">{u.filterTitle}</span>
            <button onClick={() => setDrawerOpen(false)} className="text-gray-400 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="p-5">
            <UsedFilter filters={filters} onChange={setFilters} brands={brands} t={t} lang={lang} counts={counts} />
          </div>
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
            <button onClick={() => setDrawerOpen(false)} className="w-full bg-gold-500 hover:bg-gold-400 text-black font-heading font-bold text-sm tracking-widest uppercase py-3 transition-colors">
              {lang === 'th' ? `ดูผลลัพธ์ (${counts.filtered})` : `Show Results (${counts.filtered})`}
            </button>
          </div>
        </div>
      </>
    </div>
  )
}
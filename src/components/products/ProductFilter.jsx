import { useLanguage } from '../../context/LanguageContext'
import { CATEGORIES, POWER_TYPES, CONDITIONS, MAST_TYPES, categoryMeta } from '../../data/products'

const CAPACITY_RANGES = [
  { key: 'any',    labelKey: 'capacityAny',    min: 0,    max: Infinity },
  { key: 'light',  labelKey: 'capacityLight',  min: 0,    max: 1999 },
  { key: 'medium', labelKey: 'capacityMedium', min: 2000, max: 3000 },
  { key: 'heavy',  labelKey: 'capacityHeavy',  min: 3001, max: 6000 },
  { key: 'xheavy', labelKey: 'capacityXHeavy', min: 6001, max: Infinity },
]

function FilterSection({ title, children }) {
  return (
    <div className="mb-6">
      <h4 className="font-heading font-semibold text-xs tracking-[0.2em] uppercase text-gold-600 mb-3">
        {title}
      </h4>
      <div className="space-y-1.5">{children}</div>
    </div>
  )
}

function FilterOption({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-center gap-2.5 px-3 py-2 text-sm font-body transition-all duration-150 ${
        active
          ? 'bg-gold-500/15 text-industrial-900 border-l-2 border-gold-500'
          : 'text-industrial-600 hover:text-industrial-900 hover:bg-industrial-50 border-l-2 border-transparent'
      }`}
    >
      {children}
    </button>
  )
}

export default function ProductFilter({ filters, onChange, counts }) {
  const { t, lang } = useLanguage()
  const p = t.products

  const set = (key, val) => onChange({ ...filters, [key]: val })

  const hasActiveFilters =
    filters.category || filters.condition || filters.powerType ||
    (filters.capacity && filters.capacity !== 'any') || filters.mastType

  return (
    <aside className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-bold text-industrial-900 tracking-wider uppercase text-sm">
          {p.filterTitle}
        </h3>
        {hasActiveFilters && (
          <button
            onClick={() => onChange({ category: '', condition: '', powerType: '', capacity: 'any', mastType: '' })}
            className="text-xs font-heading text-gold-600 hover:text-gold-400 transition-colors"
          >
            {p.filterClear}
          </button>
        )}
      </div>

      {/* Category */}
      <FilterSection title={p.filterCategory}>
        <FilterOption active={!filters.category} onClick={() => set('category', '')}>
          <span className="text-lg">🔍</span> {p.allCategories}
          <span className="ml-auto text-xs text-industrial-500">{counts.total}</span>
        </FilterOption>
        {Object.entries(CATEGORIES).map(([, val]) => {
          const meta = categoryMeta[val]
          return (
            <FilterOption key={val} active={filters.category === val} onClick={() => set('category', val)}>
              <span className="text-base">{meta.icon}</span>
              <span className="flex-1 text-xs">{meta[lang]}</span>
              <span className="text-xs text-industrial-500">{counts.byCategory?.[val] || 0}</span>
            </FilterOption>
          )
        })}
      </FilterSection>

      {/* Condition */}
      <FilterSection title={p.filterCondition}>
        {[
          { val: '', label: p.allConditions },
          { val: CONDITIONS.NEW,    label: p.condNew },
          { val: CONDITIONS.USED,   label: p.condUsed },
          { val: CONDITIONS.RENTAL, label: p.condRental },
        ].map(opt => (
          <FilterOption key={opt.val} active={filters.condition === opt.val} onClick={() => set('condition', opt.val)}>
            {opt.label}
          </FilterOption>
        ))}
      </FilterSection>

      {/* Power Type */}
      <FilterSection title={p.filterPower}>
        {[
          { val: '',                  label: p.allPowerTypes, icon: '⚙️' },
          { val: POWER_TYPES.DIESEL,  label: p.powerDiesel,  icon: '🔥' },
          { val: POWER_TYPES.LPG,     label: p.powerLpg,     icon: '💨' },
          { val: POWER_TYPES.ELECTRIC,label: p.powerElectric,icon: '⚡' },
          { val: POWER_TYPES.MANUAL,  label: p.powerManual,  icon: '💪' },
        ].map(opt => (
          <FilterOption key={opt.val} active={filters.powerType === opt.val} onClick={() => set('powerType', opt.val)}>
            <span>{opt.icon}</span> {opt.label}
          </FilterOption>
        ))}
      </FilterSection>

      {/* Capacity */}
      <FilterSection title={p.filterCapacity}>
        {CAPACITY_RANGES.map(range => (
          <FilterOption
            key={range.key}
            active={(filters.capacity || 'any') === range.key}
            onClick={() => set('capacity', range.key)}
          >
            {p[range.labelKey]}
          </FilterOption>
        ))}
      </FilterSection>

      {/* Mast Type */}
      <FilterSection title={p.filterMast}>
        {[
          { val: '',              label: p.allMastTypes },
          { val: MAST_TYPES.DUPLEX,   label: '2-Stage (Duplex)' },
          { val: MAST_TYPES.TRIPLEX,  label: '3-Stage (Triplex)' },
          { val: MAST_TYPES.QUAD,     label: '4-Stage (Quad)' },
        ].map(opt => (
          <FilterOption key={opt.val} active={filters.mastType === opt.val} onClick={() => set('mastType', opt.val)}>
            {opt.label}
          </FilterOption>
        ))}
      </FilterSection>
    </aside>
  )
}

export { CAPACITY_RANGES }

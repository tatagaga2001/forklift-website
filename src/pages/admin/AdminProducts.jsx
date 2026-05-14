import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import { fetchProducts, deleteProduct, toggleAvailability, toggleFeatured } from '../../lib/productApi'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')
  const [filter,   setFilter]   = useState('all') // all | new | used | rental

  const load = async () => {
    setLoading(true)
    try {
      const data = await fetchProducts()
      setProducts(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filtered = products.filter(p => {
    const matchSearch = !search ||
      p.name.th.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || p.condition === filter
    return matchSearch && matchFilter
  })

  const handleDelete = async (id, name) => {
    if (!confirm(`ลบ "${name}" ออกจากระบบ?\nไม่สามารถกู้คืนได้`)) return
    await deleteProduct(id)
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const handleToggleAvail = async (id, current) => {
    await toggleAvailability(id, !current)
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isAvailable: !current } : p))
  }

  const handleToggleFeatured = async (id, current) => {
    await toggleFeatured(id, !current)
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isFeatured: !current } : p))
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-3xl text-gray-900 tracking-wide">จัดการสินค้า</h2>
          <p className="font-body text-gray-500 text-sm mt-1">{filtered.length} รายการ</p>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-black font-heading font-bold text-xs tracking-widest uppercase px-5 py-2.5 transition-all"
        >
          ➕ เพิ่มสินค้า
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="ค้นหาชื่อ, SKU, ยี่ห้อ..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-white border border-gray-300 focus:border-gold-500 focus:outline-none px-4 py-2.5 font-body text-sm text-gray-900"
        />
        <div className="flex gap-2">
          {['all','new','used','rental'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-heading font-semibold text-xs tracking-wider uppercase px-4 py-2.5 border transition-all ${
                filter === f
                  ? 'bg-gold-500 border-gold-500 text-black'
                  : 'bg-white border-gray-300 text-gray-600 hover:border-gold-400'
              }`}
            >
              {f === 'all' ? 'ทั้งหมด' : f === 'new' ? 'ใหม่' : f === 'used' ? 'มือสอง' : 'เช่า'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-heading text-xs tracking-wider uppercase text-gray-500 w-16">รูป</th>
                <th className="text-left px-4 py-3 font-heading text-xs tracking-wider uppercase text-gray-500">สินค้า</th>
                <th className="text-left px-4 py-3 font-heading text-xs tracking-wider uppercase text-gray-500">ราคา</th>
                <th className="text-center px-4 py-3 font-heading text-xs tracking-wider uppercase text-gray-500">สภาพ</th>
                <th className="text-center px-4 py-3 font-heading text-xs tracking-wider uppercase text-gray-500">สถานะ</th>
                <th className="text-center px-4 py-3 font-heading text-xs tracking-wider uppercase text-gray-500">Featured</th>
                <th className="text-right px-4 py-3 font-heading text-xs tracking-wider uppercase text-gray-500">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={7} className="text-center py-12 text-gray-400">กำลังโหลด...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-gray-400">ไม่พบสินค้า</td></tr>
              ) : filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  {/* Image */}
                  <td className="px-4 py-3">
                    <img src={p.images[0]} alt="" className="w-14 h-11 object-cover bg-gray-100" />
                  </td>

                  {/* Name */}
                  <td className="px-4 py-3">
                    <p className="text-gray-900 font-medium line-clamp-1">{p.name.th}</p>
                    <p className="text-gray-400 text-xs">{p.sku} · {p.brand} {p.model}</p>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3 text-gray-700">
                    {p.condition === 'rental' && p.rentalMonthly
                      ? `฿${p.rentalMonthly.toLocaleString()}/เดือน`
                      : p.price
                        ? `฿${p.price.toLocaleString()}`
                        : <span className="text-gray-400">—</span>
                    }
                  </td>

                  {/* Condition */}
                  <td className="px-4 py-3 text-center">
                    <span className={`font-heading font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 ${
                      p.condition === 'new'    ? 'bg-blue-100 text-blue-700' :
                      p.condition === 'used'   ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {p.condition === 'new' ? 'ใหม่' : p.condition === 'used' ? 'มือสอง' : 'เช่า'}
                    </span>
                  </td>

                  {/* Availability toggle */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggleAvail(p.id, p.isAvailable)}
                      className={`font-heading font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 transition-all ${
                        p.isAvailable
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {p.isAvailable ? 'พร้อมขาย' : 'ปิดขาย'}
                    </button>
                  </td>

                  {/* Featured toggle */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggleFeatured(p.id, p.isFeatured)}
                      className="text-lg transition-transform hover:scale-110"
                    >
                      {p.isFeatured ? '⭐' : '☆'}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        to={`/products/${p.id}`}
                        target="_blank"
                        className="text-gray-400 hover:text-gray-700 transition-colors"
                        title="ดูหน้าเว็บ"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                      <Link
                        to={`/admin/products/${p.id}`}
                        className="text-gold-600 hover:text-gold-500 font-body text-xs transition-colors"
                      >
                        แก้ไข
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id, p.name.th)}
                        className="text-red-400 hover:text-red-600 font-body text-xs transition-colors"
                      >
                        ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}

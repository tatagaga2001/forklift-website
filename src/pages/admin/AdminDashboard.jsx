import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import { fetchProducts } from '../../lib/productApi'

export default function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const total     = products.length
  const newCount  = products.filter(p => p.condition === 'new').length
  const usedCount = products.filter(p => p.condition === 'used').length
  const rentCount = products.filter(p => p.condition === 'rental').length
  const featured  = products.filter(p => p.isFeatured).length
  const unavail   = products.filter(p => !p.isAvailable).length

  const stats = [
    { label: 'สินค้าทั้งหมด',  value: total,     icon: '🏭', color: 'border-gold-400' },
    { label: 'มือหนึ่ง',        value: newCount,  icon: '✨', color: 'border-blue-400' },
    { label: 'มือสอง',          value: usedCount, icon: '🔄', color: 'border-orange-400' },
    { label: 'เช่า',            value: rentCount, icon: '🔑', color: 'border-green-400' },
    { label: 'Featured',        value: featured,  icon: '⭐', color: 'border-yellow-400' },
    { label: 'ไม่พร้อมขาย',    value: unavail,   icon: '⛔', color: 'border-red-400' },
  ]

  return (
    <AdminLayout>
      <div className="mb-8">
        <h2 className="font-display text-3xl text-gray-900 tracking-wide mb-1">Dashboard</h2>
        <p className="font-body text-gray-500 text-sm">ภาพรวมสินค้าทั้งหมด</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
        {stats.map((s, i) => (
          <div key={i} className={`bg-white border-t-4 ${s.color} border border-gray-200 p-5`}>
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="font-display text-3xl text-gray-900 leading-none mb-1">
              {loading ? '—' : s.value}
            </div>
            <div className="font-body text-gray-500 text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <Link
          to="/admin/products/new"
          className="flex items-center gap-4 bg-gold-500 hover:bg-gold-400 p-6 transition-all group"
        >
          <span className="text-3xl">➕</span>
          <div>
            <div className="font-heading font-bold text-black text-sm tracking-wider">เพิ่มสินค้าใหม่</div>
            <div className="font-body text-black/70 text-xs mt-0.5">เพิ่มรถมือหนึ่ง มือสอง หรือเช่า</div>
          </div>
        </Link>
        <Link
          to="/admin/products"
          className="flex items-center gap-4 bg-white border border-gray-200 hover:border-gold-400 p-6 transition-all"
        >
          <span className="text-3xl">📋</span>
          <div>
            <div className="font-heading font-bold text-gray-900 text-sm tracking-wider">จัดการสินค้า</div>
            <div className="font-body text-gray-500 text-xs mt-0.5">แก้ไข ลบ เปิด/ปิดการขาย</div>
          </div>
        </Link>
        <Link
          to="/admin/used"
          className="flex items-center gap-4 bg-white border border-gray-200 hover:border-gold-400 p-6 transition-all"
        >
          <span className="text-3xl">🔄</span>
          <div>
            <div className="font-heading font-bold text-gray-900 text-sm tracking-wider">รถมือสอง</div>
            <div className="font-body text-gray-500 text-xs mt-0.5">จัดการรถมือสองโดยเฉพาะ</div>
          </div>
        </Link>
      </div>

      {/* Recent Products */}
      <div className="bg-white border border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-heading font-bold text-gray-900 text-sm tracking-wider">สินค้าล่าสุด</h3>
          <Link to="/admin/products" className="font-body text-xs text-gold-600 hover:text-gold-500">ดูทั้งหมด →</Link>
        </div>
        <div className="divide-y divide-gray-100">
          {loading ? (
            <div className="px-6 py-8 text-center font-body text-gray-400 text-sm">กำลังโหลด...</div>
          ) : products.slice(0, 8).map(p => (
            <div key={p.id} className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors">
              <img src={p.images[0]} alt={p.name.th} className="w-12 h-10 object-cover flex-shrink-0 bg-gray-100" />
              <div className="flex-1 min-w-0">
                <p className="font-body text-gray-900 text-sm truncate">{p.name.th}</p>
                <p className="font-body text-gray-400 text-xs">{p.sku}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`font-heading font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 ${
                  p.condition === 'new'    ? 'bg-blue-100 text-blue-700' :
                  p.condition === 'used'   ? 'bg-orange-100 text-orange-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {p.condition === 'new' ? 'ใหม่' : p.condition === 'used' ? 'มือสอง' : 'เช่า'}
                </span>
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${p.isAvailable ? 'bg-green-400' : 'bg-red-400'}`} />
                <Link
                  to={`/admin/products/${p.id}`}
                  className="font-body text-xs text-gold-600 hover:text-gold-500 transition-colors"
                >
                  แก้ไข
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}

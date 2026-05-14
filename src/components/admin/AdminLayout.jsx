import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { href: '/admin',          icon: '📊', label: 'Dashboard' },
  { href: '/admin/products', icon: '🏭', label: 'จัดการสินค้า' },
  { href: '/admin/used',     icon: '🔄', label: 'รถมือสอง' },
  { href: '/admin/quotes',   icon: '📋', label: 'ใบเสนอราคา' },
]

export default function AdminLayout({ children }) {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className="w-56 bg-industrial-900 border-r border-industrial-700 flex flex-col flex-shrink-0">

        {/* Logo */}
        <div className="px-5 py-6 border-b border-industrial-700">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gold-500 flex items-center justify-center font-display text-industrial-900 text-sm">AL</div>
            <div>
              <div className="font-display text-white text-lg tracking-widest leading-none">APEX<span className="text-gold-500"> LIFT</span></div>
              <div className="font-body text-industrial-500 text-[10px] mt-0.5">Admin Panel</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => {
            const active = location.pathname === item.href ||
              (item.href !== '/admin' && location.pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-body transition-all ${
                  active
                    ? 'bg-gold-500/15 text-gold-400 border-l-2 border-gold-500'
                    : 'text-industrial-400 hover:text-white hover:bg-industrial-800 border-l-2 border-transparent'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User + Sign out */}
        <div className="px-4 py-4 border-t border-industrial-700">
          <p className="font-body text-industrial-500 text-xs truncate mb-3">{user?.email}</p>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 text-industrial-400 hover:text-red-400 font-body text-xs transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            ออกจากระบบ
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="font-heading font-bold text-gray-900 text-sm tracking-wider uppercase">
            {navItems.find(n => location.pathname === n.href || (n.href !== '/admin' && location.pathname.startsWith(n.href)))?.label || 'Admin'}
          </h1>
          <Link
            to="/"
            target="_blank"
            className="font-body text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1.5 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            ดูหน้าเว็บ
          </Link>
        </div>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

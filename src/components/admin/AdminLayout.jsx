import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { href: '/admin',          icon: '📊', label: 'Dashboard' },
  { href: '/admin/products', icon: '🏭', label: 'จัดการสินค้า' },
  { href: '/admin/used',     icon: '🔄', label: 'รถมือสอง' },
  { href: '/admin/quotes',   icon: '📋', label: 'ใบเสนอราคา' },
]

function SidebarContent({ user, location, handleSignOut, onClose }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-industrial-700">
        <Link to="/admin" onClick={onClose} className="flex items-center gap-2.5">
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
              onClick={onClose}
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
    </div>
  )
}

export default function AdminLayout({ children }) {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const currentLabel = navItems.find(n =>
    location.pathname === n.href ||
    (n.href !== '/admin' && location.pathname.startsWith(n.href))
  )?.label || 'Admin'

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar — Desktop */}
      <aside className="hidden lg:flex w-56 bg-industrial-900 border-r border-industrial-700 flex-col flex-shrink-0">
        <SidebarContent user={user} location={location} handleSignOut={handleSignOut} onClose={() => {}} />
      </aside>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Mobile Drawer */}
      <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-industrial-900 border-r border-industrial-700 z-50 lg:hidden transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent user={user} location={location} handleSignOut={handleSignOut} onClose={() => setDrawerOpen(false)} />
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto min-w-0">

        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {/* Hamburger — Mobile only */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-1.5 text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="font-heading font-bold text-gray-900 text-sm tracking-wider uppercase">
              {currentLabel}
            </h1>
          </div>
          <Link
            to="/"
            target="_blank"
            className="font-body text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1.5 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="hidden sm:inline">ดูหน้าเว็บ</span>
          </Link>
        </div>

        <div className="p-4 sm:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

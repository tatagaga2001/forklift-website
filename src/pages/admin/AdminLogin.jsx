import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
  const { signIn } = useAuth()
  const navigate   = useNavigate()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/admin')
    } catch (err) {
      setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-industrial-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gold-500 flex items-center justify-center font-display text-industrial-900 text-xl">AL</div>
            <span className="font-display text-3xl tracking-widest text-white">APEX<span className="text-gold-500"> LIFT</span></span>
          </div>
          <p className="font-body text-industrial-400 text-sm">Admin Panel</p>
        </div>

        {/* Form */}
        <div className="bg-industrial-800 border border-industrial-700 p-8">
          <h1 className="font-heading font-bold text-white text-lg tracking-wider mb-6">เข้าสู่ระบบ</h1>

          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-400 font-body text-sm px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-heading font-semibold text-xs tracking-wider uppercase text-industrial-400 mb-2">
                อีเมล
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-industrial-900 border border-industrial-600 focus:border-gold-500 focus:outline-none text-white font-body px-4 py-3 text-sm"
                placeholder="admin@apexlift.co.th"
              />
            </div>
            <div>
              <label className="block font-heading font-semibold text-xs tracking-wider uppercase text-industrial-400 mb-2">
                รหัสผ่าน
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-industrial-900 border border-industrial-600 focus:border-gold-500 focus:outline-none text-white font-body px-4 py-3 text-sm"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-industrial-900 font-heading font-bold text-sm tracking-widest uppercase py-3.5 transition-all mt-2"
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

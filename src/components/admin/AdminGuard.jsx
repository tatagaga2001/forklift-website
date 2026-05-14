import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminGuard({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-industrial-900 flex items-center justify-center">
        <div className="text-gold-500 font-heading tracking-widest animate-pulse">กำลังโหลด...</div>
      </div>
    )
  }

  if (!user) return <Navigate to="/admin/login" replace />

  return children
}

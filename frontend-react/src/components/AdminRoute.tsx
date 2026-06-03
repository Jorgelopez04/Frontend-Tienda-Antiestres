import { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminRoute({ children }: { readonly children: ReactElement }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div style={{ padding: 20 }}>Cargando...</div>
  if (!user || user.role !== 'admin') return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

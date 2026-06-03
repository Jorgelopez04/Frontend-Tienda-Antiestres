import { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute({ children }: { readonly children: ReactElement }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div style={{ padding: 20 }}>Cargando...</div>
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

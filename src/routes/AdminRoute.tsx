import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const AdminRoute: React.FC = () => {
  const { user, loading } = useAuth()
  if (loading) return <div>Loading...</div>
  // roles are stored in lowercase ('admin')
  if (!user || user.role !== 'admin') return <Navigate to="/" replace />
  return <Outlet />
}

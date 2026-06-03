import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { login as loginRequest, register as registerRequest } from '../services/AuthService'
import type { AuthResponse } from '../services/AuthService'

type User = {
  id: string
  name: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role?: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const STORAGE_KEY = 'calmaplus-auth'

function getSavedAuth() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return null
  try {
    return JSON.parse(saved) as { user: User; token: string }
  } catch {
    return null
  }
}

function saveAuth(data: { user: User; token: string }) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function clearAuth() {
  localStorage.removeItem(STORAGE_KEY)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = getSavedAuth()
    if (saved) {
      setUser(saved.user)
      setToken(saved.token)
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const response: AuthResponse = await loginRequest(email, password)
    setUser({
      id: response.id,
      name: response.name,
      email: response.email,
      role: response.role,
    })
    setToken(response.token)
    saveAuth({ user: response, token: response.token })
  }

  const register = async (name: string, email: string, password: string, role?: string) => {
    const response: AuthResponse = await registerRequest(name, email, password, role)
    setUser({
      id: response.id,
      name: response.name,
      email: response.email,
      role: response.role,
    })
    setToken(response.token)
    saveAuth({ user: response, token: response.token })
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    clearAuth()
  }

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, token]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

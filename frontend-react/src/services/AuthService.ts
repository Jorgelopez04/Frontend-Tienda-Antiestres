import http from './http'
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'

export type AuthResponse = {
  id: string
  name: string
  email: string
  role: string
  token: string
}

export async function login(email: string, password: string) {
  const response = await http.post(`/auth/login`, { email, password })
  return response.data
}

export async function register(name: string, email: string, password: string, role?: string) {
  const payload: any = { name, email, password }
  if (role) payload.role = role
  const response = await http.post(`/auth/register`, payload)
  return response.data
}

export async function createUserAsAdmin(name: string, email: string, password: string, role: string, token: string) {
  const payload: any = { name, email, password, role }
  const response = await http.post(`/auth/register`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

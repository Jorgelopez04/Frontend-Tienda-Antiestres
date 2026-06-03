import http from './http'
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'

export type UserDTO = {
  id: string
  name: string
  email: string
  role: string
}

export async function fetchUsers(token: string) {
  const response = await http.get(`/users`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data.data ?? response.data
}

export async function updateUserRole(id: string, role: string, token: string) {
  const response = await http.put(`/users/${id}/role`, { role }, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data.data ?? response.data
}

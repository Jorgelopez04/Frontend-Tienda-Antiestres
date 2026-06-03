import http from './http'
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'

export type SupportMessageDTO = {
  id: string
  name?: string
  email?: string
  message: string
  isRead: boolean
  createdAt: string
}

export async function sendSupportMessage(name: string, email: string, message: string) {
  const response = await http.post(`/support`, { name, email, message })
  return response.data
}

export async function fetchSupportMessages(token: string) {
  const response = await http.get(`/support`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data.data ?? response.data
}

export async function markSupportMessageRead(id: string, token: string) {
  const response = await http.put(`/support/${id}/read`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data.data ?? response.data
}

export async function deleteSupportMessage(id: string, token: string) {
  await http.delete(`/support/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

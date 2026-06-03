import http from './http'
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'

export function normalizeImageUrl(rawUrl?: string) {
  if (!rawUrl) return undefined
  const trimmed = rawUrl.trim()
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
    return trimmed
  }
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

export type ProductDTO = {
  id: string
  name: string
  description?: string
  price?: number
  imageUrl?: string
}

export async function fetchProducts() {
  // Backwards compatible: when called without pagination, return array of products
  const response = await http.get(`/products`)
  const payload = response.data
  // If server returns { data, meta } when pagination used, return payload.data
  return payload.data ?? payload
}

export async function fetchProductById(id: string) {
  const response = await http.get(`/products/${id}`)
  return response.data
}

export async function createProduct(product: Omit<ProductDTO, 'id'>, token: string) {
  const response = await http.post(`/products`, product, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export async function updateProduct(id: string, product: Omit<ProductDTO, 'id'>, token: string) {
  const response = await http.put(`/products/${id}`, product, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export async function deleteProduct(id: string, token: string) {
  await http.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'

const http = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor to add Authorization header from localStorage
http.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('calmaplus-auth')
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed?.token) {
        // eslint-disable-next-line no-param-reassign
        config.headers = config.headers || {}
        // @ts-ignore
        config.headers.Authorization = `Bearer ${parsed.token}`
      }
    }
  } catch (err) {
    // ignore
  }
  return config
})

// Response interceptor to handle 401 globally
http.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if (error?.response?.status === 401) {
      try {
        localStorage.removeItem('calmaplus-auth')
      } catch (e) {
        // noop
      }
      // redirect to login
      if (typeof window !== 'undefined') window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default http

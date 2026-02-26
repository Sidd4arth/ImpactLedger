import axios from 'axios'
import { API_BASE_URL } from '@/utils/constants'

// Create axios instance with default settings
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Before every request, attach the JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// After every response, handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // If token expired or invalid, logout user
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error.response?.data || error.message)
  }
)

// ============ AUTH APIs ============
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  verifyOTP: (data) => api.post('/auth/verify-otp', data),
}

// ============ NGO APIs ============
export const ngoAPI = {
  getProfile: (id) => api.get(`/ngo/profile/${id}`),
  updateProfile: (id, data) => api.put(`/ngo/profile/${id}`, data),
  getProjects: (ngoId) => api.get(`/ngo/${ngoId}/projects`),
  createProject: (data) => api.post('/ngo/projects', data),
}

// ============ RECEIPT APIs ============
export const receiptAPI = {
  upload: (formData) => api.post('/compliance/upload-receipt', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getStatus: (receiptId) => api.get(`/compliance/receipt/${receiptId}/status`),
  getAll: (ngoId) => api.get(`/compliance/receipts?ngoId=${ngoId}`),
}

// ============ COMPLIANCE APIs ============
export const complianceAPI = {
  generateForm10BD: (data) => api.post('/compliance/generate-form-10bd', data),
  getForms: (ngoId) => api.get(`/compliance/forms?ngoId=${ngoId}`),
  getFormPreview: (formId) => api.get(`/compliance/form/${formId}/preview`),
}

// ============ SEARCH APIs ============
export const searchAPI = {
  semantic: (data) => api.post('/search/semantic', data),
}

// ============ INVESTOR APIs ============
export const investorAPI = {
  getDashboard: () => api.get('/investor/dashboard'),
  expressInterest: (data) => api.post('/investor/express-interest', data),
}

// ============ VOICE APIs ============
export const voiceAPI = {
  transcribe: (formData) => api.post('/voice/transcribe', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  synthesize: (data) => api.post('/voice/synthesize', data),
}

export default api
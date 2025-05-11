import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const API_URL = import.meta.env.VITE_API_URL + '/api'
const MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true'

const apiClient = axios.create({
  baseURL: !MOCK_DATA ? API_URL : '',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

apiClient.interceptors.request.use(config => {
  if (config.url?.includes('/auth/oauth/kakao')) return config // 로그인에서는 인터셉터 x

  const token = useAuthStore.getState().accessToken
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})

apiClient.interceptors.response.use(
  response => response,
  async error => {
    console.error('API 통신 에러:', error)
    return Promise.reject(error)
  }
)

export default apiClient

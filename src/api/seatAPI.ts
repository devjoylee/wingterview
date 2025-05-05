import apiClient from '@/api/apiClient'

export const fetchSeatMapData = async () => {
  const response = await apiClient.get('/user/seats')
  return response.data
}

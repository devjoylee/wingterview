import apiClient from '@/api/apiClient'

export const fetchSeatMapData = async () => {
  const response = await apiClient.get('/user/seats')
  return response.data
}

export const checkSeatOccupied = async (seatId: string) => {
  const response = await apiClient.get(`/user/seats/${seatId}`)
  return response.data
}

export const blockSeat = async (seatId: string) => {
  const response = await apiClient.put(`/user/seats/${seatId}`)
  return response.data
}

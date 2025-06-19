import apiClient from '@/api/apiClient'
import { API } from './endpoints'

export const fetchSeatMapData = async () => {
  try {
    const response = await apiClient.get<ApiResponse<SeatMapData>>(API.SEAT.ALL)
    return response.data.data
  } catch (error) {
    console.error('전체 자리배치도 조회 실패:', error)
    throw error
  }
}

export const checkSeatOccupied = async (seatId: string) => {
  try {
    const response = await apiClient.get<ApiResponse<{ isSelected: boolean }>>(
      API.SEAT.EACH(seatId)
    )
    return response.data.data.isSelected
  } catch (error) {
    console.error('이선좌 확인 실패:', error)
    throw error
  }
}

export const blockSeat = async (seatId: string) => {
  try {
    const response = await apiClient.put<ApiResponse>(API.SEAT.EACH(seatId))
    return response.data
  } catch (error) {
    console.error('자리 막아두기 실패:', error)
    throw error
  }
}

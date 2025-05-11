import apiClient from '@/api/apiClient'
import { API } from './endpoints'

export const fetchSeatMapData = async () => {
  try {
    const response = await apiClient.get<ApiResponse>(API.SEAT.ALL)
    console.log('🎉 전체 자리배치도 조회 성공:', response.data)
    return response.data
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
    console.log('🎉 이선좌 확인 성공:', response.data.data.isSelected)
    return response.data.data.isSelected
  } catch (error) {
    console.error('이선좌 확인 실패:', error)
    throw error
  }
}

export const blockSeat = async (seatId: string) => {
  try {
    const response = await apiClient.put<ApiResponse>(API.SEAT.EACH(seatId))
    console.log('🎉 자리 막아두기 성공:', response.data)
    return response.data
  } catch (error) {
    console.error('자리 막아두기 실패:', error)
    throw error
  }
}

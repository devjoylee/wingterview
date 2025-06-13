import apiClient from '@/api/apiClient'
import { API } from './endpoints'

export const getInterviewHistory = async (
  userId: string,
  limit: number = 10,
  cursor?: string
) => {
  try {
    const response = await apiClient.get<ApiResponse<HistoryResponse>>(
      API.AI_INTERVIEW.HISTORY(userId, limit, cursor)
    )
    console.log('🎉 인터뷰 히스토리 조회 성공:', response.data)
    return response.data.data
  } catch (error) {
    console.error('인터뷰 히스토리 조회 실패:', error)
    throw error
  }
}

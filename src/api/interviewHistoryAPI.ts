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

export const getFeedback = async (userId: string, interviewId: string) => {
  try {
    const response = await apiClient.get<ApiResponse<FeedbackPageData>>(
      API.AI_INTERVIEW.FEEDBACK_LIST(userId, interviewId)
    )
    console.log('🎉 피드백 조회 성공:', response.data)
    return response.data.data
  } catch (error) {
    console.error('피드백 조회 실패:', error)
    throw error
  }
}

export const requestFeedback = async (userId: string) => {
  try {
    await apiClient.put(API.AI_INTERVIEW.FEEDBACK_REQUEST(userId))
    console.log('🎉 피드백 요청 성공')
  } catch (error) {
    console.error('피드백 요청 실패:', error)
    throw error
  }
}

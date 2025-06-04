import apiClient from '@/api/apiClient'
import { API } from './endpoints'
import { QuizData } from '@/types/quiz'

export const getQuizList = async () => {
  try {
    const response = await apiClient.get<ApiResponse<QuizData[]>>(API.QUIZ.LIST)
    console.log('🎉 오늘의 퀴즈 조회 성공:', response.data.data)
    return response.data.data
  } catch (error) {
    console.error('오늘의 퀴즈 조회 실패:', error)
    throw error
  }
}

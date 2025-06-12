import apiClient from '@/api/apiClient'
import { API } from './endpoints'
import { QuizData } from '@/types/quiz'

export const getQuizList = async (myId: string) => {
  try {
    const response = await apiClient.get<ApiResponse<{ quizList: QuizData[] }>>(
      API.QUIZ.TODAY(myId)
    )
    console.log('🎉 오늘의 퀴즈 조회 성공:', response.data.data)
    return response.data.data.quizList
  } catch (error) {
    console.error('오늘의 퀴즈 조회 실패:', error)
    throw error
  }
}

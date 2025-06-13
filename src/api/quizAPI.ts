import apiClient from '@/api/apiClient'
import { API } from './endpoints'

export const getQuizList = async (myId: string) => {
  try {
    const response = await apiClient.get<ApiResponse<{ quizList: QuizData[] }>>(
      API.QUIZ.TODAY(myId)
    )
    console.log('🎉 오늘의 퀴즈 조회 성공:', response.data.data)
    return response.data.data.quizList
  } catch (error) {
    // @ts-expect-error remove type error
    if (error.response?.data?.message === 'QUIZ_NOT_FOUND') {
      return []
    } else {
      console.error('오늘의 퀴즈 조회 실패:', error)
      throw error
    }
  }
}

export const sendQuizResult = async (
  myId: string,
  result: UserAnswerData[]
) => {
  try {
    await apiClient.post<ApiResponse<null>>(API.QUIZ.TODAY(myId), result)
    console.log('🎉 퀴즈 결과 전송 성공:')
  } catch (error) {
    console.error('퀴즈 결과 전송 실패:', error)
    throw error
  }
}

export const getQuizStatistic = async (myId: string) => {
  try {
    const response = await apiClient.get<ApiResponse<{ correctRate: number }>>(
      API.QUIZ.STAT(myId)
    )
    return response.data.data.correctRate
  } catch (error) {
    console.error('퀴즈 통계 조회 실패:', error)
    throw error
  }
}

export const getQuizHistory = async (
  userId: string,
  wrong: boolean,
  limit: number = 10,
  cursor?: string
) => {
  try {
    const response = await apiClient.get<ApiResponse<QuizHistoryResponse>>(
      API.QUIZ.HISTORY(userId, wrong, limit, cursor)
    )
    console.log('🎉 나의 퀴즈 조회 성공:', response.data)
    return response.data.data
  } catch (error) {
    console.error('나의 퀴즈 조회 실패:', error)
    throw error
  }
}

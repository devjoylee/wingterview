import apiClient from '@/api/apiClient'
import { API } from './endpoints'
import { QuizData, UserAnswerData } from '@/types/quiz'

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

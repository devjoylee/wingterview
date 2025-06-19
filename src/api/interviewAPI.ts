import apiClient from '@/api/apiClient'
import { API } from './endpoints'

export const updateInterviewStatus = async (interviewId: string) => {
  try {
    const response = await apiClient.put<ApiResponse<InterviewStatusData>>(
      API.INTERVIEW.CHANGE_STATUS(interviewId)
    )
    return response.data
  } catch (error) {
    console.error('면접 상태 업데이트 실패:', error)
    throw error
  }
}

export const getInterviewStatus = async () => {
  try {
    const response = await apiClient.get<ApiResponse<InterviewData>>(
      API.INTERVIEW.STATUS
    )
    return response.data
  } catch (error) {
    console.error('면접 상태 불러오기 실패:', error)
    throw error
  }
}

export const generateQuestion = async (
  interviewId: string,
  questionData: RequestQuestionBody
) => {
  try {
    const response = await apiClient.post<ApiResponse<QuestionListData>>(
      API.INTERVIEW.GET_QUESTIONS(interviewId),
      questionData || { question: '', keywords: '' } // 기본값은 메인 질문 생성
    )
    return response.data
  } catch (error) {
    console.error('면접 질문 생성 실패:', error)
    throw error
  }
}

export const sendSelectedQuestion = async (
  interviewId: string,
  selectedIdx: number
) => {
  try {
    const response = await apiClient.post<ApiResponse<null>>(
      API.INTERVIEW.PICK_QUESTION(interviewId),
      { selectedIdx }
    )
    return response.data
  } catch (error) {
    console.error('선택한 질문 전송 실패:', error)
    throw error
  }
}

import apiClient from '@/api/apiClient'
import { API } from './endpoints'

export const findOldInterview = async (myId: string) => {
  try {
    const response = await apiClient.get<ApiResponse<{ interviewId: string }>>(
      API.AI_INTERVIEW.OLD(myId)
    )
    return response.data.data.interviewId
  } catch (error) {
    console.error('이전 인터뷰 id 조회 실패:', error)
    throw error
  }
}

export const getInterviewId = async (duration: number) => {
  try {
    const response = await apiClient.post<ApiResponse<{ interviewId: string }>>(
      API.AI_INTERVIEW.ID,
      {
        time: duration,
      }
    )
    return response.data.data.interviewId
  } catch (error) {
    console.error('AI 면접 시작 실패:', error)
    throw error
  }
}

export const endInterview = async (interviewId: string) => {
  try {
    await apiClient.delete(API.AI_INTERVIEW.END(interviewId))
  } catch (error) {
    console.error('AI 면접 종료 실패:', error)
    throw error
  }
}

export const setInterviewTime = async (
  interviewId: string,
  selectedTime: number
) => {
  try {
    await apiClient.put(API.AI_INTERVIEW.TIME(interviewId), {
      time: selectedTime,
    })
  } catch (error) {
    console.error('면접 시간 설정 실패:', error)
    throw error
  }
}

export const generateQuestion = async (
  interviewId: string,
  questionData?: RequestQuestionBody
) => {
  try {
    const response = await apiClient.post<ApiResponse<{ question: string }>>(
      API.AI_INTERVIEW.QUESTION(interviewId),
      questionData || { question: '', keywords: '' } // 기본값은 메인 질문 생성
    )
    return response.data.data
  } catch (error) {
    console.error('면접 질문 생성 실패:', error)
    throw error
  }
}

export const confirmUploadingFile = async (filename?: string) => {
  try {
    await apiClient.post<ApiResponse<null>>(
      API.AI_INTERVIEW.SAVE_RECODING(filename)
    )
  } catch (error) {
    console.error(`${filename ? '파일' : 'Presigned'} URL 전송 실패:`, error)
    throw error
  }
}

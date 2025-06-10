import apiClient from '@/api/apiClient'
import { API } from './endpoints'

export const getInterviewId = async (duration: number) => {
  try {
    const response = await apiClient.post<ApiResponse<{ interviewId: string }>>(
      API.AI_INTERVIEW.ID,
      {
        time: duration,
      }
    )
    console.log('🎉 AI 면접 시작 성공:', response.data)
    return response.data.data.interviewId
  } catch (error) {
    console.error('AI 면접 시작 실패:', error)
    throw error
  }
}

export const endInterview = async (interviewId: string) => {
  try {
    await apiClient.delete(API.AI_INTERVIEW.END(interviewId))
    console.log('🎉 AI 면접 종료')
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
    console.log('🎉 면접 시간 설정 성공')
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
    console.log('🎉 면접 질문 생성 성공:', response.data)
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

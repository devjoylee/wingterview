import apiClient from '@/api/apiClient'

export const updateInterviewStatus = async (interviewId: string) => {
  const response = await apiClient.put<ApiResponse<InterviewStatusData>>(
    `/interview/${interviewId}/status/next`
  )
  return response.data
}

export const generateQuestion = async (
  interviewId: string,
  questionData: RequestQuestionBody
) => {
  const response = await apiClient.post<ApiResponse<QuestionListData>>(
    `/interview/${interviewId}/question`,
    questionData || { question: null, keywords: null } // 기본값은 메인 질문 생성
  )
  return response.data
}

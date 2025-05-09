import {
  generateQuestion,
  sendSelectedQuestion,
  updateInterviewStatus,
} from '@/api/interviewAPI'
import { useMutation } from '@tanstack/react-query'

export const useUpdateInterviewStatus = (options?: {
  onSuccess?: (data: ApiResponse<InterviewStatusData>) => void
  onError?: (error: unknown) => void
}) => {
  return useMutation({
    mutationFn: updateInterviewStatus,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  })
}

export const useGenerateQuestion = (options?: {
  onSuccess?: (data: ApiResponse<QuestionListData>) => void
  onError?: (error: unknown) => void
}) => {
  return useMutation({
    mutationFn: (params: {
      interviewId: string
      questionData?: RequestQuestionBody
    }) =>
      generateQuestion(
        params.interviewId,
        params.questionData || { question: null, keywords: null }
      ),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  })
}

export const useSelectedQuestion = (options?: {
  onSuccess?: (data: ApiResponse<null>) => void
  onError?: (error: unknown) => void
}) => {
  return useMutation({
    mutationFn: (params: { interviewId: string; selectedIdx: number }) =>
      sendSelectedQuestion(params.interviewId, params.selectedIdx),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  })
}

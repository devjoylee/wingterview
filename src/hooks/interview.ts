import { findOldInterview } from '@/api/interviewAiAPI'
import {
  generateQuestion,
  getInterviewStatus,
  sendSelectedQuestion,
  updateInterviewStatus,
} from '@/api/interviewAPI'
import { useMutation, useQuery } from '@tanstack/react-query'

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
  onMutate?: () => void
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
        params.questionData || { question: '', keywords: '' }
      ),
    onMutate: options?.onMutate,
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

export const useInterviewStatus = (interviewId: string) => {
  return useQuery<ApiResponse<InterviewData>>({
    queryKey: ['interviewStatus', interviewId],
    queryFn: getInterviewStatus,
  })
}

export const useOldInterviewId = (userId: string) => {
  return useQuery<string>({
    queryKey: ['interviewId', userId],
    queryFn: () => findOldInterview(userId),
  })
}

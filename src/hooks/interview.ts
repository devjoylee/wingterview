import { updateInterviewStatus } from '@/api/interviewAPI'
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

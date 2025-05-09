import apiClient from '@/api/apiClient'

export const updateInterviewStatus = async (interviewId: string) => {
  const response = await apiClient.put<ApiResponse<InterviewStatusData>>(
    `/interview/${interviewId}/status/next`
  )
  return response.data
}

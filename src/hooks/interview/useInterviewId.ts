import { getInterviewId } from '@/api/interviewAiAPI'
import { useQuery } from '@tanstack/react-query'

export const useInterviewId = (requestInterviewId: boolean) => {
  return useQuery({
    queryKey: ['interviewId'],
    queryFn: getInterviewId,
    enabled: requestInterviewId,
  })
}

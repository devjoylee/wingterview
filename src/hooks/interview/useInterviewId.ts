import { getInterviewId } from '@/api/interviewAiAPI'
import { useQuery } from '@tanstack/react-query'

export const useInterviewId = (interviewId: string) => {
  return useQuery({
    queryKey: ['interviewId'],
    queryFn: getInterviewId,
    enabled: !interviewId,
  })
}

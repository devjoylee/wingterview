import { getInterviewId } from '@/api/interviewAiAPI'
import { useQuery } from '@tanstack/react-query'

export const useInterviewId = () => {
  return useQuery({
    queryKey: ['interviewId'],
    queryFn: getInterviewId,
  })
}

import { useQuery } from '@tanstack/react-query'
import { getFeedback, getInterviewHistory } from '@/api/interviewHistoryAPI'

export const useInterviewHistory = (
  userId: string,
  limit: number,
  cursor?: string
) => {
  return useQuery<HistoryResponse>({
    queryKey: ['interview-history'],
    queryFn: () => getInterviewHistory(userId, limit, cursor),
  })
}

export const useFeedback = (userId: string, interviewId: string) => {
  return useQuery<FeedbackPageData>({
    queryKey: ['feedback'],
    queryFn: () => getFeedback(userId, interviewId),
  })
}

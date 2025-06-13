import { useQuery } from '@tanstack/react-query'
import { getInterviewHistory } from '@/api/interviewHistoryAPI'

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

import { getQuizHistory } from '@/api/quizAPI'
import { useQuery } from '@tanstack/react-query'

export const useQuizHistory = (
  userId: string,
  wrong: boolean,
  limit: number,
  cursor?: string
) => {
  return useQuery<QuizHistoryResponse>({
    queryKey: ['interview-history'],
    queryFn: () => getQuizHistory(userId, wrong, limit, cursor),
    enabled: !!userId,
  })
}

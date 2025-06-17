import { useQuery } from '@tanstack/react-query'
import { getQuizStatistic } from '@/api/quizAPI'

export const useQuizStatistic = (userId: string) => {
  return useQuery<number>({
    queryKey: ['quizStat'],
    queryFn: () => getQuizStatistic(userId),
    enabled: !!userId,
  })
}

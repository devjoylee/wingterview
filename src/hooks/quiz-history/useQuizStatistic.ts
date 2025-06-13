import { useQuery } from '@tanstack/react-query'
import { getQuizStatistic } from '@/api/quizAPI'

export const useQuizStatistic = (myId: string) => {
  return useQuery<number>({
    queryKey: ['quizStat'],
    queryFn: () => getQuizStatistic(myId),
    enabled: !!myId,
  })
}

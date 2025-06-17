import { getQuizHistory } from '@/api/quizAPI'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useQuizHistory = (
  userId: string,
  wrong: boolean,
  limit: number
) => {
  const { data, isLoading, ...rest } = useInfiniteQuery({
    queryKey: ['quizHistory', userId, wrong],

    queryFn: ({ pageParam }) => getQuizHistory(userId, wrong, limit, pageParam),

    initialPageParam: '',

    getNextPageParam: lastPage =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
  })

  const allQuizzes = data?.pages.flatMap(page => page.quizzes) || []

  return {
    quizzes: allQuizzes,
    isLoading,
    ...rest,
  }
}

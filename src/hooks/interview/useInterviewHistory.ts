import { useQuery } from '@tanstack/react-query'
import { getFeedback, getInterviewHistory } from '@/api/interviewHistoryAPI'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useInterviewHistory = (userId: string, limit: number = 10) => {
  const { data, isLoading, ...rest } = useInfiniteQuery({
    queryKey: ['interviewHistory', userId],

    queryFn: ({ pageParam }) => getInterviewHistory(userId, limit, pageParam),

    initialPageParam: '',

    getNextPageParam: lastPage =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
  })

  const allHistory = data?.pages.flatMap(page => page.history) || []

  return {
    history: allHistory,
    isLoading,
    ...rest,
  }
}

export const useFeedback = (userId: string, interviewId: string) => {
  return useQuery<FeedbackPageData>({
    queryKey: ['feedback', interviewId],
    queryFn: () => getFeedback(userId, interviewId),
    staleTime: 5 * 60 * 1000,
  })
}

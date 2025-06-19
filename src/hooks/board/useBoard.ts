import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { getBoardList, getBoardDetail } from '@/api/boardAPI'

export const useBoardList = (
  orderBy: string = 'latest',
  limit: number = 10,
  isLoggedIn: boolean
) => {
  const { data, isLoading, ...rest } = useInfiniteQuery({
    queryKey: ['boardList', orderBy],
    queryFn: ({ pageParam }) => getBoardList(orderBy, limit, pageParam),
    initialPageParam: '',
    getNextPageParam: lastPage =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    enabled: isLoggedIn,
  })

  const allPosts = data?.pages.flatMap(page => page.boardList) || []

  return {
    posts: allPosts,
    isLoading,
    ...rest,
  }
}

export const useBoardDetail = (boardId: string) => {
  return useQuery<BoardDetailData | null>({
    queryKey: ['boardDetail', boardId],
    queryFn: () => getBoardDetail(boardId),
    staleTime: 5 * 60 * 1000,
    enabled: !!boardId,
  })
}

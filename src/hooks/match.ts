import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  enqueueMatching,
  fetchApplicantCount,
  fetchMatchingResult,
} from '@/api/matchAPI'

export const useMatchStart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: enqueueMatching,
    onSuccess: () => {
      console.log('매칭 신청이 완료되었습니다! 🎉')
      queryClient.invalidateQueries({ queryKey: ['applicantCount'] })
      console.log('매칭이 완료되면 결과 페이지로 이동합니다')
    },
    onError: error => {
      console.error('매칭 신청 오류:', error)
    },
  })
}

export const useApplicantCount = () => {
  return useQuery<number>({
    queryKey: ['applicantCount'],
    queryFn: fetchApplicantCount,
    initialData: 0,
    staleTime: 5000,
    refetchInterval: 5000, // 5초마다 데이터 갱신
  })
}

export const useMatchResult = (isPolling: boolean) => {
  return useQuery({
    queryKey: ['matchingResult'],
    queryFn: fetchMatchingResult,
    refetchInterval: isPolling ? 3000 : false,
    staleTime: 0,
  })
}

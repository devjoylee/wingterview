import { useMutation, useQueryClient } from '@tanstack/react-query'
import { enqueueMatching } from '@/api/matchAPI'

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

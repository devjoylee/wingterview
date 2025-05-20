import { useMutation, useQuery } from '@tanstack/react-query'
import {
  enqueueMatching,
  fetchApplicantCount,
  fetchMatchingResult,
} from '@/api/matchAPI'

export const useMatchStart = (options?: {
  onMutate?: () => void
  onSuccess?: () => void
  onError?: (error: unknown) => void
}) => {
  return useMutation({
    mutationFn: enqueueMatching,
    onMutate: options?.onMutate,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  })
}

export const useApplicantCount = () => {
  return useQuery<number>({
    queryKey: ['applicantCount'],
    queryFn: fetchApplicantCount,
    staleTime: 3000,
    refetchInterval: 3000,
  })
}

export const useMatchResult = (
  options: {
    enablePolling?: boolean
    isInQueue?: boolean
  } = {}
) => {
  const { enablePolling, isInQueue } = options

  return useQuery({
    queryKey: ['matchingResult'],
    queryFn: fetchMatchingResult,
    refetchInterval: enablePolling ? 3000 : false,
    enabled: !!isInQueue,
    staleTime: 0,
  })
}

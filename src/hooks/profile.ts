import { submitUserProfile, fetchMyProfile } from '@/api/profileAPI'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useMyProfile = () => {
  return useQuery<UserData>({
    queryKey: ['myProfile'],
    queryFn: fetchMyProfile,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}

export const useSubmitProfile = (options?: {
  onSuccess?: (data: ApiResponse<null>) => void
  onError?: (error: unknown) => void
}) => {
  return useMutation({
    mutationFn: submitUserProfile,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  })
}

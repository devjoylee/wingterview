import { submitUserProfile, fetchMyProfile } from '@/api/profileAPI'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useMyProfile = () => {
  return useQuery<MyProfileData>({
    queryKey: ['myProfile'],
    queryFn: fetchMyProfile,
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

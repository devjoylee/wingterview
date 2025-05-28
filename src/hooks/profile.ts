import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchMyProfile, submitProfile } from '@/api/profileAPI'
import { useProfileStore } from '@/stores'
import { useImageUpload } from './presigned'

type ProfileAction = 'create' | 'get' | 'edit'

export const useProfile = (
  action: ProfileAction,
  options?: {
    onSuccess?: () => void
    onError?: (error: unknown) => void
  }
) => {
  const queryClient = useQueryClient()
  const { uploadImage } = useImageUpload()
  const { formData, imageFile } = useProfileStore()

  const profileQuery = useQuery<MyProfileData>({
    queryKey: ['userProfile'],
    queryFn: fetchMyProfile,
    enabled: action !== 'create',
  })

  const mutation = useMutation({
    mutationFn: async () => {
      console.log(imageFile, formData.profileImageName, '되나용')
      if (imageFile && formData.profileImageName) {
        await uploadImage(imageFile, formData.profileImageName)
      }

      if (action === 'create') {
        return await submitProfile(formData)
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })

      if (options?.onSuccess) {
        options.onSuccess()
      }
    },
    onError: options?.onError,
  })

  return {
    ...mutation,
    profileData: profileQuery.data,
    isLoading: profileQuery.isLoading,
  }
}

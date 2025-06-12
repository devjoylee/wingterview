import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchMyProfile, submitProfile } from '@/api/profileAPI'
import { useProfileStore } from '@/stores'
import { useImageUpload } from '../presigned'

type ProfileAction = 'create' | 'get' | 'edit'

export const useProfile = (action: ProfileAction, isLoggedIn?: boolean) => {
  const queryClient = useQueryClient()
  const { uploadImage } = useImageUpload()
  const { formData, imageFile } = useProfileStore()

  const query = useQuery<MyProfileData>({
    queryKey: ['userProfile'],
    queryFn: fetchMyProfile,
    enabled: action !== 'create' && isLoggedIn === true,
  })

  const mutation = useMutation({
    mutationFn: async () => {
      if (imageFile && formData.profileImageName) {
        await uploadImage(imageFile, formData.profileImageName)
      }

      if (action === 'create') {
        return await submitProfile(formData)
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
    },
  })

  return {
    ...mutation,
    myData: query.data,
    myId: query.data?.myId,
    isLoading: query.isLoading,
  }
}

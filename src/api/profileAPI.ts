import apiClient from '@/api/apiClient'

interface ApiResponse<T> {
  message: string
  data: T | null
}

export const submitUserProfile = async (profileData: UserProfile) => {
  try {
    const response = await apiClient.put<ApiResponse<null>>(
      '/user',
      profileData
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}

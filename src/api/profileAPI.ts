import apiClient from '@/api/apiClient'

export const submitUserProfile = async (profileData: ProfileFormData) => {
  try {
    const response = await apiClient.put<ApiResponse<null>>(
      '/user',
      profileData
    )
    return response.data
  } catch (error) {
    console.error('프로필 전송 에러:', error)
    throw error
  }
}

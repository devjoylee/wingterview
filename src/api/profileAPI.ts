import apiClient from '@/api/apiClient'
import { API } from './endpoints'

export const submitUserProfile = async (profileData: ProfileFormData) => {
  try {
    const response = await apiClient.put<ApiResponse<null>>(
      API.PROFILE.SUBMIT,
      profileData
    )
    console.log('🎉 프로필 전송 성공:', response.data)
    return response.data
  } catch (error) {
    console.error('프로필 전송 실패:', error)
    throw error
  }
}

export const fetchMyProfile = async () => {
  try {
    const response = await apiClient.get<ApiResponse<UserData>>(
      API.PROFILE.MY_PROFILE
    )
    console.log('🎉 사용자 정보 조회 성공:', response.data.data)
    return response.data.data
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error)
    throw error
  }
}

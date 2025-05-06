import apiClient from '@/api/apiClient'

export const fetchMyProfile = async () => {
  try {
    const response = await apiClient.get<ApiResponse<UserData>>('/user/me')
    console.error('🎉 사용자 정보 조회 성공:', response.data.data)
    return response.data.data
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error)
    throw error
  }
}

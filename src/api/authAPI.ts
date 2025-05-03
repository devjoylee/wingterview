import apiClient from '@/api/apiClient'

interface LoginData {
  accessToken: string
  isNewUser: boolean
}

export const kakaoLogin = async (authCode: string) => {
  try {
    const response = await apiClient.post<ApiResponse<LoginData>>(
      '/auth/oauth/kakao',
      {
        code: authCode,
      }
    )
    return response.data.data
  } catch (error) {
    console.error('카카오 로그인 에러:', error)
    throw error
  }
}

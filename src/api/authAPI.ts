import apiClient from './apiClient'
import { API } from './endpoints'

interface LoginData {
  accessToken: string
  isNewUser: boolean
}

export const kakaoLogin = async (authCode: string) => {
  try {
    const response = await apiClient.post<ApiResponse<LoginData>>(
      API.LOGIN.KAKAO,
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

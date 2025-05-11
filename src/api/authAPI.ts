import axios from 'axios'

interface LoginData {
  accessToken: string
  isNewUser: boolean
}

const API_URL = import.meta.env.VITE_API_URL || ''

export const kakaoLogin = async (authCode: string) => {
  try {
    const response = await axios.post<ApiResponse<LoginData>>(
      `${API_URL}/api/auth/oauth/kakao`,
      {
        code: authCode,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )
    return response.data.data
  } catch (error) {
    console.error('카카오 로그인 에러:', error)
    throw error
  }
}

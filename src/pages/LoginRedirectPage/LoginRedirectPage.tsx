import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export const LoginRedirectPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const authCode = new URLSearchParams(location.search).get('code')

        if (!authCode) {
          throw new Error('인가 코드를 찾을 수 없습니다.')
        }

        console.log('인가 코드 확인:', authCode)

        if (authCode) {
          localStorage.setItem('kakaoAuthCode', authCode)
          navigate('/', { replace: true })
        } else {
          navigate('/login', { replace: true })
        }
      } catch (err) {
        console.error('로그인 처리 중 오류 발생:', err)
      }
    }
    kakaoLogin()
  }, [navigate, location.search])

  return null
}

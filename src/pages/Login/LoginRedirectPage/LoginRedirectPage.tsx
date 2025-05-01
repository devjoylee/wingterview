import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
// import { kakaoLogin } from '@/api/authAPI'

import styles from './styles.module.scss'
import { LoadingIndicator } from '@/components/common'

export const LoginRedirectPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const setAuthCode = useAuthStore(state => state.setAuthCode)
  const setTokens = useAuthStore(state => state.setTokens)

  useEffect(() => {
    const handleKakaoLogin = async () => {
      try {
        const authCode = new URLSearchParams(location.search).get('code')

        if (!authCode) {
          throw new Error('인가 코드를 찾을 수 없습니다.')
        }

        console.log('인가 코드 : ', authCode)
        setAuthCode(authCode)

        // const { accessToken, refreshToken } = await kakaoLogin(authCode)
        // setTokens(accessToken, refreshToken)

        setInterval(() => {
          navigate('/', { replace: true })
        }, 2000)
      } catch (err) {
        console.error('로그인 처리 중 오류 발생:', err)
        navigate('/login', { replace: true })
      }
    }
    handleKakaoLogin()
  }, [navigate, location.search, setTokens, setAuthCode])

  return (
    <div className={styles.pageContainer}>
      <LoadingIndicator />
      <p>로그인 중...</p>
    </div>
  )
}

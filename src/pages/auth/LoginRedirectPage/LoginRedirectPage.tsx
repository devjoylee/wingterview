import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { kakaoLogin } from '@/api/authAPI'

import styles from './styles.module.scss'
import { LoadingIndicator } from '@/components/common'

export const LoginRedirectPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const setTokens = useAuthStore(state => state.setTokens)
  const setIsNewUser = useAuthStore(state => state.setIsNewUser)
  const isProcessing = useRef(false)

  useEffect(() => {
    const handleKakaoLogin = async () => {
      if (isProcessing.current) return // API 중복 호출 방지
      isProcessing.current = true

      try {
        const authCode = new URLSearchParams(location.search).get('code')

        console.log(authCode)

        if (!authCode) {
          throw new Error('인가 코드를 찾을 수 없습니다.')
        }

        const { accessToken, isNewUser } = await kakaoLogin(authCode)

        // const accessToken = 'temp-accessToken-dfioasdvnkcvl'
        // const isNewUser = true

        setTokens(accessToken)
        setIsNewUser(isNewUser)

        setTimeout(() => {
          if (isNewUser) {
            navigate('/profile-setup', { replace: true })
          } else {
            navigate('/', { replace: true })
          }
        }, 2000)
      } catch (err) {
        console.error('로그인 처리 중 오류 발생:', err)
        navigate('/login', { replace: true })
      }
    }
    handleKakaoLogin()
  }, [navigate, location.search, setTokens, setIsNewUser])

  return (
    <div className={styles.loginRedirectPage}>
      <LoadingIndicator text="로그인 중..." />
    </div>
  )
}

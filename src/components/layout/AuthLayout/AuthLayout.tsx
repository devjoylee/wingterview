import { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

export const AuthLayout: React.FC = () => {
  const { isLoggedIn, isNewUser, hasProfile } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (isNewUser && !hasProfile && location.pathname !== '/profile-setup') {
      navigate('/profile-setup', { replace: true })
      return
    }

    if (location.pathname === '/profile-setup' && (!isNewUser || hasProfile)) {
      navigate('/', { replace: true })
      return
    }

    // 로그인 후 로그인 페이지 접근 시
    if (isLoggedIn && location.pathname === '/login') {
      navigate('/', { replace: true })
      return
    }
  }, [isLoggedIn, isNewUser, hasProfile, navigate, location.pathname])

  return <Outlet />
}

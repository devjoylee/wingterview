import { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

export const ProtectedLayout: React.FC = () => {
  const { isLoggedIn, isNewUser, hasProfile } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true })
      return
    }

    if (isNewUser && !hasProfile) {
      navigate('/profile-setup', { replace: true })
      return
    }

    if (location.pathname === '/profile-setup' && (!isNewUser || hasProfile)) {
      navigate('/', { replace: true })
      return
    }
  }, [isLoggedIn, isNewUser, hasProfile, navigate, location.pathname])

  return <Outlet />
}

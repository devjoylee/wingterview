import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

export const ProtectedLayout: React.FC = () => {
  const { isLoggedIn, isNewUser, hasProfile } = useAuthStore()

  if (!isLoggedIn) return <Navigate to="/login" replace />

  if (isNewUser && !hasProfile) return <Navigate to="/profile-setup" replace />

  return <Outlet />
}

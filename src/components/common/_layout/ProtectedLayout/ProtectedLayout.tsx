import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

export const ProtectedLayout: React.FC = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)()
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
}

import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

export const ProtectedLayout: React.FC = () => {
  const isValidUser = useAuthStore(state => state.isValidUser)()
  return isValidUser ? <Outlet /> : <Navigate to="/login" replace />
}

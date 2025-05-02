import { RouteObject, Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { RootLayout } from '@/components/common'
import * as P from '@/pages'

const ProtectedRoute: React.FC = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)()
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: 'login', element: <P.LoginPage /> },
      { path: 'auth/kakao', element: <P.LoginRedirectPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <P.HomePage /> },
          { path: 'profile-setup', element: <P.ProfileSetupPage /> },
          //..
        ],
      },
    ],
  },
]

export default routes

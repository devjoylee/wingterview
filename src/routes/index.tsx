import { RouteObject, Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { RootLayout } from '@/components/common'
import { HomePage, LoginPage, LoginRedirectPage } from '@/pages'

const ProtectedRoute = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)()
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'auth/kakao', element: <LoginRedirectPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <HomePage /> },
          //..
        ],
      },
    ],
  },
]

export default routes

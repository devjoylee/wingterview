import { RouteObject } from 'react-router-dom'
import { RootLayout, ProtectedLayout, Page } from '@/components/common'
import * as P from '@/pages'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: 'login', element: <P.LoginPage /> },
      { path: 'auth/kakao', element: <P.LoginRedirectPage /> },

      {
        element: <ProtectedLayout />,
        children: [
          {
            element: <Page hasNavbar={true} />,
            children: [
              { index: true, element: <P.HomePage /> },
              { path: 'match/result', element: <P.MatchResultPage /> },
              { path: 'coming-soon', element: <P.ComingSoonPage /> },
            ],
          },

          {
            element: <Page hasNavbar={false} />,
            children: [
              { path: 'profile-setup', element: <P.ProfileSetupPage /> },
            ],
          },
        ],
      },
    ],
  },
]

export default routes

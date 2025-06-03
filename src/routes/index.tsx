import { RouteObject } from 'react-router-dom'
import {
  RootLayout,
  AuthLayout,
  ProtectedLayout,
  AIInterviewLayout,
  Page,
} from '@/components/layout'
import * as P from '@/pages'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // 로그인 & 프로필
      {
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <P.LoginPage /> },
          { path: 'auth/kakao', element: <P.LoginRedirectPage /> },
          { path: 'profile-setup', element: <P.ProfileSetupPage /> },
        ],
      },

      // 홈페이지 & 준비중
      {
        element: <Page hasNavbar={true} />,
        children: [
          { path: '', element: <P.HomePage /> },
          { path: 'coming-soon', element: <P.ComingSoonPage /> },
        ],
      },

      // AI 면접 페이지
      {
        path: 'interview-ai',
        element: <Page hasNavbar={true} />,
        children: [
          {
            element: <AIInterviewLayout />,
            children: [
              // Public
              { path: 'awaiting', element: <P.AwaitingPage /> },

              // Protected
              {
                element: <ProtectedLayout />,
                children: [
                  { path: 'question', element: <P.QuestionPage /> },
                  { path: 'end', element: <P.EndingPage /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]

export default routes

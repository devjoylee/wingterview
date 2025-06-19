import { RouteObject } from 'react-router-dom'
import * as L from '@/components/layout'
import * as P from '@/pages'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <L.RootLayout />,
    children: [
      // 로그인 & 프로필
      {
        element: <L.AuthLayout />,
        children: [
          { path: 'login', element: <P.LoginPage /> },
          { path: 'auth/kakao', element: <P.LoginRedirectPage /> },
          { path: 'profile-setup', element: <P.ProfileSetupPage /> },
        ],
      },

      // 홈페이지 & 준비중
      {
        element: <L.Page hasNavbar={true} />,
        children: [
          { path: '', element: <P.HomePage /> },
          { path: 'coming-soon', element: <P.ComingSoonPage /> },
        ],
      },

      // AI 면접 페이지
      {
        path: 'interview-ai',
        element: <L.Page hasNavbar={true} />,
        children: [
          {
            element: <L.AIInterviewLayout />,
            children: [
              // Public
              { path: 'awaiting', element: <P.AwaitingPage /> },

              // Protected
              {
                element: <L.ProtectedLayout />,
                children: [
                  { path: 'question', element: <P.QuestionPage /> },
                  { path: 'end', element: <P.EndingPage /> },
                ],
              },
            ],
          },
        ],
      },

      {
        path: 'quiz',
        element: <L.Page hasNavbar={true} />,
        children: [
          {
            element: <L.QuizLayout />,
            children: [
              // Public
              { path: 'awaiting', element: <P.QuizAwaitingPage /> },
              { path: 'progress', element: <P.QuizProgressPage /> },
              { path: 'result', element: <P.QuizResultPage /> },

              // Protected
              {
                element: <L.ProtectedLayout />,
                children: [],
              },
            ],
          },
        ],
      },

      {
        path: 'mypage',
        element: <L.Page hasNavbar={true} />,
        children: [
          // Public
          { index: true, element: <P.MyPage /> },

          // Protected
          {
            element: <L.ProtectedLayout />,
            children: [
              { path: 'edit', element: <P.MyProfileEditPage /> },
              { path: 'interview', element: <P.MyInterviewPage /> },
              {
                path: 'interview/:interviewId',
                element: <P.MyInterviewDetailPage />,
              },
              { path: 'quiz', element: <P.MyQuizPage /> },
            ],
          },
        ],
      },

      {
        path: 'board',
        element: <L.Page hasNavbar={true} />,
        children: [
          // Public
          { index: true, element: <P.BoardPage /> },

          // Protected
          {
            element: <L.ProtectedLayout />,
            children: [
              {
                path: ':boardId',
                element: <P.BoardDetailPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]

export default routes

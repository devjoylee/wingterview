import { RouteObject } from 'react-router-dom'
import {
  RootLayout,
  ProtectedLayout,
  Page,
  InterviewLayout,
} from '@/components/common'
import * as P from '@/pages'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: 'login', element: <P.LoginPage /> },
      { path: 'auth/kakao', element: <P.LoginRedirectPage /> },
      { path: 'profile-setup', element: <P.ProfileSetupPage /> },

      {
        element: <ProtectedLayout />,
        children: [
          {
            element: <Page hasNavbar={true} />,
            children: [
              { index: true, element: <P.MatchAwaitingPage /> },
              { path: 'match/result', element: <P.MatchResultPage /> },
              { path: 'coming-soon', element: <P.ComingSoonPage /> },

              {
                path: 'interview',
                element: <InterviewLayout />,
                children: [
                  { path: 'awaiting', element: <P.InterviewAwaitingPage /> },
                  {
                    path: 'question',
                    element: <P.InterviewQuestionPage />,
                  },
                  { path: 'answer', element: <P.InterviewAnswerPage /> },
                  { path: 'feedback', element: <P.InterviewFeedbackPage /> },
                ],
              },
            ],
          },

          // {
          //   element: <Page hasNavbar={false} />,
          //   children: [],
          // },
        ],
      },
    ],
  },
]

export default routes

import { NavigateFunction } from 'react-router-dom'

export const routeInterview = (
  navigate: NavigateFunction,
  status: InterviewStatusData
) => {
  const { currentRound, currentPhase } = status

  switch (currentPhase) {
    case 'PENDING':
      break
    case 'PROGRESS':
      navigate('/interview/question', {
        state: { round: currentRound, phase: currentPhase },
      })
      break
    case 'FEEDBACK':
      navigate('/interview/feedback', {
        state: { round: currentRound, phase: currentPhase },
      })
      break
    case 'COMPLETE':
      navigate('/interview/complete', {
        state: { round: currentRound, phase: currentPhase },
      })
      break
    default:
      navigate('/interview/question')
  }
}

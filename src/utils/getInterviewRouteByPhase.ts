export const getInterviewRouteByPhase = (
  phase: string,
  questionOption?: string[] | null,
  selectedQuestion?: string
): string => {
  const isFirstQuestion = !selectedQuestion && !questionOption

  switch (phase.toUpperCase()) {
    case 'PENDING':
      return '/interview/awaiting'
    case 'PROGRESS':
      if (isFirstQuestion) return '/interview/question'
      return questionOption ? '/interview/question' : '/interview/answer'
    case 'FEEDBACK':
      return '/interview/feedback'
    case 'COMPLETE':
      return '/interview/awaiting'
    default:
      return '/interview/awaiting'
  }
}

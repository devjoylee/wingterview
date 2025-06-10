export const getAIInterviewRouteByPhase = (phase: string): string => {
  switch (phase.toUpperCase()) {
    case 'PENDING':
      return '/interview-ai/awaiting'
    case 'PROGRESS':
      return '/interview-ai/question'
    case 'COMPLETE':
      return '/interview-ai/end'
    default:
      return '/interview-ai/awaiting'
  }
}

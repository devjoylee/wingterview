export const getInterviewRouteByPhase = (phase: string): string => {
  switch (phase.toUpperCase()) {
    case 'PENDING':
      return '/interview/awaiting'
    case 'PROGRESS':
      return '/interview/question'
    case 'FEEDBACK':
      return '/interview/feedback'
    case 'COMPLETE':
      return '/interview/awaiting'
    default:
      return '/interview/awaiting'
  }
}

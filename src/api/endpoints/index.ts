export const API = {
  LOGIN: {
    KAKAO: '/auth/oauth/kakao',
  },
  PROFILE: {
    SUBMIT: '/user',
    MY_PROFILE: '/user/me',
  },
  SEAT: {
    ALL: '/user/seats',
    EACH: (seatId: string) => `/user/seats/${seatId}`,
  },
  MATCH: {
    ENQUEUE: '/matching/enqueue',
    STAT: '/matching/statistics',
    RESULT: '/matching/result',
  },
  INTERVIEW: {
    STATUS: `/interview/status`,
    CHANGE_STATUS: (interviewId: string) =>
      `/interview/${interviewId}/status/next`,
    GET_QUESTIONS: (interviewId: string) =>
      `/interview/${interviewId}/question`,
    PICK_QUESTION: (interviewId: string) =>
      `/interview/${interviewId}/selection`,
  },
}

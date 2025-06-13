export const API = {
  LOGIN: {
    KAKAO: '/auth/oauth/kakao',
  },
  PROFILE: {
    SUBMIT: '/user',
    ME: '/user/me',
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
  QUIZ: {
    TODAY: (userId: string) => `/today-quiz/${userId}`,
    STAT: (userId: string) => `/user/${userId}/quiz-stats`,
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
  AI_INTERVIEW: {
    ID: '/interview/ai',
    OLD: (myId: string) => `/interview/${myId}`,
    TIME: (interviewId: string) => `/interview/ai/${interviewId}/time`,
    END: (interviewId: string) => `/interview/${interviewId}`,
    QUESTION: (interviewId: string) => `/interview/${interviewId}/question`,
    SAVE_RECODING: (filename?: string) =>
      `/s3/presigned-url/recording?filename=${filename}`,
    HISTORY: (userId: string, limit: number, cursor?: string) =>
      `/user/${userId}/interview?limit=${limit}${cursor ? `&cursor=${cursor}` : ''}`,
  },
  PRESIGNED_URL: (filename?: string) =>
    `/s3/presigned-url?filename=${filename}`,
}

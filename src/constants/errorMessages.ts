export const errorMessages: Record<string, string> = {
  // 400
  INVALID_INPUT: '유효하지 않은 입력',
  INVALID_TOKEN: '유효하지 않은 토큰',
  INVALID_USER: '매칭 큐에 진입하지 않은 사용자',
  INVALID_UUID: '잘못된 UUID 형식',

  // 404
  INTERVIEW_NOT_FOUND: '존재하지 않는 인터뷰',
  QUESTION_NOT_FOUND: '존재하지 않는 질문 목록',
  USER_NOT_FOUND: '유저가 존재하지 않음',

  // 409
  ALREADY_ENQUEUED: '이미 진입한 사용자',
  ALREADY_BLOCKED_SEAT: '이미 막힌 자리',

  // 410
  QUEUE_CLOSED: '이미 매칭 큐가 닫힘',
}

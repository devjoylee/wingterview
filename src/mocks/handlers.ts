import { API } from '@/api/endpoints'
import { http, HttpResponse } from 'msw'

export const handlers = [
  // 카카오 로그인
  http.post(API.LOGIN.KAKAO, () => {
    console.log('카카오 로그인 요청')
    return HttpResponse.json(
      {
        message: 'authorization_code_send_done',
        data: {
          accessToken: 'qoerigj240t124t0ij24',
          isNewUser: true,
        },
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }),

  // 회원 프로필 전송
  http.put(API.PROFILE.SUBMIT, async () => {
    return HttpResponse.json(
      {
        message: 'user_info_send_done',
        data: null,
      },
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  }),

  // 내 정보 조회
  http.get(API.PROFILE.MY_PROFILE, () => {
    return HttpResponse.json(
      {
        message: 'userinfo_fetch_done',
        data: {
          nickname: 'joy.lee',
          email: 'joylee.dev@gmail.com',
          name: '노데이터이주영',
          curriculum: '풀스택',
          seatCode: 'B-03-M',
          jobInterest: ['프론트엔드 개발자', '풀스택 개발자'],
          techStack: ['Javascript', 'React'],
          interviewCnt: 12,
          profileImageUrl: '',
        },
      },
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  }),

  // 자리 배치도 전체 조회
  http.get(API.SEAT.ALL, () => {
    return HttpResponse.json({
      message: 'seat_fetch_done',
      data: {
        seats: {
          A: [
            [false, false, false],
            [false, false, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
          ],
          B: [
            [true, true, true],
            [false, false, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
          ],
          C: [
            [true, true, true],
            [false, false, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
          ],
        },
        mySeatPosition: {
          section: 'B',
          seat: [1, 1],
        },
      },
    })
  }),

  // 임시 자리 막기
  http.put(API.SEAT.EACH(':seatId'), () => {
    return HttpResponse.json({
      message: 'seat_block_done',
      data: null,
    })
  }),

  // 자리 점유 여부 확인
  http.get(API.SEAT.EACH(':seatId'), () => {
    return HttpResponse.json({
      message: 'seat_status_check_done',
      data: {
        isSelected: false,
      },
    })
  }),

  // 매칭 큐 진입
  http.post(API.MATCH.ENQUEUE, () => {
    return HttpResponse.json({
      message: 'enqueue_done',
      data: null,
    })
  }),

  // 매칭 신청자 수 조회
  http.get(API.MATCH.STAT, () => {
    return HttpResponse.json({
      message: 'applicant_count_fetch_done',
      data: {
        count: 32,
      },
    })
  }),

  // 매칭 결과 조회
  http.get(API.MATCH.RESULT, () => {
    const isMatched = true

    if (isMatched)
      return HttpResponse.json(
        {
          message: 'matching_result_fetch_done',
          data: {
            isFirstInterviewer: false,
            isAiInterview: false,
            interviewer: {
              nickname: 'eunice.song',
              name: '송동은',
              curriculum: '인공지능',
              profileImageUrl: '',
              jobInterest: ['프론트엔드 개발자', '백엔드 개발자'],
              techStack: ['Java', 'Javascript'],
              seatCode: 'A-12-L',
            },
            interviewee: {
              nickname: 'joy.lee',
              name: '이주영',
              curriculum: '풀스택',
              profileImageUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzeiMOk4yAUOjDYIglZphMwDt3E1uO0a-2iw&s',
              jobInterest: ['프론트엔드 개발자', '백엔드 개발자'],
              techStack: ['Java', 'Javascript'],
            },
            interviewId: 'de305d54-75b4-431b-adb2-eb6b9e546014',
          },
        },
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
  }),

  // 면접 상태 업데이트
  http.put(API.INTERVIEW.CHANGE_STATUS(':interviewId'), () => {
    return HttpResponse.json({
      message: 'interview_phase_updated',
      data: {
        currentRound: 2,
        currentPhase: 'PENDING',
      },
    })
  }),

  // 질문 생성
  http.post(API.INTERVIEW.GET_QUESTIONS(':interviewId'), () => {
    return HttpResponse.json({
      message: 'question_fetch_done',
      data: {
        questions: [
          'Java의 버전별 차이를 설명하시오.',
          'Spring Boot와 Spring의 차이를 설명하시오.',
          'TCP와 UDP의 차이를 설명하시오.',
          'Transaction에 대해 설명하시오.',
        ],
      },
    })
  }),

  // 질문 선택
  http.post(API.INTERVIEW.PICK_QUESTION(':interviewId'), () => {
    return HttpResponse.json({
      message: 'question_selection_send_done',
      data: null,
    })
  }),

  // 현재 면접 정보 조회
  http.get(API.INTERVIEW.STATUS, () => {
    return HttpResponse.json({
      message: 'interview_phase_fetch_done',
      data: {
        interviewId: 'de305d54-75b4-431b-adb2-eb6b9e546014',
        timeRemain: 382,
        currentRound: 2,
        currentPhase: 'PENDING',
        isInterviewer: false,
        isAiInterview: false,
        partner: {
          nickname: 'joy.lee',
          name: '이주영',
          curriculum: '풀스택',
          profileImageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzeiMOk4yAUOjDYIglZphMwDt3E1uO0a-2iw&s',
          jobInterest: ['프론트엔드 개발자'],
          techStack: ['Typescript'],
        },
        questionIdx: 3,
        selectedQuestion: '스레드를 사용했을 때 장단점을 서술하시오.',
        questionOption: [
          '질문선택지1',
          '질문선택지2',
          '질문선택지3',
          '질문선택지4',
        ],
      },
    })
  }),
]

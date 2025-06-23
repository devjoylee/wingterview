import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Button,
  Modal,
  GuideBox,
  StaticTag,
  ProfileImage,
} from '@/components/ui'
import { CurrentRound } from '@/components/features'
import { useMatchStore, useInterviewStore, useTimerStore } from '@/stores'
import { useMatchResult } from '@/hooks/match'
import {
  useUpdateInterviewStatus,
  useGenerateQuestion,
  useInterviewStatus,
} from '@/hooks/interview'

import styles from './styles.module.scss'

/**
 *   면접 대기 페이지 flow
 *
 *   페이지 렌더링 시,
 *   1. 면접 현재 상태 API 요청 -> setInterviewData로 스토리지에 캐싱
 *   2. 면접자 데이터 캐싱 확인 (route, store), 없으면 matchResult에서 가져옴
 *      matchResult는 1라운드 기준이므로
 *      matchResult에서 '면접자'는 1/3 라운드 면접자로 설정 (OddInterviewee)
 *      matchResult에서 '면접관'은 2/4 라운드 면접자로 설정 (EvenInterviewee)
 *
 *      -> 해당 부분은 현재 상태 isInterviewer 조건으로 수정해야겠다.
 *         isInterviewer true, 면접자 데이터 = partner 데이터
 *         isInterviewer false, 면접자 데이터 = 내 정보 데이터 (useMyProfile)
 *
 *   면접 시작 버튼 클릭하면
 *   1. updateStatus : 상태 PENDING -> PROGRESS
 *   2. generateQuestions : 문제 생성 요청
 *      문제 생성 되면 문제 목록 questionOption store에 저장
 *   3. navigate('/interview/question')
 *   4. 타이머 시작 (3번과 동시에)
 */

export const InterviewAwaitingPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const intervieweeInRoute = location.state?.interviewee

  const [interviewee, setInterviewee] = useState<BaseProfile | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const { startTimer, resetTimer } = useTimerStore()
  const { getOddInterviewee, getEvenInterviewee } = useMatchStore()
  const { interviewId, isInterviewer, currentRound, setInterviewData } =
    useInterviewStore()

  const { data: matchResult } = useMatchResult({
    enablePolling: false,
    isInQueue: true,
  })
  const { data: currentStatus, refetch } = useInterviewStatus(interviewId)
  const { mutate: updateStatus } = useUpdateInterviewStatus({
    onSuccess: () => {
      generateQuestions({ interviewId })
    },
  })

  // START 버튼 눌렀을 때
  const { mutate: generateQuestions } = useGenerateQuestion({
    onMutate: () => setIsGenerating(true),

    onSuccess: async result => {
      if (interviewId) {
        const delay = new Promise(resolve => setTimeout(resolve, 1500))

        await delay // 로딩 모달 창을 위한 1.5초 지연

        if (result.data && result.data.questions) {
          setInterviewData({
            questionOption: result.data.questions,
            currentPhase: 'PROGRESS',
          })

          // 문제 생성 완료 시 질문 페이지로
          navigate('/interview/question', {
            state: {
              questions: result.data.questions,
            },
          })

          startTimer(20)
        }
      }
    },
  })

  const handleStartInterview = () => {
    if (!interviewId) return
    updateStatus(interviewId) // 면접 상태 PENDING -> PROGRESS
  }

  useEffect(() => {
    const getIntervieweeData = async () => {
      try {
        // 1. navigate state 데이터 확인
        if (intervieweeInRoute) {
          setInterviewee(intervieweeInRoute)
          return
        }

        // 2. store 데이터 확인
        const intervieweeInStore =
          currentRound % 2 === 1 ? getOddInterviewee() : getEvenInterviewee()

        if (intervieweeInStore) {
          setInterviewee(intervieweeInStore)
          return
        }

        // 3. 데이터(1,2) 없으면 API로 데이터 가져오기
        if (matchResult?.data) {
          const interviewee =
            currentRound % 2 === 1
              ? matchResult.data.interviewee
              : matchResult.data.interviewer
          setInterviewee(interviewee)
        }
      } catch (error) {
        console.error('면접자 정보 조회 중 오류:', error)
      }
    }

    getIntervieweeData()
  }, [
    intervieweeInRoute,
    currentRound,
    matchResult,
    getOddInterviewee,
    getEvenInterviewee,
  ])

  useEffect(() => {
    resetTimer()
    if (currentStatus) {
      setInterviewData(currentStatus.data)
    }
    refetch()
  }, [refetch, resetTimer, setInterviewData, currentStatus])

  return (
    <div className={styles.container}>
      <div className={styles.notice}>
        {isInterviewer ? (
          <GuideBox>
            <p>
              면접자가 면접관의 자리로 이동 중입니다.
              <br />
              면접자가 도착한 이후 면접을 시작해주세요.
            </p>
          </GuideBox>
        ) : (
          <GuideBox>
            <p>
              현재 라운드 종료 후 <br />
              <span>면접관이 피드백 작성을 모두 마치면</span> <br />
              아래 '역할 변경' 버튼을 눌러 주세요. <br />
            </p>
          </GuideBox>
        )}
      </div>

      <CurrentRound currentRound={currentRound} />

      {isInterviewer ? (
        <div className={styles.awaitingScreen}>
          <h2>
            면접을 시작하려면 <br />
            START 버튼을 눌러주세요.
          </h2>

          <div className={styles.buttonWrapper}>
            <button
              className={styles.startButton}
              onClick={handleStartInterview}
              disabled={!interviewId}
            >
              START
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.awaitingScreen}>
          <h2>
            면접이 곧 시작됩니다. <br />
            면접관의 지시를 따라주세요. <br />
          </h2>

          <button onClick={() => refetch()} className={styles.refetchButton}>
            현재 라운드 종료 후 <br />
            면접관으로 역할 변경 (임시)
          </button>
        </div>
      )}

      <div className={styles.intervieweeCard}>
        <h3>{currentRound} ROUND 면접자</h3>

        {interviewee && (
          <div className={styles.cardInfoWrapper}>
            <ProfileImage url={interviewee.profileImageUrl} size={80} />
            <ul className={styles.profileData}>
              <li
                className={styles.name}
              >{`${interviewee.nickname} (${interviewee.name}) / ${interviewee.curriculum}`}</li>
              <li className={styles.tagLine}>
                희망직무 :
                {interviewee.jobInterest.map((job, idx) => (
                  <StaticTag key={idx} label={job} />
                ))}
              </li>
              <li className={styles.tagLine}>
                기술스택 :
                {interviewee.techStack.map((tech, idx) => (
                  <StaticTag key={idx} label={tech} dark />
                ))}
              </li>
            </ul>
          </div>
        )}
      </div>

      <Modal
        isOpen={isGenerating}
        style="loading"
        message={['면접 질문을 생성하고 있습니다.', '잠시만 기다려주세요.']}
      />

      <Modal
        isOpen={!interviewee}
        style="failed"
        message={[
          '면접 상대가 정해지지 않았습니다.',
          '1:1 매칭을 먼저 진행해주세요.',
        ]}
      >
        <Button text="홈으로 이동" onClick={() => navigate('/')} />
      </Modal>
    </div>
  )
}

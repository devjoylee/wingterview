import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button, Modal, Notice, StaticTag } from '@/components/common'
import { CurrentRound } from '@/components/interview'
import { useMatchStore } from '@/stores/matchStore'
import { useMatchResult } from '@/hooks/match'
import {
  useUpdateInterviewStatus,
  useGenerateQuestion,
  useInterviewStatus,
} from '@/hooks/interview'

import defaultImage from '@assets/default-profile.png'
import { useInterviewStore } from '@/stores/interviewStore'
import { useTimerStore } from '@/stores/timerStore'
import styles from './styles.module.scss'

export const InterviewAwaitingPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const intervieweeInRoute = location.state?.interviewee
  const interviewId = localStorage.getItem('interviewId') as string

  const [interviewee, setInterviewee] = useState<BaseProfile | null>(null)

  const { startTimer, resetTimer } = useTimerStore()
  const { isInterviewer, currentRound, currentPhase, setInterviewData } =
    useInterviewStore()
  const { getOddInterviewee, getEvenInterviewee } = useMatchStore()

  const { data: matchResult } = useMatchResult(false)
  const { data: currentStatus, refetch } = useInterviewStatus(interviewId)
  const { mutate: updateStatus } = useUpdateInterviewStatus({})

  const isLastRoundDone = currentPhase === 'COMPLETE'

  const { mutate: generateQuestions, isSuccess: isGenerated } =
    useGenerateQuestion({
      onSuccess: result => {
        if (interviewId) {
          setTimeout(() => {
            setInterviewData({
              questionOption: result.data.questions,
              currentPhase: 'PROGRESS',
            })
            navigate('/interview/question', {
              state: {
                questions: result.data.questions,
              },
            })
          }, 1500)

          setTimeout(() => startTimer(), 500)
        }
      },
    })

  const handleStartInterview = () => {
    if (!interviewId) {
      console.log('면접자 데이터를 찾을 수 없습니다.')
      return
    }

    updateStatus(interviewId) // 면접 상태 PENDING -> PROGRESS
    generateQuestions({
      interviewId,
    })
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
          <Notice>
            <p>
              면접자가 면접관의 자리로 이동 중입니다.
              <br />
              면접자가 도착한 이후 면접을 시작해주세요.
            </p>
          </Notice>
        ) : (
          <Notice>
            <p>
              현재 라운드 종료 후 <br />
              <span>면접관이 피드백 작성을 모두 마치면</span> <br />
              아래 '역할 변경' 버튼을 눌러 주세요. <br />
            </p>
            <button onClick={() => refetch()} className={styles.refetchButton}>
              면접관으로 역할 변경 (임시)
            </button>
            <p>
              해당 버튼은 1차 MVP 기간에만 유효하며 <br />
              이후에는 자동으로 역할이 변경됩니다 <br />
            </p>
          </Notice>
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
        </div>
      )}

      <div className={styles.intervieweeCard}>
        <h3>{currentRound} ROUND 면접자</h3>

        {interviewee && (
          <div className={styles.cardInfoWrapper}>
            <img
              src={interviewee.profileImageUrl || defaultImage}
              alt="profile"
              className={styles.profileImage}
            />
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
        isOpen={isGenerated}
        closeOnBgClick={false}
        style="loading"
        message={['면접 질문을 생성하고 있습니다.', '잠시만 기다려주세요.']}
      />

      <Modal
        isOpen={!interviewee}
        closeOnBgClick={false}
        style="failed"
        message={[
          '면접 상대가 정해지지 않았습니다.',
          '1:1 매칭을 먼저 진행해주세요.',
        ]}
      >
        <Button text="홈으로 이동" onClick={() => navigate('/')} />
      </Modal>

      <Modal
        isOpen={isLastRoundDone}
        closeOnBgClick={false}
        style="congrats"
        message={['오늘의 면접이 모두 종료되었습니다', '수고하셨습니다.']}
      >
        <Button text="홈으로 이동" onClick={() => navigate('/')} />
      </Modal>
    </div>
  )
}

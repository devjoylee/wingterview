import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Modal, StaticTag } from '@/components/common'
import { useMatchStore } from '@/stores/matchStore'
import { useMatchResult } from '@/hooks/match'
import {
  useUpdateInterviewStatus,
  useGenerateQuestion,
} from '@/hooks/interview'

import defaultImage from '@assets/default-profile.png'
import styles from './styles.module.scss'
import { useInterviewStore } from '@/stores/interviewStore'

export const InterviewAwaitingPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const intervieweeInRoute = location.state?.interviewee
  const intervieweeInStore = useMatchStore(state => state.getInterviewee())
  const interviewId = localStorage.getItem('interviewId')

  const [interviewee, setInterviewee] = useState<BaseProfile | null>(null)

  // const requestFetch = !intervieweeInStore && !intervieweeInRoute

  const { resetHistory } = useInterviewStore()
  const { data: matchResult } = useMatchResult(false)

  const { mutate: updateStatus } = useUpdateInterviewStatus({})

  const { mutate: generateQuestions, isSuccess } = useGenerateQuestion({
    onSuccess: result => {
      if (interviewId) {
        updateStatus(interviewId) /// 문제 만들어지면 면접 상태 PENDING -> PROGRESS

        setTimeout(() => {
          navigate('/interview/question', {
            state: {
              questions: result.data.questions,
            },
          })
        }, 1500)
      }
    },
  })

  const handleStartInterview = () => {
    if (!interviewId) {
      console.log('면접자 데이터를 찾을 수 없습니다.')
      return
    }

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
        if (intervieweeInStore) {
          setInterviewee(intervieweeInStore)
          return
        }

        // 3. 데이터(1,2) 없으면 API로 데이터 가져오기
        if (matchResult) {
          setInterviewee(matchResult.data.interviewee)
        } else {
          // navigate('/')
        }
      } catch (error) {
        console.error('면접자 정보 조회 중 오류:', error)
      }
    }

    getIntervieweeData()
  }, [navigate, intervieweeInRoute, intervieweeInStore, matchResult])

  useEffect(() => {
    resetHistory()
  }, [resetHistory])

  return (
    <div className={styles.container}>
      <div className={styles.awaitingScreen}>
        <h2>
          면접을 시작하려면 <br />
          아래 버튼을 눌러주세요.
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

      <div className={styles.intervieweeCard}>
        <h3>오늘의 면접자</h3>

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
        isOpen={isSuccess}
        closeOnBgClick={false}
        style="loading"
        message={['면접 질문을 생성하고 있습니다.', '잠시만 기다려주세요.']}
      />
    </div>
  )
}

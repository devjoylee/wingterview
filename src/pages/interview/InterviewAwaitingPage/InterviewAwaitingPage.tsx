import { useEffect, useState } from 'react'
import { StaticTag } from '@/components/common'
import styles from './styles.module.scss'
import defaultImage from '@assets/default-profile.png'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMatchStore } from '@/stores/matchStore'
import { useMatchResult } from '@/hooks/match'

export const InterviewAwaitingPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const intervieweeInRoute = location.state?.interviewee
  const intervieweeInStore = useMatchStore(state => state.getInterviewee())

  const [interviewee, setInterviewee] = useState<BaseProfile | null>(null)
  const [interviewId, setInterviewId] = useState<string | null>(null)

  const requestFetch = !intervieweeInStore && !intervieweeInRoute

  const { data: matchResult } = useMatchResult(requestFetch)

  const handleStartInterview = () => {
    navigate('/interview/question')
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
    const storedId = localStorage.getItem('interviewId')
    if (storedId && !interviewId) {
      setInterviewId(storedId)
    }
  }, [interviewId])

  return (
    <div className={styles.container}>
      <div className={styles.awaitingScreen}>
        <h2>
          면접을 시작하려면 <br />
          아래 버튼을 눌러주세요.
        </h2>

        <button className={styles.startButton} onClick={handleStartInterview}>
          START
        </button>
      </div>

      <div className={styles.intervieweeCard}>
        <h3>오늘의 면접자</h3>

        {interviewee && (
          <div className={styles.cardInfoWrapper}>
            <img
              src={defaultImage}
              alt="profile"
              className={styles.profileImage}
            />
            <ul className={styles.profileData}>
              <li>이름 : {`${interviewee.nickname} (${interviewee.name})`}</li>
              <li>과정 : {interviewee.curriculum}</li>
              <li>
                희망직무 :
                {interviewee.jobInterest.map((job, idx) => (
                  <StaticTag key={idx} label={job} />
                ))}
              </li>
              <li>
                기술스택 :
                {interviewee.techStack.map((tech, idx) => (
                  <StaticTag key={idx} label={tech} dark />
                ))}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

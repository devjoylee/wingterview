import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MatchInfoCard } from '@/components/match'
import { Button, Logo } from '@/components/common'
import { useMatchStore } from '@/stores/matchStore'
import { useMatchResult } from '@/hooks/match'
import { SeatMap } from '@/components/seat'
import styles from './styles.module.scss'

export const MatchResultPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [result, setResult] = useState<MatchResultData | null>(null)
  const [showSeatMap, setShowSeatMap] = useState(false)

  const matchResultInRoute = location.state?.matchResult
  const myNickname = localStorage.getItem('nickname')
  const { matchResultInStore, setMatchResultInStore } = useMatchStore()

  const { data: matchResultFromApi } = useMatchResult({
    enablePolling: false,
    isInQueue: true,
  })

  const iamInterviewer = result?.isFirstInterviewer

  const goToInterview = () => {
    navigate('/interview/awaiting', {
      state: {
        interviewee: result?.interviewee,
      },
    })
  }

  const openSeatMap = () => setShowSeatMap(true)
  const closeSeatMap = () => setShowSeatMap(false)

  useEffect(() => {
    try {
      // 1. navigate state 데이터 확인
      if (matchResultInRoute) {
        setResult(matchResultInRoute)
        setMatchResultInStore(matchResultInRoute)
        return
      }

      // 2. store 데이터 확인
      if (matchResultInStore) {
        setResult(matchResultInStore)
        return
      }

      // 3. 데이터(1,2) 없으면 API로 데이터 가져오기
      if (matchResultFromApi?.data) {
        setResult(matchResultFromApi.data)
        setMatchResultInStore(matchResultFromApi.data)
        return
      }

      navigate('/') // 결과 데이터 없으면 redirect
    } catch (error) {
      console.error('매칭 결과 조회 중 오류:', error)
    }
  }, [
    navigate,
    matchResultInRoute,
    matchResultInStore,
    setMatchResultInStore,
    matchResultFromApi,
  ])

  return (
    <div className={styles.matchResultPage}>
      <div className={styles.pageHeader}>
        <Logo white />
        <h1>
          1:1 모의면접 매칭이
          <br />
          완료되었습니다!
        </h1>
      </div>

      <div className={styles.pageContent}>
        {result && (
          <MatchInfoCard
            interviewer={result.interviewer}
            interviewee={result.interviewee}
          />
        )}

        {iamInterviewer ? (
          <div className={styles.myCurrentRole}>
            <p className={styles.message}>
              {myNickname}님은 <span>1ROUND 면접관</span>입니다.
              <br />
            </p>
            <Button text="면접 대기실로 이동" onClick={goToInterview} />
          </div>
        ) : (
          <div className={styles.myCurrentRole}>
            <p className={styles.message}>
              {myNickname}님은 <span>1ROUND 면접자</span>입니다.
              <br />
              면접관의 자리로 이동해주세요.
            </p>
            <Button text="면접관 자리 보기" onClick={openSeatMap} />
          </div>
        )}
      </div>

      {showSeatMap && (
        <SeatMap
          closeSeatMap={closeSeatMap}
          isEditable={false}
          seatCode={result?.interviewer.seatCode}
        />
      )}
    </div>
  )
}

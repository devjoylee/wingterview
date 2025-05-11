import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import {
  Button,
  LoadingIndicator,
  Logo,
  ProfileCard,
} from '@/components/common'
import { useApplicantCount, useMatchResult, useMatchStart } from '@/hooks/match'
import { useMatchStore } from '@/stores/matchStore'

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const { data: applicantCount } = useApplicantCount()
  const { mutate: startMatching, isPending: isButtonClicked } = useMatchStart()
  const { setMatchResultInStore } = useMatchStore()

  const [isMatching, setIsMatching] = useState<boolean>(false)

  const { data: matchResult } = useMatchResult(isMatching)

  useEffect(() => {
    if (matchResult?.data) {
      setMatchResultInStore(matchResult.data)
      setIsMatching(false)
      navigate('/match/result', { state: { matchResult: matchResult.data } })
    }
  }, [matchResult, navigate, setMatchResultInStore])

  const handleMatchStart = useCallback(() => {
    if (isButtonClicked) {
      console.log('이미 매칭이 진행 중 입니다.')
      return
    }

    setIsMatching(true)
    setTimeout(() => {
      startMatching()
    }, 1500)
  }, [isButtonClicked, startMatching])

  return (
    <div className={styles.homePage}>
      <div className={styles.pageHeader}>
        <Logo width={60} color="light" />
        <h1>
          모의 면접 D-day,
          <br />
          오늘의 파트너는 누가 될까요?
        </h1>
      </div>

      <div className={styles.pageContent}>
        <ProfileCard />

        <div className={styles.matchingState}>
          {isMatching ? (
            <LoadingIndicator size={60} text="매칭 진행 중..." />
          ) : (
            <Button onClick={handleMatchStart} text="1:1 매칭 시작하기" />
          )}
        </div>

        <p className={styles.applicantCount}>
          현재 신청자 수 : {applicantCount}명
        </p>
      </div>
    </div>
  )
}

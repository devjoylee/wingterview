import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import {
  Button,
  LoadingIndicator,
  Logo,
  ProfileCard,
} from '@/components/common'
import { useApplicantCount, useMatchStart } from '@/hooks/match'
import { useMatchStore } from '@/stores/matchStore'
import { fetchMatchingResult } from '@/api/matchAPI'

export const HomePage: React.FC = () => {
  const { data: applicantCount } = useApplicantCount()
  const { mutate: mutateMatchStart, isPending } = useMatchStart()

  const [isMatching, setIsMatching] = useState<boolean>(false)

  // const { data: matchResult } = useMatchResult(isMatching)

  const { matchResult, setMatchResult } = useMatchStore()

  const navigate = useNavigate()

  const handleMatchStart = async () => {
    if (isPending) {
      console.log('이미 매칭이 진행 중 입니다.')
      return // 중복 요청 방지
    }

    mutateMatchStart()
    setIsMatching(true)

    const { data: matched } = await fetchMatchingResult()

    if (matched) {
      setMatchResult(matched)
      navigate('/match/result')
    }

    // setTimeout(() => {
    //   navigate('/match/result')
    // }, 3000)
  }

  useEffect(() => {
    if (matchResult) {
      navigate('/match/result')
    }
  }, [navigate, matchResult])

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

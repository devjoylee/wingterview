import styles from './styles.module.scss'
import {
  Button,
  LoadingIndicator,
  Logo,
  ProfileCard,
} from '@/components/common'
import { useMyProfile } from '@/hooks/useMyProfile'
import { useMatchStart } from '@/hooks/match'
import { useState } from 'react'

export const HomePage: React.FC = () => {
  const { data: myProfileData } = useMyProfile()
  const { mutate: mutateMatchStart, isPending } = useMatchStart()
  const [isMatching, setIsMatching] = useState<boolean>()

  const { interviewCnt } = myProfileData

  const handleMatchStart = () => {
    if (isPending) {
      console.log('이미 매칭이 진행 중 입니다.')
      return // 중복 요청 방지
    }
    mutateMatchStart()
    setIsMatching(true)
  }

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
        <ProfileCard userData={myProfileData} />

        <div className={styles.matchingState}>
          {isMatching ? (
            <LoadingIndicator size={60} text="매칭 진행 중..." />
          ) : (
            <Button onClick={handleMatchStart} text="1:1 매칭 시작하기" />
          )}
        </div>

        <p className={styles.applicantCount}>
          현재 신청자 수 : {interviewCnt}명
        </p>
      </div>
    </div>
  )
}

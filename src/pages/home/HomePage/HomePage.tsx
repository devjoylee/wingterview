import styles from './styles.module.scss'
import { Button, Logo, ProfileCard } from '@/components/common'
import { useMyProfile } from '@/hooks/useMyProfile'
import { useMatchStart } from '@/hooks/match'

export const HomePage: React.FC = () => {
  const { data: myProfileData } = useMyProfile()
  const { mutate: mutateMatchStart, isPending: isMatching } = useMatchStart()

  const { interviewCnt } = myProfileData

  const handleMatchStart = () => {
    if (isMatching) {
      console.log('이미 매칭이 진행 중 입니다.')
      return // 중복 요청 방지
    }
    mutateMatchStart()
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

        <Button
          onClick={handleMatchStart}
          disabled={isMatching}
          text="1:1 매칭 시작하기"
        />

        <p className={styles.applicantCount}>
          현재 신청자 수 : {interviewCnt}명
        </p>
      </div>
    </div>
  )
}

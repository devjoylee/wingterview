import styles from './styles.module.scss'
import { Logo, ProfileCard } from '@/components/common'
import { useMyProfile } from '@/hooks/useMyProfile'

export const HomePage: React.FC = () => {
  const { data: myProfileData } = useMyProfile()
  const { interviewCnt } = myProfileData

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

        <button className={styles.matchButton}>1:1 매칭 시작하기</button>
        <p className={styles.applicantCount}>
          현재 신청자 수 : {interviewCnt}명
        </p>
      </div>
    </div>
  )
}

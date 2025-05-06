import defaultImage from '@assets/default-profile.png'
import styles from './styles.module.scss'
import { Logo, StaticTag } from '@/components/common'
import { useMyProfile } from '@/hooks/useMyProfile'

export const HomePage: React.FC = () => {
  const { data: myProfileData } = useMyProfile()
  const { name, nickname, curriculum, jobInterest, techStack, interviewCnt } =
    myProfileData

  console.log(myProfileData)

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
        <div className={styles.profileCard}>
          <div className={styles.basicInfoWrapper}>
            <img src={defaultImage} alt="profile" />

            <div className={styles.basicInfo}>
              <h3 className={styles.name}>
                {nickname} ({name})
              </h3>
              <p className={styles.curriculum}>{curriculum}</p>
            </div>
          </div>

          <div className={styles.tagSection}>
            <h4 className={styles.title}>희망 직무</h4>
            <div className={styles.tagList}>
              {jobInterest.map((job, idx) => (
                <StaticTag key={idx} label={job} />
              ))}
            </div>
          </div>

          <div className={styles.tagSection}>
            <h4 className={styles.title}>기술 스택</h4>
            <div className={styles.tagList}>
              {techStack.map((tech, idx) => (
                <StaticTag key={idx} label={tech} dark />
              ))}
            </div>
          </div>
        </div>
        <button className={styles.matchButton}>1:1 매칭 시작하기</button>
        <p className={styles.applicantCount}>
          현재 신청자 수 : {interviewCnt}명
        </p>
      </div>
    </div>
  )
}

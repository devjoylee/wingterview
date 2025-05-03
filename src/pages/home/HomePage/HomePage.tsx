import { useState } from 'react'
import defaultImage from '@assets/default-profile.png'
import styles from './styles.module.scss'
import { Logo, StaticTag } from '@/components/common'

export const HomePage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserData>({
    nickname: 'joy.lee',
    name: '이주영',
    curriculum: '풀스택',
    seatCode: 'A-03-M',
    jobInterest: ['프론트엔드 개발자', '백엔드 개발자', '풀스택 개발자'],
    techStack: ['React', 'TypeScript', 'Python'],
    interviewCnt: 4,
    profileImage: undefined,
  })

  console.log(setUserInfo)

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
                {userInfo.nickname} ({userInfo.name})
              </h3>
              <p className={styles.curriculum}>{userInfo.curriculum}</p>
            </div>
          </div>

          <div className={styles.tagSection}>
            <h4 className={styles.title}>희망 직무</h4>
            <div className={styles.tagList}>
              {userInfo.jobInterest.map((job, idx) => (
                <StaticTag key={idx} label={job} />
              ))}
            </div>
          </div>

          <div className={styles.tagSection}>
            <h4 className={styles.title}>기술 스택</h4>
            <div className={styles.tagList}>
              {userInfo.techStack.map((tech, idx) => (
                <StaticTag key={idx} label={tech} dark />
              ))}
            </div>
          </div>
        </div>
        <button className={styles.matchButton}>1:1 매칭 시작하기</button>
        <p className={styles.applicantCount}>
          현재 신청자 수 : {userInfo.interviewCnt}명
        </p>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMyProfile } from '@/hooks/profile'
import { StaticTag } from '@/components/common'
import defaultImage from '@assets/default-profile.png'
import styles from './styles.module.scss'

export const ProfileCard: React.FC = () => {
  const location = useLocation()
  const { data: myData } = useMyProfile()
  const [profile, setMyProfile] = useState<UserData>()

  useEffect(() => {
    // 1. navigate state 데이터 확인
    if (location.state?.myProfile) {
      setMyProfile(location.state.myProfile)
      return
    }

    // 2. API 데이터 확인
    if (myData) {
      setMyProfile(myData)
      return
    }
  }, [location.state, myData])

  return (
    <div className={styles.profileCard}>
      <div className={styles.basicInfoWrapper}>
        <img src={defaultImage} alt="profile" />
        <div className={styles.basicInfo}>
          <h3 className={styles.name}>
            {profile?.nickname} ({profile?.name})
          </h3>
          <p className={styles.curriculum}>{profile?.curriculum}</p>
        </div>
      </div>

      <div className={styles.tagSection}>
        <h4 className={styles.title}>희망 직무</h4>
        <div className={styles.tagList}>
          {profile?.jobInterest.map((job, idx) => (
            <StaticTag key={idx} label={job} />
          ))}
        </div>
      </div>

      <div className={styles.tagSection}>
        <h4 className={styles.title}>기술 스택</h4>
        <div className={styles.tagList}>
          {profile?.techStack.map((tech, idx) => (
            <StaticTag key={idx} label={tech} dark />
          ))}
        </div>
      </div>
    </div>
  )
}

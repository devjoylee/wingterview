import defaultImage from '@assets/default-profile.png'
import styles from './styles.module.scss'
import { useMyProfile } from '@/hooks/profile'
import { StaticTag } from '@/components/common'
import { useEffect, useState } from 'react'

export const ProfileCard: React.FC = () => {
  const { data: myData } = useMyProfile()
  const [profile, setProfile] = useState<UserData>()

  useEffect(() => {
    if (myData) {
      setProfile(myData as UserData)
    } else {
      const temp = localStorage.getItem('myProfile')
      if (temp) {
        try {
          setProfile(JSON.parse(temp) as UserData)
        } catch (error) {
          console.error('프로필 정보 조회 실패:', error)
        }
      }
    }
  }, [myData])

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

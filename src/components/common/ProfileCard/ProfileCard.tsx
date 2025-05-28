import { ProfileImage, StaticTag } from '@/components/common'
import styles from './styles.module.scss'

interface ProfileCardProps {
  profile: MyProfileData
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className={styles.profileCard}>
      <div className={styles.basicInfoWrapper}>
        <ProfileImage url={profile.profileImageUrl} />
        <div className={styles.basicInfo}>
          <h3 className={styles.name}>
            {profile.nickname} ({profile.name})
          </h3>
          <p className={styles.curriculum}>{profile.curriculum}</p>
        </div>
      </div>

      <div className={styles.tagSection}>
        <h4 className={styles.title}>희망 직무</h4>
        <div className={styles.tagList}>
          {profile.jobInterest.map((job, idx) => (
            <StaticTag key={idx} label={job} />
          ))}
        </div>
      </div>

      <div className={styles.tagSection}>
        <h4 className={styles.title}>기술 스택</h4>
        <div className={styles.tagList}>
          {profile.techStack.map((tech, idx) => (
            <StaticTag key={idx} label={tech} dark />
          ))}
        </div>
      </div>
    </div>
  )
}


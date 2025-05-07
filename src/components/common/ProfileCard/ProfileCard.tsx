import defaultImage from '@assets/default-profile.png'
import styles from './styles.module.scss'
import { StaticTag } from '@/components/common'

interface ProfileCardProps {
  userData: BaseProfile
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  userData,
}: ProfileCardProps) => {
  const { name, nickname, curriculum, jobInterest, techStack } = userData

  return (
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
  )
}

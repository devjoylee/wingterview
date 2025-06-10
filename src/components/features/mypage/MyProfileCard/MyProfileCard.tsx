import { LoginButton, ProfileImage, StaticTag } from '@/components/ui'
import { MapPin } from 'lucide-react'
import styles from './styles.module.scss'

interface MyProfileCardProps {
  profile: MyProfileData | undefined
  isLoggedIn: boolean
}

export const MyProfileCard: React.FC<MyProfileCardProps> = ({
  profile,
  isLoggedIn,
}) => {
  return (
    <div className={styles.profileCard}>
      {isLoggedIn && profile && (
        <div className={styles.container}>
          <div className={styles.profileHeader}>
            <div className={styles.thumbnail}>
              <ProfileImage url={profile.profileImageUrl} />
            </div>

            <div className={styles.myInfo}>
              <h2 className={styles.name}>
                {profile.nickname} ({profile.name}) / {profile.curriculum}
              </h2>

              <div className={styles.seat}>
                <MapPin size={12} />
                <span>{profile.seatCode}</span>
              </div>
            </div>
          </div>

          <div className={styles.profileBody}>
            <div className={styles.section}>
              <h3 className={styles.title}>희망 직무</h3>
              <div className={styles.tagList}>
                {profile.jobInterest.map((job, index) => (
                  <StaticTag key={index} label={job} />
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.title}>기술 스택</h3>
              <div className={styles.tagList}>
                {profile.techStack.map((tech, index) => (
                  <StaticTag key={index} label={tech} dark />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <div className={styles.overlay}>
          <LoginButton />
        </div>
      )}
    </div>
  )
}

import { LoginButton, ProfileImage } from '@/components/ui'
import styles from './styles.module.scss'

interface ProfileCardProps {
  profile: MyProfileData | undefined
  isLoggedIn: boolean
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  isLoggedIn,
}) => {
  return (
    <div className={styles.profileCard}>
      {isLoggedIn && profile && (
        <div className={styles.container}>
          <ProfileImage url={profile.profileImageUrl} />
          <div className={styles.myProfileData}>
            <h3 className={styles.name}>
              {profile.nickname} ({profile.name})
            </h3>

            <div className={styles.stackRow}>
              <p className={styles.rowName}>희망 직무</p>
              <div className={styles.list}>
                {profile.jobInterest.map((job, idx) => (
                  <span key={idx}>{job}</span>
                ))}
              </div>
            </div>

            <div className={styles.stackRow}>
              <p className={styles.rowName}>기술 스택</p>
              <div className={styles.list}>
                {profile.techStack.map((tech, idx) => (
                  <span key={idx}>{tech}</span>
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

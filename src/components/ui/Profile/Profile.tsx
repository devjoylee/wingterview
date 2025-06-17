import { ProfileImage, StaticTag } from '@/components/ui'
import { FindSeatButton } from '@/components/features'
import ryanImage from '@assets/ryan.png'
import styles from './styles.module.scss'

interface ProfileProps {
  profileData: ProfileCardData
}

export const Profile: React.FC<ProfileProps> = ({ profileData }) => {
  const {
    profileImageUrl,
    name,
    nickname,
    curriculum,
    seatCode,
    isKTB,
    jobInterest,
    techStack,
  } = profileData

  return (
    <div className={styles.profile}>
      <div className={styles.profileHeader}>
        <div className={styles.thumbnail}>
          <ProfileImage url={profileImageUrl} size={73} />
        </div>

        <ul className={styles.myInfoList}>
          <li className={`${styles.item} ${styles.name}`}>
            {nickname} ({name})
          </li>

          {isKTB ? (
            <>
              <li className={`${styles.item} ${styles.status}`}>
                <span>카테부 {curriculum} 수강 중</span>
                <img src={ryanImage} alt="" className={styles.ryan} />
              </li>
              <li className={styles.item}>
                <FindSeatButton name="내 자리 보기" seatCode={seatCode} />
              </li>
            </>
          ) : (
            <li className={`${styles.item} ${styles.status}`}>
              <span>일반 회원</span>
            </li>
          )}
        </ul>
      </div>

      <div className={styles.profileBody}>
        <div className={styles.section}>
          <h3 className={styles.title}>희망 직무</h3>
          <div className={styles.tagList}>
            {jobInterest.map((job, index) => (
              <StaticTag key={index} label={job} />
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>기술 스택</h3>
          <div className={styles.tagList}>
            {techStack.map((tech, index) => (
              <StaticTag key={index} label={tech} dark />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

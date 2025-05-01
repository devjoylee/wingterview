import { ProfileSlider } from '@/components/profile'
import styles from './styles.module.scss'

export const ProfileSetupPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.guideText}>
        매칭에 필요한 <br />
        정보를 입력해주세요.
      </h2>
      <ProfileSlider />
    </div>
  )
}

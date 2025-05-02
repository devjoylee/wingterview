import { KakaoLoginButton } from '@/components/auth'
import styles from './styles.module.scss'
import introImage from '@assets/intro-image.png'

export const LoginPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.introContent}>
        <img src={introImage} alt="img" />
        <p className={styles.greeting}>
          모의 면접 상대를 찾고있나요? <br />
          윙터뷰에서 매주 새로운 파트너를 만나며 <br />
          실전 감각을 키워보세요.
        </p>
      </div>
      <KakaoLoginButton />
    </div>
  )
}

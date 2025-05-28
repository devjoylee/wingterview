import { KakaoLoginButton } from '@/components/auth'
import styles from './styles.module.scss'
import introImage from '@assets/intro-image.png'

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI

export const LoginPage: React.FC = () => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

  const handleLogin = () => {
    window.location.href = kakaoURL
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.introContent}>
        <img src={introImage} alt="img" />
        <p className={styles.greeting}>
          모의 면접 상대를 찾고있나요? <br />
          윙터뷰에서 매주 새로운 파트너를 만나며 <br />
          실전 감각을 키워보세요.
        </p>
      </div>
      <KakaoLoginButton login={handleLogin} />
    </div>
  )
}

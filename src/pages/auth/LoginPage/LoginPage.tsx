import { Logo } from '@/components/ui'
import { KakaoLoginButton } from '@/components/features'
import introImage from '@assets/intro-image.png'
import styles from './styles.module.scss'

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI

export const LoginPage: React.FC = () => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

  const handleLogin = () => {
    window.location.href = kakaoURL
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <Logo width={250} />
        <img src={introImage} alt="img" className={styles.introImage} />
        <p className={styles.greeting}>
          면접 상대가 없어 고민이신가요? <br />
          혼자 면접 준비하기 힘드신가요? <br />
          윙터뷰에서는 어렵지 않아요! <br />
        </p>
      </div>
      <KakaoLoginButton login={handleLogin} />
    </div>
  )
}

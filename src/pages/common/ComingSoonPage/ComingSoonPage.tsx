import { useNavigate } from 'react-router-dom'
import { Logo } from '@/components/common'
import styles from './styles.module.scss'

export const ComingSoonPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.comingSoonPage}>
      <div className={styles.noticeBox}>
        <Logo width={180} />
        <h1>
          페이지 <span>준비중</span>입니다.
        </h1>
        <button className={styles.homeButton} onClick={() => navigate('/')}>
          홈으로 이동
        </button>

        <div className={styles.qa}>
          <p>
            윙터뷰에게 문의 사항이나 QA 피드백이 있으시면 <br />
            아래 support 이메일로 문의하거나 <br />
            <a href="https://forms.gle/iNqmprYEPUDiS5ba8" target="_blank">
              구글 폼
            </a>
            을 제출해주세요!
          </p>
          <p> wingterview0@gmail.com</p>
          <p>감사합니다!</p>
        </div>
      </div>
    </div>
  )
}

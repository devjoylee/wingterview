import { useNavigate } from 'react-router-dom'
import wing from '@assets/wing.png'
import styles from './styles.module.scss'

export const ComingSoonPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.comingSoonPage}>
      <div className={styles.noticeBox}>
        <img src={wing} alt="" />
        <h1>
          페이지 <span>준비중</span>입니다.
        </h1>
        <button className={styles.homeButton} onClick={() => navigate('/')}>
          홈으로 이동
        </button>
      </div>
    </div>
  )
}

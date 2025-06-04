import { useNavigate } from 'react-router-dom'
import { Speech, Binary } from 'lucide-react'
import styles from './styles.module.scss'

export const FeatureSection: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.features}>
      <div
        className={styles.card}
        onClick={() => navigate('/interview-ai/awaiting')}
      >
        <div className={styles.icon}>
          <Speech size={32} />
        </div>
        <h3>AI 모의면접</h3>
        <p>
          실제 면접 질문으로 <br />
          AI와 모의 면접을 <br />
          진행해보세요.
        </p>
        <button>시작하기</button>
      </div>

      <div className={styles.card} onClick={() => navigate('/coming-soon')}>
        <div className={styles.icon}>
          <Binary size={32} />
        </div>
        <h3>윙퀴즈</h3>
        <p>
          면접에 자주 나오는 <br />
          CS 개념을 퀴즈를 통해
          <br />
          완벽 대비하세요
        </p>
        <button>시작하기</button>
      </div>
    </div>
  )
}

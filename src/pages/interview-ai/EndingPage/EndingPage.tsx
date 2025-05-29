import { useNavigate } from 'react-router-dom'
import mrWing from '@/assets/mrwing.png'
import styles from './styles.module.scss'

export const EndingPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.endingPage}>
      <div className={styles.textContainer}>
        <h2 className={styles.closingText}>
          면접이 종료되었습니다.
          <br />
          수고하셨습니다!
        </h2>

        <img src={mrWing} alt="mr wing" className={styles.mrwing} />

        <div className={styles.feedbackText}>
          <p>Mr.윙 피드백 작성 중...</p>
          <p>
            녹음된 답변을 분석하여 피드백을 작성 중 입니다.
            <br />
            {/* 완성된 피드백은 마이페이지 - 면접 히스토리에서 확인 가능합니다. */}
          </p>
        </div>

        <div className={styles.buttons}>
          <button>피드백 보러가기</button>
          <button onClick={() => navigate('/interview-ai/awaiting')}>
            면접 대기실로 이동
          </button>
        </div>
      </div>
    </div>
  )
}

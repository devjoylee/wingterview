import mrWing from '@/assets/mrwing-face.png'
import styles from './styles.module.scss'
import { Clock } from 'lucide-react'
import { dateFormatter, timeFormatter } from '@/utils'

interface Props {
  history: HistoryListData
  onClick: (hasFeedback: boolean, id: string) => void
}

export const InterviewHistoryCard: React.FC<Props> = ({ history, onClick }) => {
  const { id, createdAt, firstQuestion, questionCount, duration, hasFeedback } =
    history

  return (
    <div
      className={styles.historyCard}
      onClick={() => onClick(hasFeedback, id)}
    >
      <div className={styles.header}>
        <span className={styles.date}>{dateFormatter(createdAt)}</span>
        <span className={styles.duration}>
          <Clock />
          {timeFormatter(duration, 'kor')}
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.question}>
          Q. {firstQuestion} <span>외 {questionCount} 문제</span>
        </h3>
        <div
          className={`${styles.feedbackStatus} ${hasFeedback ? styles.received : styles.pending}`}
        >
          <div className={styles.bubble}>
            {hasFeedback ? <p>피드백 작성 완료</p> : <p>피드백 작성 중 ...</p>}
          </div>
          <img src={mrWing} alt="Mr.Wing" />
        </div>
      </div>
    </div>
  )
}

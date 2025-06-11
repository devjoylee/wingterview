import mrWing from '@/assets/mrwing-face.png'
import styles from './styles.module.scss'
import { Clock } from 'lucide-react'

interface Props {
  list: InterviewHistoryListData
}

export const InterviewHistoryCard: React.FC<Props> = ({ list }) => {
  const { createdAt, firstQuestion, questionCount, duration, hasFeedback } =
    list

  return (
    <div className={styles.historyCard}>
      <div className={styles.header}>
        <span className={styles.date}>{createdAt}</span>
        <span className={styles.duration}>
          <Clock />
          {duration}분
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

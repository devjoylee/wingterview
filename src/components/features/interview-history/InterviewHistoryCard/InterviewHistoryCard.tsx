import mrWing from '@/assets/mrwing-face.png'
import styles from './styles.module.scss'
import { Clock } from 'lucide-react'
import { dateFormatter, timeFormatter } from '@/utils'

interface Props {
  history: HistoryListData
  onClick: (id: HistoryListData) => void
}

export const InterviewHistoryCard: React.FC<Props> = ({ history, onClick }) => {
  const {
    createdAt,
    firstQuestion,
    questionCount,
    duration,
    hasFeedback,
    isFeedbackRequested,
  } = history

  return (
    <div className={styles.historyCard} onClick={() => onClick(history)}>
      <div className={styles.header}>
        <span className={styles.date}>{dateFormatter(createdAt)}</span>
        <span className={styles.duration}>
          <Clock />
          {timeFormatter(duration, 'kor')}
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.question}>
          Q. {firstQuestion}
          {questionCount > 1 && <span> 외 {questionCount - 1} 문제</span>}
        </h3>
        {isFeedbackRequested && (
          <div
            className={`${styles.feedbackStatus} ${hasFeedback ? styles.received : styles.pending}`}
          >
            <div className={styles.bubble}>
              {hasFeedback ? (
                <p>피드백 작성 완료</p>
              ) : (
                <p>피드백 작성 중 ...</p>
              )}
            </div>
            <img src={mrWing} alt="Mr.Wing" />
          </div>
        )}
      </div>
    </div>
  )
}

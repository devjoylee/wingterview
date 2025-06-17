import { timeFormatter } from '@/utils'
import { useAudioStore } from '@/stores'
import styles from './styles.module.scss'

interface Props {
  feedback: Feedback
  idx: number
}

export const FeedbackCard: React.FC<Props> = ({ feedback, idx }) => {
  const { question, modelAnswer, commentary, startAt, endAt } = feedback
  const { jumpTo } = useAudioStore()

  return (
    <div className={styles.feedbackCard}>
      {startAt && (
        <div className={styles.timestamp}>
          <span onClick={() => jumpTo(startAt)}>{timeFormatter(startAt)}</span>~
          <span onClick={() => jumpTo(endAt)}>{timeFormatter(endAt)}</span>
        </div>
      )}

      <h3 className={styles.question}>
        Q{idx + 1}. {question}
      </h3>

      <div className={styles.answer}>
        {modelAnswer && (
          <div className={styles.modelAnswer}>
            <h4>모범 답안</h4>
            <p>{modelAnswer}</p>
          </div>
        )}

        {commentary && (
          <div className={styles.feedback}>
            <h4>피드백</h4>
            <p>{commentary}</p>
          </div>
        )}
      </div>
    </div>
  )
}

import styles from './styles.module.scss'

interface Props {
  feedback: FeedbackData
  idx: number
}

export const FeedbackCard: React.FC<Props> = ({ feedback, idx }) => {
  const { question, modelAnswer, commentary } = feedback

  return (
    <div className={styles.feedbackCard}>
      <h3 className={styles.question}>
        Q{idx + 1}. {question}
      </h3>

      <div className={styles.answer}>
        <div className={styles.modelAnswer}>
          <h4>모범 답안</h4>
          <p>{modelAnswer}</p>
        </div>

        <div className={styles.feedback}>
          <h4>피드백</h4>
          <p>{commentary}</p>
        </div>
      </div>
    </div>
  )
}

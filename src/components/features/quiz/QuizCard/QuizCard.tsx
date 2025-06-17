import React from 'react'
import styles from './styles.module.scss'

interface Props {
  data: QuizCardData
  hasIndex?: boolean
}

export const QuizCard: React.FC<Props> = ({ data, hasIndex }) => {
  return (
    <div
      className={`${styles.quizCard} ${data.isCorrect ? styles.correct : styles.incorrect}`}
    >
      <h3 className={styles.question}>
        {hasIndex ? `Q${data.questionIdx}` : 'Q'}. {data.question}
      </h3>

      <div className={styles.answer}>
        {!data.isCorrect && (
          <p className={styles.userAnswer}>내 답안: {data.userAnswer}</p>
        )}
        <p className={styles.correctAnswer}>정답: {data.correctAnswer}</p>
        <span className={styles.commentary}>{data.commentary}</span>
      </div>
    </div>
  )
}

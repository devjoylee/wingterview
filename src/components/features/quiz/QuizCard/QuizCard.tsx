import React from 'react'
import { QuizData } from '@/types/quiz'
import styles from './styles.module.scss'

interface Props {
  quiz: QuizData
  userAnswer: number
  index?: number
}

export const QuizCard: React.FC<Props> = ({ quiz, userAnswer, index }) => {
  const { question, answerIdx, options, commentary } = quiz
  const isCorrect = userAnswer === answerIdx

  return (
    <div
      className={`${styles.quizCard} ${isCorrect ? styles.correct : styles.incorrect}`}
    >
      <h3 className={styles.question}>
        {index ? `Q${index + 1}` : 'Q'}. {question}
      </h3>

      <div className={styles.answer}>
        {!isCorrect && userAnswer !== -1 && (
          <p className={styles.userAnswer}>내 답안: {options[userAnswer]}</p>
        )}
        <p className={styles.correctAnswer}>정답: {options[answerIdx]}</p>
        <span className={styles.commentary}>{commentary}</span>
      </div>
    </div>
  )
}

import { useQuizStore } from '@/stores'
import styles from './styles.module.scss'
import { DUMMY_QUIZZES } from '@/constants/quizzes'

export const QuizResultPage = () => {
  const quizzes = DUMMY_QUIZZES

  const { userAnswers } = useQuizStore()
  const correctCount = userAnswers.filter(
    (ans, i) => ans === quizzes[i].answerIdx
  ).length
  const scorePercentage = Math.round((correctCount / quizzes.length) * 100)

  return (
    <div className={styles.resultPage}>
      <div className={styles.container}>
        <div className={styles.quizScore}>
          <div className={styles.stat}>
            정답률 <span>{scorePercentage}</span>%
          </div>
          <div className={styles.summary}>
            <div className={styles.correct}>
              <span>✓</span>
              <span>{correctCount} </span>
            </div>
            <div className={styles.incorrect}>
              <span>✕</span>
              <span>{quizzes.length - correctCount} </span>
            </div>
          </div>
        </div>

        <div className={styles.quizResult}>
          {quizzes.map((quiz, i) => {
            const isCorrect = userAnswers[i] === quiz.answerIdx
            return (
              <div
                key={i}
                className={`${styles.quizCard} ${isCorrect ? styles.correct : styles.incorrect}`}
              >
                <h3>
                  Q{i + 1}. {quiz.question}
                </h3>
                <p className={styles.correctAnswer}>
                  정답: {quiz.options[quiz.answerIdx]}
                </p>
                {!isCorrect && userAnswers[i] !== -1 && (
                  <p className={styles.userAnswer}>
                    내 답안: {quiz.options[userAnswers[i]]}
                  </p>
                )}
                <p className={styles.commentary}>{quiz.commentary}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

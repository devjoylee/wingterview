import { useNavigate } from 'react-router-dom'
import { useQuizStore } from '@/stores'
import { Button, CircleProgressBar } from '@/components/ui'
import { QuizCardList } from '@/components/features'
import { Check, X } from 'lucide-react'
import styles from './styles.module.scss'

export const QuizResultPage = () => {
  const navigate = useNavigate()
  const { quizzes, userAnswers, resetQuiz } = useQuizStore()
  const correctCount = userAnswers.filter(
    (ans, i) => ans + 1 === quizzes[i].answerIdx
  ).length

  const percentage = Math.round((correctCount / quizzes.length) * 100)

  const restart = () => {
    resetQuiz()
    navigate('/quiz/awaiting')
  }

  return (
    <div className={styles.resultPage}>
      <div className={styles.container}>
        <div className={styles.quizStatus}>
          <CircleProgressBar percentage={percentage} label="정답률" />

          <div className={styles.score}>
            <div className={styles.correct}>
              <span className={styles.icon}>
                <Check />
              </span>
              <span className={styles.num}>{correctCount}</span>
            </div>
            <div className={styles.incorrect}>
              <span className={styles.icon}>
                <X />
              </span>
              <span className={styles.num}>
                {quizzes.length - correctCount}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.quizResult}>
          <QuizCardList quizzes={quizzes} userAnswers={userAnswers} />
          <Button text="다시 풀기" color="black" onClick={restart} />
        </div>
      </div>
    </div>
  )
}

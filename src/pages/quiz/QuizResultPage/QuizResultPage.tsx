import { useQuizStore } from '@/stores'
import { CircleProgressBar } from '@/components/ui'
import { QuizCardList } from '@/components/features'
import { Check, X } from 'lucide-react'
import styles from './styles.module.scss'

export const QuizResultPage = () => {
  const { quizzes, userAnswers } = useQuizStore()

  const result: QuizCardData[] = quizzes.map((quiz, idx) => {
    const userAnswer = quiz.options[userAnswers[idx] - 1]
    const correctAnswer = quiz.options[quiz.answerIdx - 1]

    return {
      questionIdx: idx + 1,
      question: quiz.question,
      userAnswer: userAnswer,
      correctAnswer: correctAnswer,
      commentary: quiz.commentary,
      isCorrect: userAnswer === correctAnswer,
    }
  })

  const correctCount = result.filter(quiz => quiz.isCorrect).length

  const percentage = Math.round((correctCount / 10) * 100)

  // const restart = () => {
  //   resetQuiz()
  //   navigate('/quiz/awaiting')
  // }

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
          <QuizCardList quizzes={result} hasIndex />
          {/* <Button text="다시 풀기" color="black" onClick={restart} /> */}
        </div>
      </div>
    </div>
  )
}

import { useQuizStore } from '@/stores'
import styles from './styles.module.scss'
import { QuizLevel } from '../QuizLevel/QuizLevel'

interface Props {
  quiz: QuizData
}

export const QuizWithChoices: React.FC<Props> = ({ quiz }) => {
  const { currentIndex, userAnswers, setUserAnswer } = useQuizStore()

  const selected = userAnswers[currentIndex] - 1
  const quizIndex = currentIndex + 1

  const handleSelect = (index: number) => {
    setUserAnswer(currentIndex, index)
  }

  return (
    <div className={styles.container}>
      <div className={styles.quizHeader}>
        <span className={styles.quizIndex}>
          문제 <b>{quizIndex}</b> / 10
        </span>
        {quiz.difficulty ? <QuizLevel level={quiz.difficulty} /> : ''}
      </div>

      <h2 className={styles.question}>{quiz.question}</h2>

      <div className={styles.options}>
        {quiz.options.map((option, index) => (
          <button
            key={index}
            className={`${styles.option} ${
              selected === index ? styles.selected : ''
            }`}
            onClick={() => handleSelect(index + 1)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

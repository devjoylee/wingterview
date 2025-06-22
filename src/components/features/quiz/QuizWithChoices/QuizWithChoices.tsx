import { useQuizStore } from '@/stores'
import styles from './styles.module.scss'

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
      <h3 className={styles.number}>{quizIndex}</h3>
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

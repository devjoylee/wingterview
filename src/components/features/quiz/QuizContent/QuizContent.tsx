import styles from './styles.module.scss'

interface QuizContentProps {
  quiz: QuizData
  selectedAnswer: number
  onSelect: (index: number) => void
  number: string
}

export const QuizContent: React.FC<QuizContentProps> = ({
  quiz,
  selectedAnswer,
  onSelect,
  number,
}) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.number}>{number}</h3>
      <h2 className={styles.question}>{quiz.question}</h2>

      <div className={styles.options}>
        {quiz.options.map((option, index) => (
          <button
            key={index}
            className={`${styles.option} ${
              selectedAnswer === index ? styles.selected : ''
            }`}
            onClick={() => onSelect(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

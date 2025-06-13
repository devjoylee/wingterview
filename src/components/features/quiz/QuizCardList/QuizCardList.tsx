import { QuizCard } from '@/components/features'
import styles from './styles.module.scss'

export const QuizCardList: React.FC<{
  quizzes: QuizCardData[]
  hasIndex?: boolean
}> = ({ quizzes, hasIndex }) => {
  return (
    <div className={styles.quizList}>
      {quizzes.map((quiz, index) => (
        <QuizCard key={index} data={quiz} hasIndex={hasIndex} />
      ))}
    </div>
  )
}

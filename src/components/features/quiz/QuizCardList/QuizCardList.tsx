import { QuizData } from '@/types/quiz'
import { QuizCard } from '@/components/features'
import styles from './styles.module.scss'

interface Props {
  quizzes: QuizData[]
  userAnswers: number[]
}

export const QuizCardList: React.FC<Props> = ({ quizzes, userAnswers }) => {
  return (
    <div className={styles.quizList}>
      {quizzes.map((quiz, index) => (
        <QuizCard key={index} quiz={quiz} userAnswer={userAnswers[index]} />
      ))}
    </div>
  )
}

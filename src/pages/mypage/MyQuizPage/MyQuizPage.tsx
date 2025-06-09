import { SubPageHeader } from '@/components/ui'
import styles from './styles.module.scss'
import { CircleProgressBar } from '@/components/ui'
import { QuizFilterButton } from '@/components/features'

export const MyQuizPage: React.FC = () => {
  return (
    <div className={styles.myQuizPage}>
      <SubPageHeader name="나의 퀴즈 복습하기" backTo="/mypage" />

      <div className={styles.container}>
        <div className={styles.quizStatus}>
          <CircleProgressBar percentage={77.7} label="전체 정답률" />
          <QuizFilterButton />
        </div>

        <div className={styles.quizList}></div>
      </div>
    </div>
  )
}

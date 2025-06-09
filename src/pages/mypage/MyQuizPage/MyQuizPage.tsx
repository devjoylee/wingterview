import { EmptyPlaceholder, SubPageHeader } from '@/components/ui'
import styles from './styles.module.scss'
import { CircleProgressBar } from '@/components/ui'
import { QuizFilterButton } from '@/components/features'
import { QuizData } from '@/types/quiz'

export const MyQuizPage: React.FC = () => {
  const quizzes: QuizData[] = []

  return (
    <div className={styles.myQuizPage}>
      <SubPageHeader name="나의 퀴즈 복습하기" backTo="/mypage" />

      <div className={styles.container}>
        <div className={styles.quizStatus}>
          <CircleProgressBar percentage={77.7} label="전체 정답률" />
          <QuizFilterButton />
        </div>

        {quizzes.length ? (
          <div className={styles.quizList}></div>
        ) : (
          <EmptyPlaceholder
            type="sad"
            text={['완료된 퀴즈가 없습니다.', '윙퀴즈를 진행해주세요!']}
          />
        )}
      </div>
    </div>
  )
}

import { EmptyPlaceholder, SubPageHeader } from '@/components/ui'
import styles from './styles.module.scss'
import { CircleProgressBar } from '@/components/ui'
import { QuizCardList, QuizFilterButton } from '@/components/features'
import { useQuizStore } from '@/stores'

export const MyQuizPage: React.FC = () => {
  const { quizzes, userAnswers } = useQuizStore()

  return (
    <div className={styles.myQuizPage}>
      <SubPageHeader name="나의 퀴즈 복습하기" backTo="/mypage" />

      <div className={styles.container}>
        <div className={styles.quizStatus}>
          <CircleProgressBar percentage={77.7} label="전체 정답률" />
          <QuizFilterButton />
        </div>

        <div className={styles.quizListContainer}>
          {quizzes.length ? (
            <QuizCardList quizzes={quizzes} userAnswers={userAnswers} />
          ) : (
            <EmptyPlaceholder
              type="sad"
              text={['완료된 퀴즈가 없습니다.', '윙퀴즈를 진행해주세요!']}
            />
          )}
        </div>
      </div>
    </div>
  )
}

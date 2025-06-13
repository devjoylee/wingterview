import { EmptyPlaceholder, SubPageHeader } from '@/components/ui'
import styles from './styles.module.scss'
import { CircleProgressBar } from '@/components/ui'
import { QuizCardList, QuizFilterButton } from '@/components/features'
import { useQuizHistory, useQuizStatistic } from '@/hooks'
import { useState } from 'react'
import { useAuthStore } from '@/stores'

export const MyQuizPage: React.FC = () => {
  const [isFiltered, setIsFiltered] = useState(false)

  const userId = useAuthStore(state => state.userId)
  const { data: percentage } = useQuizStatistic(userId)
  const { data: quizData } = useQuizHistory(userId, isFiltered, 10)

  return (
    <div className={styles.myQuizPage}>
      <SubPageHeader name="나의 퀴즈 복습하기" backTo="/mypage" />

      <div className={styles.container}>
        <div className={styles.quizStatus}>
          <CircleProgressBar percentage={percentage || 0} label="전체 정답률" />
          <QuizFilterButton
            isFiltered={isFiltered}
            setIsFiltered={setIsFiltered}
          />
        </div>

        <div className={styles.quizListContainer}>
          {quizData?.quizzes ? (
            <QuizCardList quizzes={quizData?.quizzes} />
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

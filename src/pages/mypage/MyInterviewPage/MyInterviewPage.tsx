import { EmptyPlaceholder, SubPageHeader } from '@/components/ui'
import { InterviewHistoryList } from '@/components/features'
import { DUMMY_HISTORY_LIST } from '@/constants/history'
import styles from './styles.module.scss'

export const MyInterviewPage: React.FC = () => {
  const history = DUMMY_HISTORY_LIST

  return (
    <div className={styles.myInterviewPage}>
      <SubPageHeader name="나의 면접 회고하기" backTo="/mypage" />
      <div className={styles.container}>
        <h2 className={styles.title}>Interview History</h2>

        <div className={styles.quizListContainer}>
          {history.length ? (
            <InterviewHistoryList history={history} />
          ) : (
            <EmptyPlaceholder
              type="sad"
              text={[
                '저장된 면접이 없습니다.',
                '모의 면접을 먼저 진행해주세요!',
              ]}
            />
          )}
        </div>
      </div>
    </div>
  )
}

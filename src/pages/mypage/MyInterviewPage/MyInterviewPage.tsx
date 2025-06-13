import { EmptyPlaceholder, SubPageHeader } from '@/components/ui'
import { InterviewHistoryList } from '@/components/features'
import styles from './styles.module.scss'
import { useInterviewHistory } from '@/hooks/interview/useInterviewHistory'
import { useProfile } from '@/hooks'

export const MyInterviewPage: React.FC = () => {
  const { myId } = useProfile('get')

  const { data } = useInterviewHistory(myId as string, 10)

  return (
    <div className={styles.myInterviewPage}>
      <SubPageHeader name="나의 면접 회고하기" backTo="/mypage" />
      <div className={styles.container}>
        <h2 className={styles.title}>Interview History</h2>

        <div className={styles.quizListContainer}>
          {data?.history ? (
            <InterviewHistoryList history={data.history} />
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

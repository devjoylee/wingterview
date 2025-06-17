import { EmptyPlaceholder, SubPageHeader } from '@/components/ui'
import { AudioPlayer, FeedbackList } from '@/components/features'
import styles from './styles.module.scss'
import { dateFormatter, timeFormatter } from '@/utils'
import { useParams } from 'react-router-dom'
import { useFeedback } from '@/hooks'
import { useAuthStore } from '@/stores'

export const MyInterviewDetailPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>()
  const userId = useAuthStore(state => state.userId)

  const { data: interview } = useFeedback(userId, interviewId || '')

  return (
    <div className={styles.interviewDetailPage}>
      <SubPageHeader name="면접 결과 확인" backTo="/mypage/interview" />

      <div className={styles.container}>
        <div className={styles.title}>
          <h1>인터뷰 상세 기록</h1>
          <div className={styles.meta}>
            <p>
              날짜:
              {dateFormatter(interview?.createdAt || '')}
            </p>
            <p>면접 시간: {timeFormatter(interview?.duration || 0, 'kor')}</p>
          </div>
        </div>

        {interview?.recordingUrl && (
          <AudioPlayer audioURL={interview.recordingUrl} />
        )}

        {interview?.feedback.length ? (
          <FeedbackList list={interview.feedback} />
        ) : (
          <EmptyPlaceholder
            text={['면접 기록을 찾을 수 없습니다']}
            type="sad"
          />
        )}
      </div>
    </div>
  )
}

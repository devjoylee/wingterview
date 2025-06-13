import { SubPageHeader } from '@/components/ui'
import { AudioPlayer, FeedbackList } from '@/components/features'
import styles from './styles.module.scss'
import { dateFormatter } from '@/utils'
import { useParams } from 'react-router-dom'
import { useFeedback } from '@/hooks'
import { useAuthStore } from '@/stores'

export const MyInterviewDetailPage = () => {
  const { id: interviewId } = useParams<{ id: string }>()
  const userId = useAuthStore(state => state.userId)

  const { data: interview } = useFeedback(userId || '', interviewId || '')

  return (
    <div className={styles.interviewDetailPage}>
      <SubPageHeader name="면접 결과 확인" backTo="/mypage/interview" />

      {interview && (
        <div className={styles.container}>
          <div className={styles.title}>
            <h1>인터뷰 상세 기록</h1>
            <div className={styles.meta}>
              <p>날짜: {dateFormatter(interview.createdAt)}</p>
              <p>면접 시간: {interview.duration}분</p>
            </div>
          </div>

          <AudioPlayer audioURL={interview.recordingUrl} />

          <FeedbackList list={interview.feedback} />
        </div>
      )}
    </div>
  )
}

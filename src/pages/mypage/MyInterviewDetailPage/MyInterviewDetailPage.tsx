import { SubPageHeader } from '@/components/ui'
import { AudioPlayer, FeedbackList } from '@/components/features'
import styles from './styles.module.scss'
import { dateFormatter } from '@/utils'
import { useParams } from 'react-router-dom'
import { useProfile, useFeedback } from '@/hooks'

export const MyInterviewDetailPage = () => {
  const { id: interviewId } = useParams<{ id: string }>()
  const { myId } = useProfile('get')

  const { data: interview } = useFeedback(myId || '', interviewId || '')

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

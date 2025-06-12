import { SubPageHeader } from '@/components/ui'
import { DUMMY_HISTORY_DETAIL } from '@/constants/history'
import { AudioPlayer, FeedbackList } from '@/components/features'
import styles from './styles.module.scss'

export const MyInterviewDetailPage = () => {
  const interview = DUMMY_HISTORY_DETAIL

  return (
    <div className={styles.interviewDetailPage}>
      <SubPageHeader name="면접 결과 확인" backTo="/mypage/interview" />

      <div className={styles.container}>
        <div className={styles.title}>
          <h1>인터뷰 상세 기록</h1>
          <div className={styles.meta}>
            <p>날짜: {interview.createdAt}</p>
            <p>면접 시간: {interview.duration}분</p>
          </div>
        </div>

        <AudioPlayer audioURL={interview.recordingUrl} />

        <FeedbackList list={interview.feedback} />
      </div>
    </div>
  )
}

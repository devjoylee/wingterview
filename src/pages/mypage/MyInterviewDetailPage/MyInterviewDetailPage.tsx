import { SubPageHeader } from '@/components/ui'
import styles from './styles.module.scss'
import { DUMMY_HISTORY_DETAIL } from '@/constants/history'
import { FeedbackList } from '@/components/features'

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

        <div className={styles.recording}>
          <audio controls className={styles.audioPlayer}>
            <source src={interview.recordingUrl} type="audio/webm" />
          </audio>
        </div>

        <div className={styles.questions}>
          <FeedbackList list={interview.feedback} />
        </div>
      </div>
    </div>
  )
}

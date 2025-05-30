import { useNavigate } from 'react-router-dom'
import mrWing from '@/assets/mrwing.png'
import styles from './styles.module.scss'
import { updateInterviewStatus } from '@/api/interviewAPI'
import { useAIInterviewStore, useRecordingStore } from '@/stores'

export const EndingPage: React.FC = () => {
  const navigate = useNavigate()
  const interviewId = useAIInterviewStore(state => state.interviewId)
  const recordedBlob = useRecordingStore(state => state.recordedBlob)

  const returnToAwaitingPage = async () => {
    await updateInterviewStatus(interviewId)
    navigate('/interview-ai/awaiting')
  }

  const download = () => {
    if (recordedBlob && recordedBlob.size > 0) {
      const url = URL.createObjectURL(recordedBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `interview-${interviewId}.webm`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } else {
      console.warn('다운로드할 녹음 파일이 없습니다.')
    }
  }

  return (
    <div className={styles.endingPage}>
      <div className={styles.container}>
        <h2 className={styles.closingText}>
          면접이 종료되었습니다.
          <br />
          수고하셨습니다!
        </h2>

        <img src={mrWing} alt="mr wing" className={styles.mrwing} />

        <div className={styles.feedbackText}>
          <p>Mr.윙 피드백 작성 중...</p>
          <p>
            녹음된 답변을 분석하여 피드백을 작성 중 입니다.
            <br />
            {/* 완성된 피드백은 마이페이지 - 면접 히스토리에서 확인 가능합니다. */}
          </p>
        </div>

        <div className={styles.buttons}>
          <button>피드백 보러가기</button>
          <button onClick={returnToAwaitingPage}>면접 대기실로 이동</button>
        </div>
        <button onClick={download} className={styles.download}>
          녹음 파일 다운로드
        </button>
      </div>
    </div>
  )
}

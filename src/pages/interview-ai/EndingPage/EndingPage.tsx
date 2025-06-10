import { useNavigate } from 'react-router-dom'
import mrWing from '@/assets/mrwing.png'
import styles from './styles.module.scss'
import { useRecordingStore } from '@/stores'
import { useEffect } from 'react'

export const EndingPage: React.FC = () => {
  const navigate = useNavigate()
  const recordedBlob = useRecordingStore(state => state.recordedBlob)

  const download = () => {
    if (recordedBlob && recordedBlob.size > 0) {
      const url = URL.createObjectURL(recordedBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'wingterview-recording.webm'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } else {
      console.warn('다운로드할 녹음 파일이 없습니다.')
    }
  }

  // 새로고침 후 접근 시
  useEffect(() => {
    if (!recordedBlob) {
      navigate('/interview-ai/awaiting')
    }
  }, [recordedBlob, navigate])

  return (
    <div className={styles.endingPage}>
      <div className={styles.container}>
        <h2 className={styles.closingText}>
          면접이 종료되었습니다.
          <br />
          수고하셨습니다!
        </h2>

        <img src={mrWing} alt="mr wing" className={styles.mrwing} />

        <div className={styles.helperText}>
          <h3>Mr.윙 피드백 작성 중...</h3>
          <p>
            녹음된 답변을 분석하여 피드백을 작성 중 입니다.
            <br />
            {/* 완성된 피드백은 마이페이지 - 면접 히스토리에서 확인 가능합니다. */}
          </p>
        </div>

        <div className={styles.buttons}>
          <button onClick={() => navigate('/mypage')}>피드백 보러가기</button>
          <button onClick={() => navigate('/interview-ai/awaiting')}>
            면접 대기실로 이동
          </button>
          <button onClick={download}>녹음 파일 다운로드</button>
        </div>
      </div>
    </div>
  )
}

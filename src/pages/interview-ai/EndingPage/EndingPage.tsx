import { useNavigate } from 'react-router-dom'
import { useAIInterviewStore, useRecordingStore } from '@/stores'
import { useEffect, useState } from 'react'
import { Button, Modal } from '@/components/ui'
import { RotateCcw, Download } from 'lucide-react'
import styles from './styles.module.scss'
import { useFinishInterview } from '@/hooks'

export const EndingPage: React.FC = () => {
  const navigate = useNavigate()
  const [errorModal, setErrorModal] = useState(false)
  const [savedModal, setSavedModal] = useState(false)
  const [isRequested, setIsRequested] = useState(false)

  const recordedBlob = useRecordingStore(state => state.recordedBlob)
  const interviewId = useAIInterviewStore(state => state.interviewId)

  const { saveInterview, loading: isSaving } = useFinishInterview()

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
      setErrorModal(true)
    }
  }

  const handleRequestFeedback = async () => {
    if (!interviewId) return

    try {
      await saveInterview(interviewId)
      setSavedModal(true)
      setIsRequested(true)
    } catch (error) {
      console.log(error)
    }
  }

  // // 새로고침 후 접근 시
  useEffect(() => {
    if (!recordedBlob) {
      navigate('/interview-ai/awaiting')
    }
  }, [recordedBlob, navigate])

  return (
    <div className={styles.endingPage}>
      <div className={styles.container}>
        <h3 className={styles.headText}>
          면접이 종료되었습니다.
          <br />
          수고하셨습니다!
        </h3>

        <Button
          text={
            isRequested
              ? '피드백 제출 완료'
              : '면접 저장하고 Mr.윙에게 피드백 요청하기'
          }
          onClick={handleRequestFeedback}
          color="black"
          disabled={isRequested}
        />

        <p className={styles.subText}>
          피드백 생성까지는 최대 20분 소요됩니다.
          <br />
          이후 <b>마이페이지 - 나의 면접 회고하기</b>에서 <br />
          면접 질문과 피드백을 함께 확인할 수 있어요!
        </p>

        <span>페이지를 벗어나면 저장하지 않은 녹음 파일은 사라집니다.</span>

        <div className={styles.buttons}>
          <button onClick={() => navigate('/interview-ai/awaiting')}>
            <RotateCcw />
            면접 대기실로 이동
          </button>
          <button onClick={download} className={styles.download}>
            <Download />
            녹음 파일 다운로드
          </button>
        </div>
      </div>

      <Modal
        isOpen={errorModal}
        style="failed"
        message={['녹음 파일이 존재하지 않습니다.']}
        closable
        toggleModal={() => setErrorModal(!errorModal)}
      />

      <Modal
        isOpen={isSaving}
        style="loading"
        message={['면접 데이터를 저장하고 있습니다.', '잠시만 기다려주세요.']}
      />

      <Modal
        isOpen={savedModal && !isSaving}
        style="congrats"
        closable
        message={[
          'Mr.윙에게 피드백 요청 성공!',
          '피드백 작성까지는 최대 20분 소요됩니다.',
        ]}
        toggleModal={() => setSavedModal(!savedModal)}
      >
        <Button
          text="피드백 보러가기"
          onClick={() => navigate('/mypage/interview')}
          color="black"
        />
      </Modal>
    </div>
  )
}

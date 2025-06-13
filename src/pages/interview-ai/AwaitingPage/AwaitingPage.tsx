import { useEffect, useState, useRef } from 'react'
import { Button, Modal } from '@/components/ui'
import { InterviewGuideline } from '@/components/features'
import {
  useStartInterview,
  useMediaRecorder,
  useFinishInterview,
} from '@/hooks'
import { useAIInterviewStore, useAuthStore } from '@/stores'
import { findOldInterview } from '@/api/interviewAiAPI'
import styles from './styles.module.scss'

/**
 *   AI 면접 대기 페이지 flow
 *
 *   페이지 진입 시 캐싱된 데이터 있으면 reset
 *
 *   면접 시작 버튼 클릭하면
 *   1. 녹음 시작 요청 (startRecording)
 *   2. (API) 면접 ID 발급 요청 & 인터뷰 시간 전송
 *   3. (API) 인터뷰 상태 업데이트 (PENDING -> PROGRESS)
 *   4. (API) 면접 질문 생성
 *   5. 질문 페이지로 이동
 *   6. 타이머 시작 (5번과 동시에)
 */

export const AwaitingPage: React.FC = () => {
  const [errorModal, setErrorModal] = useState(false)
  const [resetModal, setResetModal] = useState(false)
  const [error, setError] = useState<string[]>([])
  const resetDoneRef = useRef(false)

  const userId = useAuthStore(state => state.userId)
  const interviewId = useAIInterviewStore(state => state.interviewId)
  const setInterviewId = useAIInterviewStore(state => state.setInterviewId)
  const duration = useAIInterviewStore(state => state.duration)

  const { startInterview, loading: isStarting } = useStartInterview()
  const { resetInterview } = useFinishInterview()
  const { startRecording, stopRecording, recordingError } = useMediaRecorder()

  const handleStartInterview = async () => {
    // 녹음 시작 요청
    try {
      await startRecording()
    } catch (error) {
      console.error(error)
      setError(recordingError)
      setErrorModal(true)
      return
    }

    // 면접 시작 요청
    try {
      await startInterview(duration)
    } catch (error) {
      console.error(error)
      stopRecording()
      setError(['잘못된 접근입니다.', '초기화 후 다시 실행해주세요.'])
      setResetModal(true)
    }
  }

  const init = async () => {
    if (userId) {
      const oldInterviewId = await findOldInterview(userId)
      setInterviewId(oldInterviewId)
      setResetModal(false)
      window.location.reload()
    }
  }

  useEffect(() => {
    if (interviewId && !isStarting && !resetDoneRef.current) {
      resetDoneRef.current = true
      resetInterview(interviewId)
    }
  }, [interviewId, isStarting])

  return (
    <div className={styles.awaitingPage}>
      <div className={styles.container}>
        <InterviewGuideline onClick={handleStartInterview} />
      </div>

      <Modal
        isOpen={isStarting && !error.length}
        style="loading"
        message={['면접 질문을 준비하고 있습니다.', '잠시만 기다려주세요.']}
      />

      <Modal
        isOpen={errorModal}
        style="failed"
        message={error}
        closable
        toggleModal={() => setErrorModal(!errorModal)}
      />

      <Modal
        isOpen={resetModal}
        style="failed"
        message={error}
        closable
        toggleModal={() => setResetModal(!resetModal)}
      >
        <Button text="초기화" onClick={init} />
      </Modal>
    </div>
  )
}

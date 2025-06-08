import { useEffect, useState } from 'react'
import { Modal } from '@/components/ui'
import { InterviewGuideline } from '@/components/features'
import { useInterviewId, useStartInterview } from '@/hooks'
import { useAIInterviewStore, useAuthStore } from '@/stores'
import styles from './styles.module.scss'
import { useMediaRecorder } from '@/hooks/interview/useMediaRecorder'

/**
 *   AI 면접 대기 페이지 flow
 *
 *   페이지 렌더링 시,
 *   면접 ID 발급 요청 (발급 조건: 1. 로그인을 했다 2. 발급받은 ID가 없다)
 *
 *   면접 시작 버튼 클릭하면
 *   1. 녹음 시작 요청 (startRecording)
 *   2. (API) 인터뷰 시간 전송
 *   3. (API) 인터뷰 상태 업데이트 (PENDING -> PROGRESS)
 *   4. (API) 면접 질문 생성
 *   5. 질문 페이지로 이동
 *   6. 타이머 시작 (5번과 동시에)
 */

export const AwaitingPage: React.FC = () => {
  const [errorModal, setErrorModal] = useState(false)
  const [error, setError] = useState<string[]>([])

  const isLoggedIn = useAuthStore(state => state.isLoggedIn)
  const { interviewId, setInterviewId, duration } = useAIInterviewStore()

  const { startInterview, loading } = useStartInterview()
  const { startRecording, stopRecording, micError } = useMediaRecorder()

  const { data: newInterviewId } = useInterviewId(isLoggedIn && !interviewId)

  const handleStartInterview = async () => {
    if (!interviewId) {
      setError([
        '면접 ID 발급에 실패했습니다.',
        '새로고침 후 다시 시도해주세요.',
      ])
      setErrorModal(true)
      return
    }

    // 면접 ID 발급 성공 -> 녹음 시작 요청
    try {
      await startRecording()
    } catch (error) {
      console.error(error)
      setError(micError)
      setErrorModal(true)
      return
    }

    // 녹음 실행 성공 -> 면접 시작 요청
    try {
      await startInterview(interviewId, duration)
    } catch (error) {
      console.error(error)
      stopRecording()

      setError([
        '모의 면접 실행에 실패했습니다.',
        '새로고침 후 다시 시도해주세요.',
      ])

      setErrorModal(true)
    }
  }

  useEffect(() => {
    if (newInterviewId) {
      setInterviewId(newInterviewId)
    }
  }, [newInterviewId, setInterviewId])

  return (
    <div className={styles.awaitingPage}>
      <div className={styles.container}>
        <InterviewGuideline onClick={handleStartInterview} />
      </div>

      <Modal
        isOpen={loading && !error.length}
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
    </div>
  )
}

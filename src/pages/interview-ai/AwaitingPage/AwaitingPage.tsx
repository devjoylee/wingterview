import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@/components/common'
import { InterviewStartButton } from '@/components/interview'
import { useTimerStore } from '@/stores/timerStore'
import mrWing from '@/assets/mrwing.png'
import styles from './styles.module.scss'
import { useInterviewId, useStartInterview } from '@/hooks'
import { useAIInterviewStore } from '@/stores'
import { useRecordingStore } from '@/stores/recordingStore'

export const AwaitingPage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedTime, setSelectedTime] = useState<number>(0)
  const [toggleModal, setToggleModal] = useState(false)
  const [error, setError] = useState<string[]>([])

  const { setMediaRecorder, clearChunks } = useRecordingStore()
  const { startInterview, loading } = useStartInterview()
  const { startTimer } = useTimerStore()

  const myInterviewId = useAIInterviewStore(state => state.interviewId)
  const setInterviewId = useAIInterviewStore(state => state.setInterviewId)
  const setCurrentPhase = useAIInterviewStore(state => state.setCurrentPhase)

  const { data: interviewId } = useInterviewId(myInterviewId)

  const handleStartInterview = async () => {
    if (!interviewId) {
      setError([
        '면접 질문 생성에 실패했습니다.',
        '새로고침 후 다시 시도해주세요.',
      ])
      setToggleModal(true)
      return
    }

    const permission = await navigator.permissions.query({
      name: 'microphone' as PermissionName,
    })

    if (permission.state === 'denied') {
      setError([
        '마이크 권한이 차단되어 있습니다.',
        '브라우저 설정에서 마이크 권한을 허용해주세요.',
      ])
      setToggleModal(true)
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)

      clearChunks()

      recorder.start(1000)

      setMediaRecorder(recorder)

      await startInterview(interviewId, selectedTime)

      startTimer(selectedTime)
      setCurrentPhase('PROGRESS')
      navigate('/interview-ai/question')
    } catch (error) {
      console.error('면접 질문 생성 실패', error)
      setError([
        '면접 질문 생성에 실패했습니다.',
        '새로고침 후 다시 시도해주세요.',
      ])
      setToggleModal(true)
    }
  }

  useEffect(() => {
    if (interviewId) {
      setInterviewId(interviewId)
    }
  }, [interviewId, setInterviewId])

  return (
    <div className={styles.awaitingPage}>
      <div className={styles.container}>
        <div className={styles.guideline}>
          <img src={mrWing} alt="mr wing" className={styles.mrwing} />

          <div className={styles.textBox}>
            <h3>AI 면접관, Mr.윙을 소개합니다!</h3>
            <p>
              본 면접에서는 음성 녹음이 진행됩니다. <br />
              AI 면접관 <b>Mr.윙</b>이 녹음된 파일을 분석하여 <br />
              면접이 끝나면 맞춤형 피드백을 제공합니다.
            </p>
            <p>
              <b>원하는 면접 시간을 선택한 후</b> <br />
              START 버튼을 눌러 면접을 시작해보세요.
            </p>
            <ul className={styles.timeSelection}>
              {[5, 10, 15, 20].map(time => (
                <li
                  key={time}
                  className={time === selectedTime ? styles.active : ''}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}분
                </li>
              ))}
            </ul>
            <span className={styles.alert}>
              * 마이크 권한사용 팝업이 뜨면 "허용" 클릭
            </span>
            <InterviewStartButton
              onClick={handleStartInterview}
              disabled={!selectedTime}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={loading && !error}
        style="loading"
        message={['면접 질문을 준비하고 있습니다.', '잠시만 기다려주세요.']}
      />

      <Modal
        isOpen={toggleModal}
        style="failed"
        message={error}
        closable
        toggleModal={() => setToggleModal(!toggleModal)}
      />
    </div>
  )
}

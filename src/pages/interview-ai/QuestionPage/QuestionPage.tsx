import { Modal, ProfileImage } from '@/components/common'
import { useState } from 'react'
import { useInterviewStore, useTimerStore } from '@/stores'
import mrWingMic from '@/assets/mrwing-mic.png'
import styles from './styles.module.scss'
import { useProfile } from '@/hooks/profile'
import { useNavigate } from 'react-router-dom'

export const QuestionPage: React.FC = () => {
  const navigate = useNavigate()
  const [isGenerating, setIsGenerating] = useState(false)
  const { interviewId, selectedQuestion } = useInterviewStore()
  const { resetTimer } = useTimerStore()
  const { myData } = useProfile('get')

  const handleNextQuestion = () => {
    if (!interviewId) {
      console.error('면접 ID를 찾을 수 없습니다.')
      return
    }

    setIsGenerating(true)

    setTimeout(() => {
      setIsGenerating(false)
    }, 2500)
  }

  const handleEndInterview = () => {
    resetTimer({ minutes: 0, seconds: 0 })
    navigate('/interview-ai/end')
  }

  return (
    <div className={styles.questionPage}>
      <div className={styles.interviewer}>
        <div className={styles.mrwingProfile}>
          <img src={mrWingMic} alt="mr wing" />
          <p></p>
        </div>

        <h2 className={styles.question}>
          {selectedQuestion}
          선점형 스케줄링과 비선점형 스케줄링의 차이는 무엇인가요?
        </h2>
      </div>

      <div className={styles.interviewee}>
        <div className={styles.myImage}>
          {myData && <ProfileImage url={myData.profileImageUrl} size={80} />}
        </div>
        <div className={styles.recording}>녹음 중..</div>

        <p className={styles.helper}>답변이 끝나면 아래 버튼을 눌러주세요!</p>

        <button onClick={handleNextQuestion} className={styles.nextButton}>
          다음 질문 넘어가기
        </button>

        <button onClick={handleEndInterview} className={styles.endButton}>
          면접 종료 (임시)
        </button>
      </div>

      <Modal
        isOpen={isGenerating}
        closeOnBgClick={false}
        style="loading"
        message={['다음 질문을 준비 중 입니다.', '잠시만 기다려주세요.']}
      />
    </div>
  )
}

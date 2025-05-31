import { Modal, ProfileImage } from '@/components/common'
import { useState } from 'react'
import { useAIInterviewStore } from '@/stores'
import mrWingMic from '@/assets/mrwing-mic.png'
import styles from './styles.module.scss'
import { useProfile } from '@/hooks/profile'
import { useFinishInterview, useNextQuestion } from '@/hooks'
import { VoiceRecorder } from '@/components/interview'

export const QuestionPage: React.FC = () => {
  const [keyword, setKeyword] = useState('')

  const { interviewId, question } = useAIInterviewStore()

  const { myData } = useProfile('get')
  const { nextQuestion, loading } = useNextQuestion()
  const { finishInterview, loading: isEnding } = useFinishInterview()

  const handleNextQuestion = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!interviewId) return

    if (e.currentTarget.id === 'new') {
      await nextQuestion(interviewId)
    } else if (e.currentTarget.id === 'followup') {
      await nextQuestion(interviewId, {
        question: question,
        keywords: keyword,
      })
    }
  }

  const handleEndInterview = async () => {
    if (!interviewId) return
    await finishInterview(interviewId)
  }

  return (
    <div className={styles.questionPage}>
      <div className={styles.interviewer}>
        <div className={styles.mrwingProfile}>
          <img src={mrWingMic} alt="mr wing" />
        </div>

        <h2 className={styles.question}>{question}</h2>
      </div>

      <div className={styles.interviewee}>
        <div className={styles.recordingBox}>
          <div className={styles.myImage}>
            {myData && <ProfileImage url={myData.profileImageUrl} size={80} />}
          </div>
          <div className={styles.recording}>
            <VoiceRecorder />
          </div>
        </div>

        <textarea
          className={styles.textArea}
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="답변을 간략히 요약해보세요 (최대 200자까지 입력 가능)"
          maxLength={200}
        />

        <p className={styles.helper}>
          답변이 끝나면 아래 버튼 중 하나를 선택해주세요!
        </p>

        <div className={styles.buttons}>
          <button id="followup" onClick={handleNextQuestion}>
            꼬리 질문을 <br />
            해주세요
          </button>
          <button id="new" onClick={handleNextQuestion}>
            새로운 질문을 <br />
            해주세요
          </button>
        </div>

        <button className={styles.endButton} onClick={handleEndInterview}>
          면접 종료
        </button>
      </div>

      <Modal
        isOpen={loading}
        style="loading"
        message={['다음 질문을 준비 중 입니다.', '잠시만 기다려주세요.']}
      />

      <Modal
        isOpen={isEnding}
        style="loading"
        message={['녹음 파일을 전송 중입니다.', '잠시만 기다려주세요.']}
      />
    </div>
  )
}

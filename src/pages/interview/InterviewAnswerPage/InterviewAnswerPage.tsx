import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Modal } from '@/components/common'
import { useInterviewStore } from '@/stores/interviewStore'
import {
  useGenerateQuestion,
  useUpdateInterviewStatus,
} from '@/hooks/interview'
import styles from './styles.module.scss'
import { useTimerStore } from '@/stores/timerStore'

export const InterviewAnswerPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const { resetTimer } = useTimerStore()
  const { questionIdx, setInterviewData } = useInterviewStore()
  const currentQuestion = location.state?.question
  const interviewId = localStorage.getItem('interviewId') as string

  const { mutate: generateQuestions, isPending } = useGenerateQuestion({
    onSuccess: result => {
      if (result.data && result.data.questions) {
        setIsGenerating(false)
        navigate('/interview/question', {
          state: {
            questions: result.data.questions,
          },
        })
      }
    },
    onError: () => {
      setIsGenerating(false)
    },
  })

  const { mutate: updateStatus } = useUpdateInterviewStatus({
    onSuccess: () => {
      navigate('/interview/feedback')
    },
  })

  const generateFollowUp = () => {
    setIsGenerating(true)
    generateQuestions({
      interviewId,
      questionData: {
        question: currentQuestion,
        keywords: keyword,
      },
    })
  }

  const generateNew = () => {
    setIsGenerating(true)
    setTimeout(() => {
      generateQuestions({
        interviewId,
      })
    }, 1500)
  }

  const handleEndInterview = () => {
    if (!interviewId) {
      console.error('면접 ID를 찾을 수 없습니다.')
      return
    }

    updateStatus(interviewId) // PROGRESS -> FEEDBACK
    setInterviewData({ currentPhase: 'FEEDBACK' })
    resetTimer({ minutes: 0, seconds: 0 })
  }

  return (
    <div className={styles.container}>
      <div className={styles.question}>
        <h2>Q{questionIdx + 1}.</h2>
        <p>{currentQuestion}</p>
      </div>

      <div className={styles.promptContainer}>
        <h3>Prompt</h3>

        <textarea
          className={styles.textArea}
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="면접자의 답변 중 꼬리질문을 만들 수 있는 주요 단어를 입력해보세요.

ex) staleTime, 캐싱, 상태관리"
          maxLength={200}
        />

        <span className={styles.helperText}>
          *프롬프트는 최대 200자까지 입력 가능합니다.
        </span>

        <div className={styles.buttons}>
          <Button
            text="꼬리 질문 만들기"
            onClick={generateFollowUp}
            disabled={isPending || isGenerating}
          />

          <button
            className={styles.regenerateButton}
            onClick={generateNew}
            disabled={isPending || isGenerating}
          >
            새로운 주제로 질문 만들기
          </button>

          <button className={styles.temp} onClick={handleEndInterview}>
            면접 종료 (임시)
          </button>
        </div>
      </div>

      <Modal
        isOpen={isPending || isGenerating}
        closeOnBgClick={false}
        style="loading"
        message={['질문을 생성하고 있습니다.', '잠시만 기다려주세요.']}
      />
    </div>
  )
}

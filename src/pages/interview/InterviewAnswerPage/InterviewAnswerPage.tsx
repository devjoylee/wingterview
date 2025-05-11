import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Modal } from '@/components/common'
import { useInterviewStore } from '@/stores/interviewStore'
import {
  useGenerateQuestion,
  useUpdateInterviewStatus,
} from '@/hooks/interview'
import styles from './styles.module.scss'

export const InterviewAnswerPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const { currentQuestionIdx } = useInterviewStore()
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
    generateQuestions({
      interviewId,
    })
  }

  const handleEndInterview = () => {
    if (!interviewId) {
      console.error('면접 ID를 찾을 수 없습니다.')
      return
    }

    updateStatus(interviewId) // PROGRESS -> FEEDBACK
  }

  return (
    <div className={styles.container}>
      <div className={styles.question}>
        <h2>Q{currentQuestionIdx}.</h2>
        <p>{currentQuestion}</p>
      </div>

      <div className={styles.promptContainer}>
        <h3>Prompt</h3>

        <textarea
          className={styles.textArea}
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="면접자 답변을 바탕으로 꼬리질문에 생성 키워드를 입력해보세요.
ex) 프로세스 → 한 단어로 꼬리질문 생성해보세요!"
        />

        <span className={styles.helperText}>
          *꼬리질문은 1 - 200자 사이로 가능합니다.
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

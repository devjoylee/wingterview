import { useEffect, useState } from 'react'
import { Button, Modal } from '@/components/ui'
import { useAIInterviewStore, useRecordingStore } from '@/stores'
import { useFinishInterview, useNextQuestion } from '@/hooks'
import { AnswerArea, QuestionArea } from '@/components/features'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'

export const QuestionPage: React.FC = () => {
  const navigate = useNavigate()
  const [endConfirmModal, setEndConfirmModal] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [error, setError] = useState<string[]>([])

  const { interviewId, question, keyword, setKeyword } = useAIInterviewStore()
  const isRecording = useRecordingStore(state => state.isRecording)

  const { finishInterview, loading: isFinishing } = useFinishInterview()
  const { nextQuestion, loading: isGenerating } = useNextQuestion()

  const handleNextQuestion = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!interviewId) return
    const target = e.target as HTMLElement

    try {
      if (target.id === 'new') {
        await nextQuestion(interviewId)
      } else if (target.id === 'followup') {
        await nextQuestion(interviewId, {
          question: question,
          keywords: keyword,
        })
      }
      setKeyword('')
    } catch (error) {
      console.log(error)
      setError(['다음 질문을 불러올 수 없습니다.', '다시 시도해주세요.'])
      setErrorModal(true)
    }
  }

  const handleFinishInterview = async () => {
    if (!interviewId) return

    try {
      setEndConfirmModal(false)
      await finishInterview(interviewId)
    } catch (error) {
      console.log(error)
    }
  }

  // 녹음 중 이동 시 동작 handlers
  useEffect(() => {
    // navbar 클릭
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const navbar = target.closest('[data-id="navbar"]')

      if (navbar) {
        e.preventDefault()
        e.stopPropagation()
        setEndConfirmModal(true)
      }
    }

    // 새로고침/탭 닫기
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      return ''
    }

    // 뒤로가기
    const handleGoBack = () => {
      setEndConfirmModal(true)
      window.history.pushState(null, '', window.location.pathname)
    }

    window.history.pushState(null, '', window.location.pathname)

    document.addEventListener('click', handleNavClick, true)
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handleGoBack)

    return () => {
      document.removeEventListener('click', handleNavClick, true)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handleGoBack)
    }
  }, [])

  // 새로고침 후 접근 시
  useEffect(() => {
    if (!isRecording && !isFinishing) {
      navigate('/interview-ai/awaiting')
    }
  }, [isRecording, isFinishing, navigate])

  return (
    <div className={styles.questionPage}>
      <QuestionArea question={question} />

      <AnswerArea onNextClick={handleNextQuestion} />

      <div className={styles.buttonContainer}>
        <button className={styles.endButton} onClick={handleFinishInterview}>
          면접 종료
        </button>
      </div>

      <Modal
        isOpen={isGenerating}
        style="loading"
        message={['다음 질문을 준비 중 입니다.', '잠시만 기다려주세요.']}
      />

      <Modal
        isOpen={isFinishing}
        style="loading"
        message={['녹음 파일을 저장하고 있습니다.', '잠시만 기다려주세요.']}
      />

      <Modal
        isOpen={errorModal}
        style="failed"
        message={error}
        closable
        toggleModal={() => setErrorModal(!errorModal)}
      />

      <Modal
        isOpen={endConfirmModal}
        style="failed"
        closable
        toggleModal={() => setEndConfirmModal(!endConfirmModal)}
        message={[
          '페이지를 벗어나면 면접이 중지됩니다.',
          '면접을 종료하시겠습니까?',
        ]}
      >
        <Button
          text="면접 종료"
          color="black"
          onClick={handleFinishInterview}
        />
      </Modal>
    </div>
  )
}

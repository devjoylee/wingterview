import { Button, Modal } from '@/components/ui'
import { useAIInterviewStore } from '@/stores'
import { useFinishInterview, useNextQuestion } from '@/hooks'
import { AnswerArea, QuestionArea } from '@/components/features'
import { useEffect, useState } from 'react'
import styles from './styles.module.scss'

export const QuestionPage: React.FC = () => {
  const [endModal, setEndModal] = useState(false)
  const { interviewId, question } = useAIInterviewStore()

  const keyword = useAIInterviewStore(state => state.keyword)
  const setKeyword = useAIInterviewStore(state => state.setKeyword)

  const { finishInterview, loading: isFinishing } = useFinishInterview()
  const { nextQuestion, loading: isGenerating } = useNextQuestion()

  const handleNextQuestion = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!interviewId) return
    const target = e.target as HTMLElement

    if (target.id === 'new') {
      await nextQuestion(interviewId)
    } else if (target.id === 'followup') {
      await nextQuestion(interviewId, {
        question: question,
        keywords: keyword,
      })
      setKeyword('')
    }
  }

  const handleEndInterview = async () => {
    if (!interviewId) return
    setEndModal(false)
    await finishInterview(interviewId)
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
        setEndModal(true)
      }
    }

    // 새로고침/탭 닫기
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      return ''
    }

    // 뒤로가기
    const handleGoBack = () => {
      setEndModal(true)
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

  return (
    <div className={styles.questionPage}>
      <QuestionArea question={question} />

      <AnswerArea onNextClick={handleNextQuestion} />

      <div className={styles.buttonContainer}>
        <button className={styles.endButton} onClick={handleEndInterview}>
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
        message={['녹음 파일을 저장 중입니다.', '잠시만 기다려주세요.']}
      />

      <Modal
        isOpen={endModal}
        style="failed"
        closable
        toggleModal={() => setEndModal(!endModal)}
        message={[
          '페이지를 벗어나면 면접이 중지됩니다.',
          '면접을 종료하시겠습니까?',
        ]}
      >
        <Button text="면접 종료" color="black" onClick={handleEndInterview} />
      </Modal>
    </div>
  )
}

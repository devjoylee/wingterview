import { Modal } from '@/components/ui'
import { useAIInterviewStore } from '@/stores'
import { useFinishInterview, useNextQuestion } from '@/hooks'
import { AnswerArea, QuestionArea } from '@/components/features'
import styles from './styles.module.scss'

export const QuestionPage: React.FC = () => {
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
    await finishInterview(interviewId)
  }

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
    </div>
  )
}

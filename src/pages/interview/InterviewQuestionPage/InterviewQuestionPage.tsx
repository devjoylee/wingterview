import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RefreshCw } from 'lucide-react'
import styles from './styles.module.scss'
import { Button, Modal } from '@/components/common'
import { useInterviewStore } from '@/stores/interviewStore'
import { useSelectedQuestion, useGenerateQuestion } from '@/hooks/interview'

export const InterviewQuestionPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const questionsInRoute = location.state?.questions
  const interviewId = localStorage.getItem('interviewId') as string

  const [questions, setQuestions] = useState<string[]>([])
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [isRefreshDisabled, setIsRefreshDisabled] = useState<boolean>(false)

  const {
    questionOption,
    selectedQuestion: prevQuestion,
    saveSelectedQuestion,
  } = useInterviewStore()

  const { mutate: sendSelectedQuestion } = useSelectedQuestion({
    onSuccess: () => {
      if (selectedIdx !== null) {
        const selected = questions[selectedIdx - 1]
        saveSelectedQuestion(selected)
        navigate('/interview/answer', {
          state: {
            question: selected,
          },
        })
      }
    },
  })

  const { mutate: generateQuestions, isPending: isGenerating } =
    useGenerateQuestion({
      onSuccess: result => {
        if (result.data && result.data.questions) {
          setQuestions(result.data.questions)
          setSelectedIdx(null)
        }

        // 5초 후 새로고침 버튼 활성화
        setTimeout(() => {
          setIsRefreshDisabled(false)
        }, 5000)
      },
    })

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx + 1)
  }

  const goToAnswerPage = () => {
    if (selectedIdx !== null) {
      sendSelectedQuestion({ interviewId, selectedIdx })
    }
  }

  const handleRefresh = () => {
    setIsRefreshDisabled(true)
    setSelectedIdx(null)

    if (!prevQuestion) {
      generateQuestions({ interviewId })
    } else {
      generateQuestions({
        interviewId,
        questionData: { question: prevQuestion, keywords: '' },
      })
    }
  }

  useEffect(() => {
    if (questionsInRoute) {
      setQuestions(questionsInRoute)
    } else if (questionOption) {
      setQuestions(questionOption)
    } else {
      generateQuestions({ interviewId })
    }
  }, [questionsInRoute, questionOption, generateQuestions, interviewId])

  const isLoading = isGenerating || isRefreshDisabled

  return (
    <div className={styles.container}>
      <div className={styles.questionHeader}>
        <h2>원하는 질문지를 선택해주세요.</h2>
        <button
          className={styles.resetButton}
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RefreshCw />
        </button>
      </div>

      <div className={styles.questionList}>
        {questions.map((question, idx) => (
          <div
            key={idx}
            className={`${styles.questionCard} ${selectedIdx === idx + 1 ? styles.selected : ''}`}
            onClick={() => handleSelect(idx)}
          >
            <p>{question}</p>
          </div>
        ))}
      </div>

      <Button
        text="선택 완료"
        onClick={goToAnswerPage}
        disabled={selectedIdx === null}
      />

      <Modal
        isOpen={isGenerating}
        closeOnBgClick={false}
        style="loading"
        message={['새로운 질문을 생성하고 있습니다.', '잠시만 기다려주세요.']}
      />
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RefreshCw } from 'lucide-react'
import styles from './styles.module.scss'
import { Button, Modal, Notice } from '@/components/common'
import { useInterviewStore } from '@/stores/interviewStore'
import { useSelectedQuestion, useGenerateQuestion } from '@/hooks/interview'

/**
 *   면접 질문 페이지 flow
 *
 *   페이지 렌더링 시,
 *   1. 면접 질문 캐싱 확인 (route, store)
 *      데이터 없으면 generateQuestions 문재 생성 재요청
 *
 *   질문 선택 후 선택완료 클릭 시,
 *   1. 선택한 질문 API 로 보내기 (sendSelectedQuestion)
 *   2. 선택한 질문 store에 저장 (saveSelectedQuestion)
 *   3. questionIdx 업데이트
 *      첫 질문 선택 인경우 (questionIdx -1 상태), questionIdx = 1
 *      두번째 질문 부터는, questionIdx = questionIdx + 1
 *
 *   새로고침 클릭 시,
 *   1. prevQuestion이 있으면, prevQuestion 관련 질문 4개 재요청
 *      prevQuestion이 없으면, 새로운 질문 4개 요청
 *   2. 질문 생성 (generateQuestions) 성공 시, 문제 목록 questionOption store에 저장
 */

export const InterviewQuestionPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const questionsInRoute = location.state?.questions

  const [questions, setQuestions] = useState<string[]>([])
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [isRefreshDisabled, setIsRefreshDisabled] = useState<boolean>(false)

  const {
    interviewId,
    questionOption,
    selectedQuestion: prevQuestion,
    saveSelectedQuestion,
    setInterviewData,
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
          setInterviewData({ questionOption: result.data.questions })
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
      <div className={styles.notice}>
        <Notice>
          <p>
            마음에 드는 질문이 없는 경우 오른쪽 상단의 refresh 아이콘을 클릭하면
            새로운 질문 목록을 가져옵니다. 원하는 질문을 골랐다면 '선택완료'
            버튼을 눌러주세요.
          </p>
        </Notice>
      </div>
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

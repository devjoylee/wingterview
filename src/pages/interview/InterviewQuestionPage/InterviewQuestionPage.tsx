import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RefreshCw } from 'lucide-react'
import styles from './styles.module.scss'
import { Button } from '@/components/common'

const dummyQuestions = [
  'CORS 에러는 언제 발생하며, 프론트엔드와 백엔드 각각에서 이를 어떻게 해결할 수 있을까요?',
  '스레드를 사용하였을 때 장단점을 서술하고 스레드의 생명주기에 대해 서술하시오.',
  '브라우저의 동작방식에 대해 설명하세요',
  '데이터가 많은 테이블에서 검색 성능이 느릴 경우, 어떤 방식으로 백엔드에서 최적화를 시도할 수 있을까요?',
]

export const InterviewQuestionPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const questionsInRoute = location.state?.questions

  const [questions, setQuestions] = useState<string[]>(dummyQuestions)

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  const handleSelect = (idx: number) => setSelectedIdx(idx)

  const goToAnswerPage = () => {
    if (selectedIdx !== null) {
      navigate('/interview/answer', {
        state: {
          question: questions[selectedIdx],
        },
      })
    }
  }

  useEffect(() => {
    if (questionsInRoute) {
      setQuestions(questionsInRoute)
    } else {
      console.warn('질문 데이터가 없습니다.')
    }
  }, [questionsInRoute])

  return (
    <div className={styles.container}>
      <div className={styles.questionHeader}>
        <h2>원하는 질문지를 선택해주세요.</h2>
        <button className={styles.resetButton}>
          <RefreshCw />
        </button>
      </div>
      <div className={styles.questionList}>
        {questions.map((question, idx) => (
          <div
            key={idx}
            className={`${styles.questionCard} ${selectedIdx === idx ? styles.selected : ''}`}
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
    </div>
  )
}

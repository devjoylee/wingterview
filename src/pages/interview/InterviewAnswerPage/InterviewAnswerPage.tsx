import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { Button } from '@/components/common'

export const InterviewAnswerPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { question } = location.state || {
    question:
      '스레드를 사용하였을 때 장단점을 서술하고 스레드의 생명주기에 대해 서술하시오.',
  }
  const [keyword, setKeyword] = useState('')

  const generateQuestion = () => {
    navigate('/interview/question')
  }

  return (
    <div className={styles.container}>
      <div className={styles.question}>
        <h2>Q1.</h2>
        <p>{question}</p>
      </div>

      <div className={styles.promptContainer}>
        <h3>Prompt</h3>

        <div className={styles.prompt}>
          <textarea
            className={styles.textArea}
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="면접자 답변을 바탕으로 꼬리질문에 생성 키워드를 입력해보세요.
ex) 프로세스 → 한 단어로 꼬리질문 생성해보세요!"
          />
        </div>

        <span className={styles.helperText}>
          *꼬리질문은 1 - 200자 사이로 가능합니다.
        </span>

        <div className={styles.buttons}>
          <Button text="꼬리 질문 만들기" onClick={generateQuestion} />

          <button
            className={styles.regenerateButton}
            onClick={generateQuestion}
          >
            새로운 주제로 질문 만들기
          </button>
        </div>
      </div>
    </div>
  )
}

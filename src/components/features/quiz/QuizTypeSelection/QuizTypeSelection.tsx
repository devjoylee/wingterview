import { useState } from 'react'
import { Dropdown } from '@/components/ui'
import styles from './styles.module.scss'

type QuizType = 'review' | 'topic' | null

export const QuizTypeSelection: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  const [selectedQuizType, setSelectedQuizType] = useState<QuizType>(null)
  const [selectedTopic, setSelectedTopic] = useState<string>('')

  const topics = [
    '자료구조',
    '운영체제',
    '네트워크',
    '데이터베이스',
    '프론트엔드',
    '백엔드',
    '클라우드',
    '보안',
    '머신러닝/AI',
  ]

  const handleQuizTypeSelect = (type: QuizType) => {
    setSelectedQuizType(type)
    if (type === 'review') {
      setSelectedTopic('')
    }
  }

  return (
    <div className={styles.quizTypeSelection}>
      <div
        className={`${styles.quizType} ${selectedQuizType === 'review' ? styles.selected : ''}`}
        onClick={() => handleQuizTypeSelect('review')}
      >
        <h4>모의면접 복습 퀴즈</h4>
        <p>Mr.윙과 진행한 모의면접 내용을 퀴즈로 복습</p>
      </div>

      <div className={styles.quizType} onClick={onClick}>
        <h4>주제별 퀴즈 (서비스 준비 중)</h4>
        <p>원하는 개발 주제를 선택해서 퀴즈 풀기</p>
      </div>

      {selectedQuizType === 'topic' && (
        <div className={styles.topicSelection}>
          <Dropdown
            options={topics}
            placeholder="퀴즈 주제를 선택해주세요"
            selectedOption={selectedTopic}
            onChange={setSelectedTopic}
          />
        </div>
      )}
    </div>
  )
}

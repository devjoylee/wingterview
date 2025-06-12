import { InterviewHistoryCard } from '@/components/features'
import styles from './styles.module.scss'
import { useState } from 'react'
import { Modal } from '@/components/ui'
import { useNavigate } from 'react-router-dom'

interface Props {
  history: InterviewHistoryListData[]
}

export const InterviewHistoryList: React.FC<Props> = ({ history }) => {
  const [notReady, setNotReady] = useState(false)
  const navigate = useNavigate()

  const handleClick = (hasFeedback: boolean, id: string) => {
    if (hasFeedback) {
      navigate(`/mypage/interview/${id}`)
    } else {
      setNotReady(true)
    }
  }

  return (
    <div className={styles.historyList}>
      {history.map((history, index) => (
        <InterviewHistoryCard
          key={index}
          history={history}
          onClick={handleClick}
        />
      ))}

      <Modal
        isOpen={notReady}
        style="failed"
        message={['피드백이 완성되지 않았습니다.', '조금만 기다려주세요!']}
        closable
        toggleModal={() => setNotReady(!notReady)}
      />
    </div>
  )
}

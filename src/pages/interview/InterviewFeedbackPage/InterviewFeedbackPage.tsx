import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import defaultImage from '@assets/default-profile.png'
import styles from './styles.module.scss'
import { Send } from 'lucide-react'

const interviewee = {
  name: '이주영',
  nickname: 'joy.lee',
  curriculum: '풀스택',
}

export const InterviewFeedbackPage: React.FC = () => {
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState('')

  const handleFinish = () => {
    navigate('/')
  }

  const handleSendFeedback = () => {
    // 피드백 전송 로직
    console.log('피드백 전송:', feedback)
    handleFinish()
  }

  return (
    <div className={styles.container}>
      <div className={styles.feedbackHeader}>
        <h2>
          면접이 종료되었습니다.
          <br />
          수고하셨습니다!
        </h2>
      </div>

      <div className={styles.profileSection}>
        <img src={defaultImage} alt="profile" className={styles.profileImage} />
        <p>{`${interviewee.nickname} (${interviewee.name}) / ${interviewee.curriculum}`}</p>
        <div className={styles.ratingStars}>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
      </div>

      <div className={styles.feedbackCard}>
        <h3>한줄 피드백</h3>
        <div className={styles.feedbackContainer}>
          <textarea
            className={styles.textarea}
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            placeholder="면접자에게 피드백을 남겨주세요"
          />
          <button className={styles.sendButton} onClick={handleSendFeedback}>
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}

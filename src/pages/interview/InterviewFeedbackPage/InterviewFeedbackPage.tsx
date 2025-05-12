import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import defaultImage from '@assets/default-profile.png'
import styles from './styles.module.scss'
import { Send } from 'lucide-react'
import { useInterviewStatus, useUpdateInterviewStatus } from '@/hooks/interview'

export const InterviewFeedbackPage: React.FC = () => {
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState('')
  const [interviewee, setInterviewee] = useState<BaseProfile>()

  const interviewId = localStorage.getItem('interviewId') as string

  const { data } = useInterviewStatus(interviewId)

  const { mutate: updateStatus } = useUpdateInterviewStatus({
    onSuccess: () => {
      navigate('/interview/awaiting')
    },
    onError: error => {
      console.error('면접 상태 업데이트 중 오류 발생:', error)
    },
  })

  const handleSendFeedback = () => {
    if (!interviewId) {
      console.error('면접 ID를 찾을 수 없습니다.')
      return
    }
    updateStatus(interviewId) // FEEDBACK -> PENDING
  }

  useEffect(() => {
    if (data) {
      setInterviewee(data?.data?.partner)
    }
  }, [data])

  return (
    <div className={styles.container}>
      <div className={styles.feedbackHeader}>
        <h2>
          면접이 종료되었습니다.
          <br />
          수고하셨습니다!
        </h2>
      </div>

      {interviewee && (
        <div className={styles.profileSection}>
          <img
            src={interviewee.profileImageUrl || defaultImage}
            alt="profile"
            className={styles.profileImage}
          />
          <p>{`${interviewee.nickname} (${interviewee.name}) / ${interviewee.curriculum}`}</p>

          {interviewee.jobInterest && interviewee.jobInterest.length > 0 && (
            <div className={styles.interestTags}>
              {interviewee.jobInterest.map((interest, index) => (
                <span key={index} className={styles.tag}>
                  {interest}
                </span>
              ))}
            </div>
          )}

          {interviewee.techStack && interviewee.techStack.length > 0 && (
            <div className={styles.techTags}>
              {interviewee.techStack.map((tech, index) => (
                <span key={index} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className={styles.ratingStars}>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
        </div>
      )}

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

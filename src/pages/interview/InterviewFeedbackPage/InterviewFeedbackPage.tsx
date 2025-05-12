import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import defaultImage from '@assets/default-profile.png'
import styles from './styles.module.scss'
import { Send } from 'lucide-react'
import { useInterviewStatus, useUpdateInterviewStatus } from '@/hooks/interview'
import { useInterviewStore } from '@/stores/interviewStore'
import { CurrentRound, StarRating } from '@/components/interview'
import { Modal } from '@/components/common'

export const InterviewFeedbackPage: React.FC = () => {
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState('')
  const [interviewee, setInterviewee] = useState<BaseProfile>()

  const interviewId = localStorage.getItem('interviewId') as string

  const { data } = useInterviewStatus(interviewId)
  const { currentRound } = useInterviewStore()

  const { mutate: updateStatus, isSuccess } = useUpdateInterviewStatus()

  const handleSendFeedback = () => {
    if (!interviewId) {
      console.error('면접 ID를 찾을 수 없습니다.')
      return
    }

    updateStatus(interviewId) // FEEDBACK -> PENDING
  }

  const goToNextRound = () => navigate('/interview/awaiting')

  useEffect(() => {
    if (data) {
      setInterviewee(data?.data?.partner)
    }
  }, [data])

  return (
    <div className={styles.container}>
      <CurrentRound currentRound={currentRound} />

      <div className={styles.feedbackHeader}>
        <h2>
          면접이 종료되었습니다.
          <br />
          피드백을 남겨주세요.
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
            <StarRating />
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
          <button
            className={`${styles.sendButton} ${feedback && styles.active}`}
            onClick={handleSendFeedback}
          >
            <Send size={24} />
          </button>
        </div>
      </div>

      <Modal
        isOpen={isSuccess}
        closeOnBgClick
        hasYesNo
        onYesClick={goToNextRound}
        style="congrats"
        message={['피드백이 제출되었습니다!', '다음 라운드를 계속 진행할까요?']}
      />
    </div>
  )
}

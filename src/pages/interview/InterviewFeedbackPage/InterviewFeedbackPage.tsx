import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import defaultImage from '@assets/default-profile.png'
import styles from './styles.module.scss'
import { Send } from 'lucide-react'
import { useInterviewStatus, useUpdateInterviewStatus } from '@/hooks/interview'
import { useInterviewStore } from '@/stores/interviewStore'
import { CurrentRound, StarRating } from '@/components/interview'
import { Button, Modal, Notice } from '@/components/common'

/**
 *   면접 피드백 페이지 flow
 *
 *   페이지 렌더링 시,
 *   면접자 데이터 가져오기
 *
 *   면접 종료 클릭 시,
 *   상태 업데이트 PROGRESS -> FEEDBACK
 */

export const InterviewFeedbackPage: React.FC = () => {
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState('')
  const [interviewee, setInterviewee] = useState<BaseProfile>()

  const { interviewId, currentRound, setInterviewData } = useInterviewStore()
  const { data: interviewData } = useInterviewStatus(interviewId)
  const { mutate: updateStatus, isSuccess } = useUpdateInterviewStatus()

  const isLastRound = currentRound === 4

  const handleSendFeedback = () => {
    if (!interviewId) {
      console.error('면접 ID를 찾을 수 없습니다.')
      return
    }

    updateStatus(interviewId) // FEEDBACK -> PENDING
    setInterviewData({ currentPhase: 'PENDING' })
  }

  const goToNextRound = () => navigate('/interview/awaiting')

  useEffect(() => {
    if (interviewData) {
      setInterviewee(interviewData?.data?.partner)
    }
  }, [interviewData])

  return (
    <div className={styles.container}>
      <div className={styles.notice}>
        <Notice>
          <p>
            피드백을 작성 후 전송 버튼을 누르면 다음 라운드 대기실로 이동합니다.
          </p>
        </Notice>
      </div>
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
            placeholder="면접자에게 피드백을 남겨주세요 (최대 200자)"
            maxLength={200}
          />
          <button
            className={`${styles.sendButton} ${feedback && styles.active}`}
            onClick={handleSendFeedback}
          >
            <Send size={24} />
          </button>
        </div>
      </div>

      {isLastRound ? (
        <Modal
          isOpen={isSuccess}
          closeOnBgClick={false}
          style="congrats"
          message={['피드백이 제출되었습니다!', '수고하셨습니다.']}
        >
          <Button text="홈으로 이동" onClick={() => navigate('/')} />
        </Modal>
      ) : (
        <Modal
          isOpen={isSuccess}
          closeOnBgClick={false}
          onYesClick={goToNextRound}
          style="congrats"
          message={[
            '피드백이 제출되었습니다!',
            '역할을 바꿔 다음 라운드를 진행해주세요',
          ]}
        >
          <Button
            text="면접 대기실로 이동"
            onClick={() => navigate('/interview/awaiting')}
          />
        </Modal>
      )}
    </div>
  )
}

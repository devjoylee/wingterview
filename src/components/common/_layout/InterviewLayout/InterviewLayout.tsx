import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Button, Logo, Modal } from '@/components/common'
import { Timer } from '@/components/interview'
import { useInterviewStore } from '@/stores/interviewStore'
import { getInterviewRouteByPhase } from '@/utils'
import styles from './styles.module.scss'

export const InterviewLayout: React.FC = () => {
  const { isInterviewer, currentPhase, questionOption, selectedQuestion } =
    useInterviewStore()
  const navigate = useNavigate()

  const isLastRoundDone = currentPhase.toUpperCase() === 'COMPLETE'

  useEffect(() => {
    if (!isInterviewer) {
      navigate('/interview/awaiting')
      return
    }

    const targetRoute = getInterviewRouteByPhase(
      currentPhase,
      questionOption,
      selectedQuestion
    )
    navigate(targetRoute)
  }, [currentPhase, navigate, isInterviewer, selectedQuestion, questionOption])

  return (
    <div className={styles.interviewLayout}>
      <div className={styles.pageHeader}>
        <div className={styles.logoWrapper}>
          <Logo width={60} color="light" />
        </div>
        <div className={styles.timerWrapper}>
          <Timer />
        </div>
      </div>
      <div className={styles.pageContent}>
        <Outlet />
      </div>

      <Modal
        isOpen={isLastRoundDone}
        closeOnBgClick={false}
        style="congrats"
        message={['오늘의 면접이 모두 종료되었습니다', '수고하셨습니다.']}
      >
        <Button text="홈으로 이동" onClick={() => navigate('/')} />
      </Modal>
    </div>
  )
}

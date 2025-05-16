import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Logo } from '@/components/common'
import { Timer } from '@/components/interview'
import { useInterviewStore } from '@/stores/interviewStore'
import { getInterviewRouteByPhase } from '@/utils'
import styles from './styles.module.scss'

export const InterviewLayout: React.FC = () => {
  const { isInterviewer, currentPhase, questionOption, selectedQuestion } =
    useInterviewStore()
  const navigate = useNavigate()

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
    </div>
  )
}

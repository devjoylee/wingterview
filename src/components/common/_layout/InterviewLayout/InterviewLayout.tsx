import { Outlet, useNavigate } from 'react-router-dom'
import { Logo } from '@/components/common'
import { Timer } from '@/components/interview'
import styles from './styles.module.scss'
import { useInterviewStore } from '@/stores/interviewStore'
import { useEffect } from 'react'

export const InterviewLayout: React.FC = () => {
  const { currentPhase } = useInterviewStore()
  const navigate = useNavigate()

  useEffect(() => {
    switch (currentPhase) {
      case 'PENDING':
        navigate('/interview/awaiting')
        break
      case 'PROGRESS':
        navigate('/interview/question')
        break
      case 'FEEDBACK':
        navigate('/interview/feedback')
        break
      case 'COMPLETE':
        navigate('/interview/awaiting')
        break
      default:
        break
    }
  }, [currentPhase, navigate])

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

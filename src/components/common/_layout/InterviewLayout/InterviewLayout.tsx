import { Outlet } from 'react-router-dom'
import { Logo } from '@/components/common'
import styles from './styles.module.scss'

export const InterviewLayout: React.FC = () => {
  return (
    <div className={styles.interviewLayout}>
      <div className={styles.pageHeader}>
        <div className={styles.logoWrapper}>
          <Logo width={60} color="light" />
        </div>
        <div className={styles.timer}>00:00:00</div>
      </div>
      <div className={styles.pageContent}>
        <Outlet />
      </div>
    </div>
  )
}

import { Outlet } from 'react-router-dom'
import { Logo } from '@/components/ui'
import styles from './styles.module.scss'

export const QuizLayout: React.FC = () => {
  return (
    <div className={styles.quizLayout}>
      <div className={styles.pageHeader}>
        <div className={styles.left}>
          <div className={styles.text}>WING QUIZ</div>
        </div>
        <div className={styles.right}>
          <Logo white />
        </div>
      </div>
      <div className={styles.pageContent}>
        <Outlet />
      </div>
    </div>
  )
}

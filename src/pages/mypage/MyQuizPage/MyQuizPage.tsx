import { SubPageHeader } from '@/components/ui'
import styles from './styles.module.scss'

export const MyQuizPage: React.FC = () => {
  return (
    <div className={styles.myQuizPage}>
      <SubPageHeader name="나의 퀴즈 복습하기" backTo="/mypage" />
      <div className={styles.container}></div>
    </div>
  )
}

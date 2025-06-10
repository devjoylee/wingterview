import { SubPageHeader } from '@/components/ui'
import styles from './styles.module.scss'

export const MyInterviewPage: React.FC = () => {
  return (
    <div className={styles.myInterviewPage}>
      <SubPageHeader name="나의 면접 회고하기" backTo="/mypage" />
      <div className={styles.container}></div>
    </div>
  )
}

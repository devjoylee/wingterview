import { SubPageHeader } from '@/components/ui'
import styles from './styles.module.scss'

export const MyProfileEditPage: React.FC = () => {
  return (
    <div className={styles.profileEditPage}>
      <SubPageHeader name="프로필 편집" backTo="/mypage" />
      <div className={styles.container}></div>
    </div>
  )
}

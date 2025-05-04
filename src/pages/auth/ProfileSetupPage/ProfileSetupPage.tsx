import { ProfileSlider } from '@/components/profile'
import styles from './styles.module.scss'
import { useEffect } from 'react'

export const ProfileSetupPage: React.FC = () => {
  useEffect(() => {
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault()
      }
    }

    document.addEventListener('keydown', handleTabKey)

    return () => {
      document.removeEventListener('keydown', handleTabKey)
    }
  }, [])

  return (
    <div className={styles.profileSetupPage}>
      <h2 className={styles.guideText}>
        매칭에 필요한 <br />
        정보를 입력해주세요.
      </h2>
      <ProfileSlider />
    </div>
  )
}

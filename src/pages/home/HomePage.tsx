import { useEffect, useState } from 'react'
import { Logo } from '@/components/ui'
import { FeatureSection, ProfileCard } from '@/components/features'
import { useProfile } from '@/hooks'
import { useAuthStore } from '@/stores'
import styles from './styles.module.scss'

export const HomePage: React.FC = () => {
  const [profile, setMyProfile] = useState<MyProfileData>()
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)

  const { myData } = useProfile('get', isLoggedIn)

  useEffect(() => {
    if (myData) {
      setMyProfile(myData)
    }
  }, [myData])

  return (
    <div className={styles.homePage}>
      <div className={styles.pageHeader}>
        <Logo width={200} white />
        <h1>
          꿈에 도전하는 당신의 여정에
          <br />
          <span className={styles.highlight}>윙터뷰</span>가 함께 할게요.
        </h1>
      </div>

      <div className={styles.pageContent}>
        <section className={styles.profile}>
          <ProfileCard profile={profile} isLoggedIn={isLoggedIn} />
        </section>

        <section className={styles.features}>
          <FeatureSection />
        </section>
      </div>
    </div>
  )
}

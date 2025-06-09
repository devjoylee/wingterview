import { useEffect, useState } from 'react'
import { Logo, Modal } from '@/components/ui'
import { FeatureCard, MyProfileCard } from '@/components/features'
import { useProfile } from '@/hooks'
import { useAuthStore } from '@/stores'
import { SquarePen } from 'lucide-react'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'

export const MyPage: React.FC = () => {
  const navigate = useNavigate()
  const [toggleModal, setToggleModal] = useState(false)
  const [profile, setMyProfile] = useState<MyProfileData>()
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)

  const { myData } = useProfile('get', isLoggedIn)

  const linkTo = (link: string) => {
    if (!isLoggedIn) {
      setToggleModal(true)
      return
    }
    navigate(link)
  }

  useEffect(() => {
    if (myData) {
      setMyProfile(myData)
    }
  }, [myData])

  return (
    <div className={styles.myPage}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>MY PROFILE</h1>
        <button
          className={styles.editButton}
          onClick={() => setToggleModal(true)}
        >
          <SquarePen />
        </button>
      </div>

      <div className={styles.pageContent}>
        <section className={styles.profile}>
          <MyProfileCard profile={profile} isLoggedIn={isLoggedIn} />
        </section>

        <Logo width={170} />

        <section className={styles.features}>
          <FeatureCard linkTo={linkTo} />
        </section>
      </div>

      <Modal
        isOpen={toggleModal}
        style="failed"
        message={['서비스 준비 중 입니다.', '조금만 기다려주세요!']}
        closable
        toggleModal={() => setToggleModal(!toggleModal)}
      />
    </div>
  )
}

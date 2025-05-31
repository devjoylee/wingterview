import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@/components/common'
import { ProfileSlider, SliderButtons } from '@/components/profile'
import { useProfile } from '@/hooks/profile'
import { useProfileStore } from '@/stores'
import type { Swiper as SwiperType } from 'swiper'
import styles from './styles.module.scss'

export const ProfileSetupPage: React.FC = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [swiper, setSwiper] = useState<SwiperType>()

  const imageURL = useProfileStore(state => state.imageURL)
  const formData = useProfileStore(state => state.formData)

  const { mutateAsync: submitProfile } = useProfile('create')

  const handleSubmit = async () => {
    setShowModal(true)

    await submitProfile()

    if (formData) {
      localStorage.setItem('nickname', formData.nickname.split('.')[0])
      sessionStorage.removeItem('profile-storage')
    }

    setTimeout(() => {
      setShowModal(false)
      navigate('/', { state: { myProfile: formData, imageURL: imageURL } })
    }, 2000)
  }

  useEffect(() => {
    const handleTabKey = (e: KeyboardEvent) => {
      const element = document.activeElement

      const tabAllowed =
        element?.getAttribute('name') === 'name' ||
        element?.getAttribute('name') === 'nickname'

      if (e.key === 'Tab' && !tabAllowed) {
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

      <ProfileSlider setSwiper={setSwiper} />
      <SliderButtons swiper={swiper} handleSubmit={handleSubmit} />

      {showModal && (
        <Modal
          isOpen={showModal}
          style="loading"
          message={['프로필을 생성하고 있습니다.', '잠시만 기다려주세요.']}
        />
      )}
    </div>
  )
}

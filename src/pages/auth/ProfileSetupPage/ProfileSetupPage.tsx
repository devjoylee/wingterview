import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@/components/ui'
import { ProfileSlider, SliderButtons } from '@/components/features'
import { useProfile } from '@/hooks/profile'
import { useProfileStore } from '@/stores'
import type { Swiper as SwiperType } from 'swiper'
import styles from './styles.module.scss'

export const ProfileSetupPage: React.FC = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [swiper, setSwiper] = useState<SwiperType>()

  const imageURL = useProfileStore(state => state.imageURL)
  const formData = useProfileStore(state => state.formData)

  const { mutateAsync: submitProfile } = useProfile('create')

  const handleSubmit = async () => {
    setShowModal(true)

    try {
      const delay = new Promise(resolve => setTimeout(resolve, 1000))

      await delay
      await submitProfile()

      if (formData) {
        localStorage.setItem('nickname', formData.nickname.split('.')[0])
        sessionStorage.removeItem('profile-storage')
      }

      setTimeout(() => {
        setShowModal(false)
        navigate('/', { state: { myProfile: formData, imageURL: imageURL } })
      }, 2000)
    } catch (error) {
      console.error('프로필 제출 에러:', error)
      setShowModal(false)
      setErrorModal(true)
    }
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
      <span className={styles.helper}>
        입력한 정보를 기반으로 <br />
        맞춤형 면접 질문 및 피드백이 제공됩니다.
      </span>

      <ProfileSlider setSwiper={setSwiper} />
      <SliderButtons swiper={swiper} handleSubmit={handleSubmit} />

      <Modal
        isOpen={showModal}
        style="loading"
        message={['프로필을 생성하고 있습니다.', '잠시만 기다려주세요.']}
      />

      <Modal
        isOpen={errorModal}
        style="failed"
        message={['프로필 제출에 실패했습니다.', '확인 후 다시 시도해주세요.']}
        closable
        toggleModal={() => setErrorModal(false)}
      />
    </div>
  )
}

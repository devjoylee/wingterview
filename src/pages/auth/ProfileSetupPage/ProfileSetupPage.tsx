import { useState, useEffect } from 'react'
import { Modal } from '@/components/common'
import { ProfileSlider } from '@/components/profile'
import { useSubmitProfile } from '@/hooks/profile'
import { useProfileStore } from '@/stores/profileStore'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'

export const ProfileSetupPage: React.FC = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const { formData } = useProfileStore()

  const { mutate: submitProfile } = useSubmitProfile({
    onSuccess: () => {
      localStorage.setItem('nickname', formData.nickname.split('.')[0])
      setTimeout(() => {
        setShowModal(false)
        navigate('/', { state: { myProfile: formData } })
      }, 2000)
    },
  })

  const handleSubmit = () => {
    setShowModal(true)
    submitProfile(formData)
  }

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

      <ProfileSlider onSubmit={handleSubmit} />

      {showModal && (
        <Modal
          isOpen={showModal}
          closeOnBgClick={false}
          style="loading"
          message={['프로필을 생성하고 있습니다.', '잠시만 기다려주세요.']}
        />
      )}
    </div>
  )
}

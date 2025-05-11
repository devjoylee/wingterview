import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { ProfileFormLayout } from '@components/profile'
import { Pencil } from 'lucide-react'
import defaultImage from '@assets/default-profile.png'
import { useProfileStore } from '@/stores/profileStore'
import { ErrorMessage } from '@/components/common'

export const ProfileImageStep = () => {
  const { updateProfileImage } = useProfileStore()
  const [imageURL, setImageURL] = useState<string | null>(null)
  const [error, setError] = useState<string>('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      const file = e.target.files[0]

      // 유효성 검사는 File 타입으로 진행
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          setError('5MB 이하의 파일만 업로드가 가능합니다.')
          return
        }

        if (!['image/png', 'image/jpeg', 'image/png'].includes(file.type)) {
          setError('jpg, jpeg, png만 업로드가 가능합니다.')
          return
        }
      }

      // 유효성 검사 통과 시 File을 Url로 변환
      reader.onload = event => {
        const imageUrl = event.target?.result as string
        setImageURL(imageUrl)
        console.log('이미지 업로드 성공', file, imageUrl)
      }
      reader.readAsDataURL(file)
      setError('')
    }
  }

  useEffect(() => {
    updateProfileImage(imageURL)
  }, [imageURL, updateProfileImage])

  return (
    <ProfileFormLayout name="프로필 사진">
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          {error && <ErrorMessage error={error} />}
        </div>
        <div className={styles.imageWrapper}>
          <div className={styles.thumbnail}>
            <img src={imageURL || defaultImage} alt="프로필 사진" />
          </div>
          <label htmlFor="profile-upload" className={styles.editButton}>
            <Pencil size={20} color="white" />
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
          </label>
        </div>
      </div>
    </ProfileFormLayout>
  )
}

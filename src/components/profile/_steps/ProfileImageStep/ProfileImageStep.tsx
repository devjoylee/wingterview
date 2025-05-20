import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { ProfileFormLayout } from '@components/profile'
import { Pencil } from 'lucide-react'
import defaultImage from '@assets/default-profile.png'
import { useProfileStore } from '@/stores/profileStore'
import { ErrorMessage } from '@/components/common'
import { getPresignedURL, uploadImageToS3 } from '@/api/presignedAPI'
import { parseFileName } from '@/utils/parseFileName'

export const ProfileImageStep = () => {
  const { updateProfileImage, imageURL, setImageURL } = useProfileStore()
  const [imageName, setImageName] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      uploadImage(file) // 유효성 검사 통과 시 File을 S3로 전송

      reader.onload = event => {
        const url = event.target?.result as string
        setImageURL(url)
      }
      reader.readAsDataURL(file)
      setError('')
    }
  }

  const uploadImage = async (file: File) => {
    const filename = parseFileName(file)

    try {
      const presignedUrl = await getPresignedURL(filename) // 1. presigned url 요청
      await uploadImageToS3(presignedUrl, file) // 2.전달받은 url에 file 전송
      setImageName(filename) // 3.업로드한 file명 저장
    } catch (error) {
      setError('파일 업로드에 실패했습니다. 다시 시도해주세요.')
      console.error('업로드 실패:', error)
    }
  }

  useEffect(() => {
    updateProfileImage(imageName) // formData에는 image 파일명을 저장
  }, [imageName, updateProfileImage])

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

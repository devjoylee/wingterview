import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { Pencil } from 'lucide-react'
import { useProfileStore } from '@/stores/profileStore'
import { ErrorMessage, ProfileImage } from '@/components/ui'
import { parseFileName } from '@/utils/parseFileName'

export const ProfileImageStep = React.memo(() => {
  const { updateProfileImage, imageURL, setImageURL, formData, setImageFile } =
    useProfileStore()
  const [imageName, setImageName] = useState<string>(
    formData.profileImageUrl || ''
  )
  const [error, setError] = useState<string>('')

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      const file = e.target.files[0]
      const filename = parseFileName(file)

      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          setError('5MB 이하의 파일만 업로드가 가능합니다.')
          return
        }

        if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
          setError('jpg, jpeg, png만 업로드가 가능합니다.')
          return
        }
      }

      setImageFile(file)
      setImageName(filename)

      reader.onload = event => {
        const url = event.target?.result as string
        setImageURL(url)
      }
      reader.readAsDataURL(file)
      setError('')
    }
  }

  const handleThumbnailClick = () => {
    const fileInput = document.getElementById(
      'profile-upload'
    ) as HTMLInputElement
    fileInput?.click()
  }

  const handleResetImage = () => {
    setImageURL('')
    setImageFile(null)
    setImageName('')
    updateProfileImage('')
    setError('')

    const fileInput = document.getElementById(
      'profile-upload'
    ) as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  useEffect(() => {
    updateProfileImage(imageName)
  }, [imageName, updateProfileImage])

  return (
    <div className={styles.container}>
      <div className={styles.errorMessage}>
        {error && <ErrorMessage error={error} />}
      </div>
      <div className={styles.imageWrapper}>
        <div
          className={styles.thumbnail}
          onClick={handleThumbnailClick}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleThumbnailClick()
            }
          }}
        >
          <ProfileImage url={imageURL} size={160} />
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
      {imageURL && (
        <button onClick={handleResetImage} className={styles.reset}>
          사진 삭제
        </button>
      )}
    </div>
  )
})

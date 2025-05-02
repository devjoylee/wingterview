import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { ProfileCard } from '@components/profile'
import { Pencil } from 'lucide-react'
import defaultImage from '@assets/default-profile.png'
import { useProfileStore } from '@/stores/profileStore'

export const ProfileImageStep = () => {
  const { updateProfileImageUrl } = useProfileStore()
  const [newImage, setNewImage] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = event => {
        const imageUrl = event.target?.result as string
        setNewImage(imageUrl)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  useEffect(() => {
    updateProfileImageUrl(newImage)
  }, [newImage, updateProfileImageUrl])

  return (
    <ProfileCard name="프로필 사진">
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <div className={styles.thumbnail}>
            <img src={newImage ? newImage : defaultImage} alt="프로필 사진" />
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
    </ProfileCard>
  )
}

import React from 'react'
import defaultImage from '@assets/default-profile.png'
import styles from './styles.module.scss'

interface ProfileImageProps {
  url: string | null | undefined
  size?: number
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  url,
  size = 65,
}) => {
  return (
    <div className={styles.profileImage} style={{ width: size, height: size }}>
      <img
        src={url || defaultImage}
        alt="profile"
        onError={e => {
          const target = e.target as HTMLImageElement
          target.src = defaultImage
        }}
      />
    </div>
  )
}

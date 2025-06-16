import { LoginButton, Profile } from '@/components/ui'
import { useEffect, useState } from 'react'
import { useProfile } from '@/hooks'
import styles from './styles.module.scss'

interface MyProfileCardProps {
  isLoggedIn: boolean
}

export const MyProfileCard: React.FC<MyProfileCardProps> = ({ isLoggedIn }) => {
  const [myProfile, setMyProfile] = useState<ProfileCardData>({
    name: '',
    nickname: '',
    curriculum: '',
    jobInterest: [],
    techStack: [],
    profileImageUrl: null,
    isKTB: false,
    seatCode: '',
  })

  const { myData } = useProfile('get')

  useEffect(() => {
    if (myData) {
      setMyProfile({
        name: myData.name,
        nickname: myData.nickname,
        curriculum: myData.curriculum,
        jobInterest: myData.jobInterest,
        techStack: myData.techStack,
        profileImageUrl: myData.profileImageUrl,
        isKTB: myData.isKTB,
        seatCode: myData.seatCode || '',
      })
    }
  }, [myData])
  return (
    <div className={styles.profileCard}>
      {isLoggedIn ? (
        myProfile && <Profile profileData={myProfile} />
      ) : (
        <div className={styles.overlay}>
          <LoginButton />
        </div>
      )}
    </div>
  )
}

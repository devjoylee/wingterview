import styles from './styles.module.scss'
import { ProfileCard } from '@components/profile'
import { StaticTag } from '@/components/common'
import { MapPin } from 'lucide-react'
import defaultImage from '@assets/default-profile.png'

export const FinalConfirmStep = () => {
  const formData = {
    name: '이주영',
    nickname: 'joy.lee',
    curriculum: '풀스택',
    jobInterest: ['프론트 엔드 개발자', 'DevOps 엔지니어'],
    techStack: ['Java', 'Javascript', 'Python'],
    profileImageUrl: '',
    seatPosition: [3, 7],
  }

  return (
    <ProfileCard name="최종 프로필 확인">
      <div className={styles.container}>
        <div className={styles.profileHeader}>
          <div className={styles.thumbnail}>
            <img
              src={
                formData.profileImageUrl
                  ? formData.profileImageUrl
                  : defaultImage
              }
              alt="프로필 사진"
            />
          </div>

          <h2 className={styles.name}>
            {formData.nickname} ({formData.name}) / {formData.curriculum}
          </h2>

          <div className={styles.seat}>
            <MapPin size={16} />
            <span>A-03-M</span>
          </div>
        </div>

        <div className={styles.profileBody}>
          <div className={styles.section}>
            <h3 className={styles.title}>희망 직무</h3>
            <div className={styles.tagList}>
              {formData.jobInterest.map((job, index) => (
                <StaticTag key={index} label={job} />
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.title}>기술 스택</h3>
            <div className={styles.tagList}>
              {formData.techStack.map((tech, index) => (
                <StaticTag key={index} label={tech} dark />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProfileCard>
  )
}

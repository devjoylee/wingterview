import React from 'react'
import styles from './styles.module.scss'
import { ProfileImage, StaticTag } from '@/components/ui'
import { MapPin } from 'lucide-react'
import { useProfileStore } from '@/stores/profileStore'

export const FinalConfirmStep = React.memo(() => {
  const { formData, selectedSeat, imageURL } = useProfileStore()

  const {
    section,
    seat: [row, col],
  } = selectedSeat

  const rowToString = (row as number) <= 9 ? `0${row}` : row
  const colToString = ['L', 'M', 'R'][(col as number) - 1]
  const seatCode = `${section}-${rowToString}-${colToString}`

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <div className={styles.thumbnail}>
          <ProfileImage url={imageURL} size={70} />
        </div>

        <div className={styles.myInfo}>
          <h2 className={styles.name}>
            {formData.nickname} ({formData.name}) / {formData.curriculum}
          </h2>

          <div className={styles.seat}>
            <MapPin size={12} />
            <span>{seatCode}</span>
          </div>
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
  )
})

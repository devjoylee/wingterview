import React from 'react'
import styles from './styles.module.scss'
import { Profile } from '@/components/ui'
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
      <Profile
        profileData={{ ...formData, seatCode, profileImageUrl: imageURL }}
      />
    </div>
  )
})

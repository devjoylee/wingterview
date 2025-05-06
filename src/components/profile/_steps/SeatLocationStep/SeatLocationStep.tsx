import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ProfileCard } from '@components/profile'
import { ErrorMessage } from '@/components/common'
import { SeatMap, SeatInfoCard } from '@/components/seat'
import { useProfileStore } from '@/stores/profileStore'
import styles from './styles.module.scss'

export const SeatLocationStep = () => {
  const { updateSeatPosition, selectedSeat, formErrors } = useProfileStore()
  const [showSeatMap, setShowSeatMap] = useState(false)

  const openSeatMap = () => setShowSeatMap(true)
  const closeSeatMap = () => setShowSeatMap(false)

  useEffect(() => {
    updateSeatPosition(selectedSeat)
  }, [selectedSeat, updateSeatPosition])

  return (
    <ProfileCard name="현재 위치 설정">
      <div className={styles.container}>
        {formErrors.seatPosition && (
          <ErrorMessage error={formErrors.seatPosition} />
        )}
        <span className={styles.instruction}>
          아래 좌석 배치도 보기 버튼을 눌러 <br />
          본인의 자리를 지정해주세요.
        </span>

        <SeatInfoCard
          selectedSeat={selectedSeat}
          handleClick={openSeatMap}
          buttonLabel="자리 배치도 보기"
        />
      </div>

      {showSeatMap &&
        createPortal(<SeatMap closeSeatMap={closeSeatMap} />, document.body)}
    </ProfileCard>
  )
}

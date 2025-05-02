import { useState } from 'react'
import { createPortal } from 'react-dom'
import { ProfileCard } from '@components/profile'
import { SeatMap } from '@/components/common'
import styles from './styles.module.scss'
import { useProfileStore } from '@/stores/profileStore'

export const SeatLocationStep = () => {
  const { updateSeatPosition } = useProfileStore()

  const [selectedSeat, setSelectedSeat] = useState<Seat>({
    section: '?',
    line: '?',
    seat: '?',
  })

  const [showSeatMap, setShowSeatMap] = useState(false)

  const openSeatMap = () => setShowSeatMap(true)
  const closeSeatMap = () => setShowSeatMap(false)

  const handleSeatSelect = (seat: Seat) => {
    setSelectedSeat(seat)

    const row = parseInt(seat.line as string) || 0
    const col = parseInt(seat.seat as string) || 0
    updateSeatPosition([row, col])
  }

  return (
    <ProfileCard name="현재 위치 설정">
      <div className={styles.container}>
        <span className={styles.instruction}>
          아래 좌석 배치도 보기 버튼을 눌러 <br />
          본인의 자리를 지정해주세요.
        </span>

        <div className={styles.seatInfoCard}>
          <div className={styles.wrapper}>
            <div className={styles.seatInfo}>
              <span className={styles.value}>{selectedSeat.section}</span>
              <span className={styles.label}>분단</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.seatInfo}>
              <span className={styles.value}>{selectedSeat.line}</span>
              <span className={styles.label}>번째 줄</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.seatInfo}>
              <span className={styles.value}>{selectedSeat.seat}</span>
              <span className={styles.label}>자리</span>
            </div>
          </div>

          <button className={styles.seatMapButton} onClick={openSeatMap}>
            좌석 배치도 보기
          </button>
        </div>
      </div>

      {showSeatMap &&
        createPortal(
          <SeatMap
            selectedSeat={selectedSeat}
            setSelectedSeat={handleSeatSelect}
            closeSeatMap={closeSeatMap}
          />,
          document.body
        )}
    </ProfileCard>
  )
}

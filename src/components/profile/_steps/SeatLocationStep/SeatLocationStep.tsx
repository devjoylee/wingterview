import { useState } from 'react'
import { createPortal } from 'react-dom'
import { ProfileCard } from '@components/profile'
import { SeatMap } from '@/components/common'
import { useProfileStore } from '@/stores/profileStore'
import styles from './styles.module.scss'

export const SeatLocationStep = () => {
  const { updateSeatPosition, selectedSeat, setSelectedSeat } =
    useProfileStore()

  const { section, seat } = selectedSeat

  const [showSeatMap, setShowSeatMap] = useState(false)

  const openSeatMap = () => setShowSeatMap(true)
  const closeSeatMap = () => setShowSeatMap(false)

  const seatName = ['왼쪽', '중간', '오른쪽'][(seat[1] as number) - 1]

  const handleSeatSelect = (seatData: Seat) => {
    setSelectedSeat(seatData)
    updateSeatPosition(seatData)
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
              <span className={styles.value}>{section || '?'}</span>
              <span className={styles.label}>분단</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.seatInfo}>
              <span className={styles.value}>{seat[0] || '?'}</span>
              <span className={styles.label}>번째 줄</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.seatInfo}>
              <span className={styles.value}>{seatName || '?'}</span>
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

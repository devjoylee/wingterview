import { useRef, useState } from 'react'
import { X } from 'lucide-react'
import { SeatInfoCard, SeatMapSection } from '@components/seat'
import { ErrorMessage } from '@/components/common'
import { blockSeat, checkSeatOccupied } from '@/api/seatAPI'
import { useProfileStore } from '@/stores/profileStore'
import { useSeatMapData } from '@/hooks'
import styles from './styles.module.scss'

interface SeatMapProps {
  closeSeatMap: () => void
}

export const SeatMap = ({ closeSeatMap }: SeatMapProps) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const { selectedSeat, setSelectedSeat } = useProfileStore()
  const { data: seatMapData } = useSeatMapData()

  const [error, setError] = useState<string | null>(null)

  console.log(seatMapData ? seatMapData : 'seatMapData 로딩 실패')

  const {
    section,
    seat: [row, col],
  } = selectedSeat

  const seatId = `${section}-${row}-${col}`

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeSeatMap()
    }
  }

  const handleSeatSelect = async ({ section, row, col }: SeatParams) => {
    setSelectedSeat({
      section,
      seat: [row + 1, col + 1],
    })

    try {
      const isOccupiedByOther = await checkSeatOccupied(seatId)

      if (isOccupiedByOther) {
        setError('이미 다른 사람이 선택한 자리입니다.')
        return
      }

      setError(null)
    } catch (error) {
      console.error('자리 확인 중 오류 발생:', error)
      // setError('자리 확인 중 오류가 발생했습니다.')
    }
  }

  const confirmMySeat = async () => {
    if (!selectedSeat || !selectedSeat.section) {
      setError('자리가 선택되지 않았습니다.')
      return
    }

    try {
      await blockSeat(seatId)
      setError(null)
      closeSeatMap()
    } catch (error) {
      console.error('자리 선택 중 오류 발생:', error)
      // setError('자리 선택 중 오류가 발생했습니다.')
    }
  }

  const isSeletedByMe = ({ section, row, col }: SeatParams) =>
    selectedSeat.section === section &&
    selectedSeat.seat[0] === row + 1 &&
    selectedSeat.seat[1] === col + 1

  return (
    <div className={styles.seatMapOverlay} onClick={handleOverlayClick}>
      <div className={styles.seatMapModal} ref={contentRef}>
        <button onClick={closeSeatMap} className={styles.closeButton}>
          <X size={20} />
        </button>

        <div className={styles.entrance}>ENTRANCE</div>

        <div className={styles.scrollContainer}>
          <div className={styles.seatSections}>
            {['A', 'B', 'C'].map(section => (
              <SeatMapSection
                key={section}
                section={section}
                isSeletedByMe={isSeletedByMe}
                handleSeatSelect={handleSeatSelect}
              />
            ))}
          </div>
        </div>

        <div className={styles.infoCardContainer}>
          {error && (
            <div className={styles.errorMessage}>
              <ErrorMessage error={error} />
            </div>
          )}
          <SeatInfoCard
            selectedSeat={selectedSeat}
            handleClick={confirmMySeat}
            buttonLabel="자리 선택 완료"
          />
        </div>
      </div>
    </div>
  )
}

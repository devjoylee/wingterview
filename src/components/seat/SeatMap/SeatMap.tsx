import { useEffect, useRef, useState } from 'react'
import { SeatInfoCard, SeatMapSection } from '@components/seat'
import { ErrorMessage } from '@/components/common'
import { blockSeat } from '@/api/seatAPI'
import { useProfileStore } from '@/stores/profileStore'
import { useCheckSeatState, useSeatMapData } from '@/hooks/seat'
import styles from './styles.module.scss'
import { X } from 'lucide-react'

interface SeatMapProps {
  closeSeatMap: () => void
}

export const SeatMap = ({ closeSeatMap }: SeatMapProps) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const { selectedSeat, setSelectedSeat } = useProfileStore()
  const { data: seatMapData } = useSeatMapData()

  const [error, setError] = useState<string | null>(null)
  const [seatId, setSeatId] = useState<string>('')

  const { refetch: checkIfOccupied } = useCheckSeatState(seatId)

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeSeatMap()
    }
  }

  const handleSeatSelect = async ({ section, row, col }: SeatParams) => {
    const clickedSeatId = `${section}-${row}-${col}`
    if (seatId === clickedSeatId) return

    setSelectedSeat({
      section,
      seat: [row, col],
    })

    setSeatId(clickedSeatId)

    try {
      const { data: isOccupiedByOther } = await checkIfOccupied()

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
      closeSeatMap()
      setError(null)
    } catch (error) {
      console.error('자리 선택 중 오류 발생:', error)
      // setError('자리 선택 중 오류가 발생했습니다.')
    }
  }

  const isSeletedByMe = ({ section, row, col }: SeatParams) =>
    selectedSeat.section === section &&
    selectedSeat.seat[0] === row &&
    selectedSeat.seat[1] === col

  useEffect(() => {
    console.log(seatMapData ? seatMapData : 'seatMapData 로딩 실패')
  }, [seatMapData])

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

import { useEffect, useRef, useState } from 'react'
import { SeatInfoCard, SeatMapSection } from '@components/seat'
import { ErrorMessage } from '@/components/common'
import { blockSeat } from '@/api/seatAPI'
import { useProfileStore } from '@/stores/profileStore'
import { useCheckSeatState, useSeatMapData } from '@/hooks/seat'
import { parseSeatCode } from '@/utils/parseSeatCode'
import styles from './styles.module.scss'
import { X } from 'lucide-react'

interface SeatMapProps {
  closeSeatMap: () => void
  isEditable?: boolean
  seatCode?: string
}

export const SeatMap = ({
  closeSeatMap,
  isEditable,
  seatCode,
}: SeatMapProps) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const { selectedSeat, setSelectedSeat } = useProfileStore()
  const { data: seatMapData } = useSeatMapData()

  const [error, setError] = useState<string | null>(null)
  const [seatId, setSeatId] = useState<string>('')

  const [highlightedSeat, setHighlightedSeat] = useState<{
    section: string
    row: number
    col: number
  } | null>(null)

  const { refetch: checkIfOccupied } = useCheckSeatState(seatId)

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeSeatMap()
    }
  }

  const handleSeatSelect = async ({ section, row, col }: SeatParams) => {
    if (!isEditable) return

    const clickedSeatId = `${section}-${row}-${col}`
    if (seatId === clickedSeatId) return

    setSelectedSeat({
      section,
      seat: [row, col],
    })

    await setSeatId(clickedSeatId)

    const { data: isOccupiedByOther } = await checkIfOccupied()

    if (isOccupiedByOther) {
      setError('이미 다른 사람이 선택한 자리입니다.')
      return
    }
    setError(null)
  }

  const confirmMySeat = async () => {
    if (!selectedSeat || !selectedSeat.section) {
      setError('자리가 선택되지 않았습니다.')
      return
    }

    await blockSeat(seatId)
    closeSeatMap()
    setError(null)
  }

  const isSelectedByMe = ({ section, row, col }: SeatParams) =>
    selectedSeat?.section === section &&
    selectedSeat?.seat[0] === row &&
    selectedSeat?.seat[1] === col

  const isHighlighted = ({ section, row, col }: SeatParams) =>
    highlightedSeat?.section === section &&
    highlightedSeat?.row === row &&
    highlightedSeat?.col === col

  useEffect(() => {
    if (seatCode) {
      const parsedSeat = parseSeatCode(seatCode)
      if (parsedSeat) {
        setHighlightedSeat(parsedSeat)
      }
    }
  }, [seatCode])

  return (
    <div className={styles.seatMapOverlay} onClick={handleOverlayClick}>
      <div className={styles.seatMapModal} ref={contentRef}>
        <button onClick={closeSeatMap} className={styles.closeButton}>
          <X size={20} />
        </button>

        <div className={styles.entrance}>ENTRANCE</div>

        <div
          className={`${styles.scrollContainer} ${
            isEditable ? styles.padding : ''
          }`}
        >
          <div className={styles.seatSections}>
            {['A', 'B', 'C'].map(section => (
              <SeatMapSection
                key={section}
                section={section}
                seatMapData={isEditable ? seatMapData : undefined}
                isSelectedByMe={isSelectedByMe}
                isHighlighted={isHighlighted}
                handleSeatSelect={handleSeatSelect}
              />
            ))}
          </div>
        </div>

        {isEditable && (
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
        )}
      </div>
    </div>
  )
}

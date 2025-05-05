import { useRef } from 'react'
import { X } from 'lucide-react'
import styles from './styles.module.scss'
import { SeatMapSection } from '@components/seat'
import { useProfileStore } from '@/stores/profileStore'

interface SeatMapProps {
  closeSeatMap: () => void
}

export const SeatMap = ({ closeSeatMap }: SeatMapProps) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const { selectedSeat, setSelectedSeat } = useProfileStore()

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeSeatMap()
    }
  }

  const handleSeatSelect = ({ section, row, col }: SeatParams) => {
    setSelectedSeat({
      section,
      seat: [row + 1, col + 1],
    })
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
      </div>
    </div>
  )
}

import { useRef } from 'react'
import { X } from 'lucide-react'
import styles from './styles.module.scss'

interface SeatMapProps {
  selectedSeat: SeatType
  setSelectedSeat: (seat: SeatType) => void
  closeSeatMap: () => void
}

export const SeatMap = ({
  selectedSeat,
  setSelectedSeat,
  closeSeatMap,
}: SeatMapProps) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeSeatMap()
    }
  }

  const handleSeatClick = (section: string, line: string, seat: string) => {
    setSelectedSeat({ section, line, seat })
  }

  const seatNames = ['L', 'M', 'R']

  const renderSection = (sectionName: string) => {
    const lines = 18
    const seats = 3

    return (
      <section className={styles.section}>
        <h3 className={styles.sectionName}>{sectionName}</h3>
        <div className={styles.container}>
          {Array.from({ length: lines }, (_, lineIndex) => (
            <div
              key={`${sectionName}-line-${lineIndex}`}
              className={styles.line}
            >
              <div className={styles.index}>{lineIndex + 1}</div>
              {Array.from({ length: seats }, (_, seatIndex) => {
                const seatName = seatNames[seatIndex]
                const isSeleted =
                  selectedSeat?.section === sectionName &&
                  selectedSeat?.line === (lineIndex + 1).toString() &&
                  selectedSeat?.seat === seatName
                return (
                  <div
                    key={`${sectionName}-seat-${lineIndex}-${seatIndex}`}
                    className={`${styles.seat} ${
                      isSeleted ? styles.selected : ''
                    }`}
                    onClick={() =>
                      handleSeatClick(
                        sectionName,
                        (lineIndex + 1).toString(),
                        seatName
                      )
                    }
                  >
                    {seatName}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <div className={styles.seatMapOverlay} onClick={handleOverlayClick}>
      <div className={styles.seatMapModal} ref={contentRef}>
        <button onClick={closeSeatMap} className={styles.closeButton}>
          <X size={20} />
        </button>

        <div className={styles.entrance}>ENTRANCE</div>

        <div className={styles.scrollContainer}>
          <div className={styles.seatSections}>
            {renderSection('A')}
            {renderSection('B')}
            {renderSection('C')}
          </div>
        </div>
      </div>
    </div>
  )
}

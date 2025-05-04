import { useRef } from 'react'
import { X } from 'lucide-react'
import styles from './styles.module.scss'

interface SeatMapProps {
  selectedSeat: Seat
  setSelectedSeat: (seat: Seat) => void
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

  const handleSeatClick = (section: string, row: number, col: number) => {
    setSelectedSeat({
      section,
      seat: [row + 1, col + 1],
    })
  }

  console.log(selectedSeat)

  const renderSection = (sectionName: string) => {
    const row = 18
    const col = 3

    return (
      <section className={styles.section}>
        <h3 className={styles.sectionName}>{sectionName}</h3>
        <div className={styles.container}>
          {Array.from({ length: row }, (_, rowIdx) => (
            <div key={`${sectionName}-${rowIdx}`} className={styles.line}>
              <div className={styles.index}>{rowIdx + 1}</div>

              {Array.from({ length: col }, (_, colIdx) => {
                const isSeleted =
                  selectedSeat?.section === sectionName &&
                  selectedSeat?.seat[0] === rowIdx + 1 &&
                  selectedSeat?.seat[1] === colIdx + 1
                return (
                  <div
                    key={`${sectionName}-${rowIdx}-${colIdx}`}
                    className={`${styles.seat} ${
                      isSeleted ? styles.selected : ''
                    }`}
                    onClick={() => handleSeatClick(sectionName, rowIdx, colIdx)}
                  >
                    {['L', 'M', 'R'][colIdx]}
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

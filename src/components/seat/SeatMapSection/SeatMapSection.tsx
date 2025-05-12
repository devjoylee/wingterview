import styles from './styles.module.scss'

interface SeatMapSectionProps {
  section: string
  seatMapData: SeatMapData | undefined
  isSelectedByMe: ({ section, row, col }: SeatParams) => boolean
  isHighlighted: ({ section, row, col }: SeatParams) => boolean
  handleSeatSelect: ({ section, row, col }: SeatParams) => void
}

export const SeatMapSection = ({
  section,
  seatMapData,
  isSelectedByMe,
  isHighlighted,
  handleSeatSelect,
}: SeatMapSectionProps) => {
  const ryans = [
    { name: 'A', section: 'C', row: 2 },
    { name: 'B', section: 'C', row: 7 },
    { name: 'C', section: 'C', row: 13 },
    { name: 'D', section: 'A', row: 2 },
    { name: 'E', section: 'A', row: 7 },
    { name: 'F', section: 'A', row: 13 },
  ]

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionName}>{section}</h3>
      <div className={styles.lineContainer}>
        {Array.from({ length: 18 }, (_, idx) => {
          const row = idx + 1
          const ryan = ryans.find(r => r.section === section && r.row === row)

          return (
            <div key={`${section}-${row}`} className={styles.line}>
              {section !== 'B' && (
                <div className={styles.lineNumber}>{row}</div>
              )}

              <div className={styles.seatWrapper}>
                {Array.from({ length: 3 }, (_, idx) => {
                  const col = idx + 1
                  const isOccupied =
                    seatMapData?.seats[section.toLowerCase()]?.[row - 1]?.[
                      col - 1
                    ]

                  let classname = styles.seat
                  if (isOccupied) classname += ` ${styles.occupied}`
                  if (seatMapData && isSelectedByMe({ section, row, col }))
                    classname += ` ${styles.selected}`
                  if (isHighlighted({ section, row, col }))
                    classname += ` ${styles.highlighted}`
                  if (!seatMapData) classname += ` ${styles.noData}`

                  return (
                    <div
                      key={`${section}-${row}-${col}`}
                      className={classname}
                      onClick={() =>
                        !isOccupied && handleSeatSelect({ section, row, col })
                      }
                    ></div>
                  )
                })}
              </div>

              {ryan ? (
                <div className={styles.ryan}>
                  RYAN <span>{ryan.name}</span>
                </div>
              ) : (
                <div className={styles.spacer}></div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

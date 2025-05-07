import styles from './styles.module.scss'

interface SeatMapSectionProps {
  section: string
  isSeletedByMe: ({ section, row, col }: SeatParams) => boolean
  handleSeatSelect: ({ section, row, col }: SeatParams) => void
}

export const SeatMapSection = ({
  section,
  isSeletedByMe,
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
                  return (
                    <div
                      key={`${section}-${row}-${col}`}
                      className={`${styles.seat} ${
                        isSeletedByMe({ section, row, col })
                          ? styles.selected
                          : ''
                      }`}
                      onClick={() => handleSeatSelect({ section, row, col })}
                    >
                      {['L', 'M', 'R'][col - 1]}
                    </div>
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

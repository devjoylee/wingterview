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
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionName}>{section}</h3>
      <div className={styles.container}>
        {Array.from({ length: 18 }, (_, row) => (
          <div key={`${section}-${row}`} className={styles.line}>
            <div className={styles.index}>{row + 1}</div>

            {Array.from({ length: 3 }, (_, col) => (
              <div
                key={`${section}-${row}-${col}`}
                className={`${styles.seat} ${
                  isSeletedByMe({ section, row, col }) ? styles.selected : ''
                }`}
                onClick={() => handleSeatSelect({ section, row, col })}
              >
                {['L', 'M', 'R'][col]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

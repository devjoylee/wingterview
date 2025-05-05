import styles from './styles.module.scss'

interface SeatInfoCardProps {
  selectedSeat: SeatData
  handleClick?: () => void
  buttonLabel?: string
}

export const SeatInfoCard = ({
  selectedSeat,
  handleClick,
  buttonLabel,
}: SeatInfoCardProps) => {
  const {
    section,
    seat: [row, col],
  } = selectedSeat
  const seatName = ['왼쪽', '중간', '오른쪽'][(col as number) - 1]

  return (
    <div className={styles.seatInfoCard}>
      <div className={styles.wrapper}>
        <div className={styles.seatInfo}>
          <span className={styles.value}>{section || '?'}</span>
          <span className={styles.label}>분단</span>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.seatInfo}>
          <span className={styles.value}>{row || '?'}</span>
          <span className={styles.label}>번째 줄</span>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.seatInfo}>
          <span className={styles.value}>{seatName || '?'}</span>
          <span className={styles.label}>자리</span>
        </div>
      </div>

      <button className={styles.cardButton} onClick={handleClick}>
        {buttonLabel}
      </button>
    </div>
  )
}

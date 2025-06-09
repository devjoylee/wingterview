import React from 'react'
import styles from './styles.module.scss'

interface Props {
  percentage: number
  label?: string
}

export const CircleProgressBar: React.FC<Props> = ({ percentage, label }) => {
  return (
    <div className={styles.progressBar}>
      <svg viewBox="0 0 36 36">
        <path
          className={styles.barBG}
          d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className={styles.barActive}
          strokeDasharray={`${percentage}, 100`}
          d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>

      <p className={styles.percentage}>
        {percentage.toFixed(1)} <span>%</span>
      </p>
      {label && <div className={styles.label}>{label}</div>}
    </div>
  )
}

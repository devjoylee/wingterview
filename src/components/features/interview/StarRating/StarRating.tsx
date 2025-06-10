import React, { useState } from 'react'
import styles from './styles.module.scss'

export const StarRating: React.FC = () => {
  const [rating, setRate] = useState(0)

  const handleClick = (idx: number) => {
    setRate(idx + 1)
  }

  return (
    <div className={styles.ratingStars}>
      {[...Array(5)].map((_, idx) => (
        <span
          key={idx}
          className={idx < rating ? styles.filled : styles.empty}
          onClick={() => handleClick(idx)}
        >
          ★
        </span>
      ))}
    </div>
  )
}

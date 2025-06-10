import React, { useState } from 'react'
import { Archive, ArchiveX } from 'lucide-react'
import styles from './styles.module.scss'

type FilterType = 'all' | 'incorrect'

export const QuizFilterButton: React.FC = () => {
  const [active, setActive] = useState<FilterType>('all')

  const handleClick = (filter: FilterType) => {
    setActive(filter)
  }

  return (
    <div className={styles.buttonContainer}>
      <button
        className={`${styles.all} ${active === 'all' ? styles.active : ''}`}
        onClick={() => handleClick('all')}
      >
        <Archive />
        <span>전체 퀴즈 보기</span>
      </button>
      <button
        className={`${styles.incorrect} ${active === 'incorrect' ? styles.active : ''}`}
        onClick={() => handleClick('incorrect')}
      >
        <ArchiveX />
        <span>오답만 모아보기</span>
      </button>
    </div>
  )
}

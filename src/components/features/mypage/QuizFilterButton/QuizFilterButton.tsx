import React from 'react'
import { Archive, ArchiveX } from 'lucide-react'
import styles from './styles.module.scss'

interface Props {
  isFiltered: boolean
  setIsFiltered: (isFiltered: boolean) => void
}

export const QuizFilterButton: React.FC<Props> = ({
  isFiltered,
  setIsFiltered,
}) => {
  return (
    <div className={styles.buttonContainer}>
      <button
        className={`${styles.all} ${!isFiltered ? styles.active : ''}`}
        onClick={() => setIsFiltered(false)}
      >
        <Archive />
        <span>전체 퀴즈 보기</span>
      </button>
      <button
        className={`${styles.incorrect} ${isFiltered ? styles.active : ''}`}
        onClick={() => setIsFiltered(true)}
      >
        <ArchiveX />
        <span>오답만 모아보기</span>
      </button>
    </div>
  )
}

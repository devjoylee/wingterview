import React from 'react'
// import { Badge } from 'lucide-react'
import styles from './styles.module.scss'

interface Props {
  level: '상' | '중' | '하' | undefined
}

export const QuizLevel: React.FC<Props> = ({ level }) => {
  const palette = (level?: string) => {
    switch (level) {
      case '상':
        return styles.red
      case '중':
        return styles.orange
      case '하':
        return styles.blue
      default:
        return styles.gray
    }
  }

  return (
    <div className={`${styles.level} ${palette(level)}`}>
      {/* <Badge className={styles.icon} /> */}
      난이도 <span className={styles.badge}>{level}</span>
    </div>
  )
}

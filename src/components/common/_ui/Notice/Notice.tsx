import { ReactNode, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import styles from './styles.module.scss'

interface NoticeProps {
  children: ReactNode
}

export const Notice: React.FC<NoticeProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.notice}>
      <div className={styles.title} onClick={toggleOpen}>
        <h3>NOTICE</h3>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      <div className={`${styles.content} ${isOpen ? styles.open : ''}`}>
        {isOpen && children}
      </div>
    </div>
  )
}

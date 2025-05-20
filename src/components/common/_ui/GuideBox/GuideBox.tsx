import { ReactNode, useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import styles from './styles.module.scss'

interface GuideBoxProps {
  children: ReactNode
}

export const GuideBox: React.FC<GuideBoxProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.guideBox}>
      <div className={styles.title} onClick={toggleOpen}>
        <div className={styles.textWrapper}>
          <HelpCircle size={18} />
          <h3>윙터뷰 진행 TIP</h3>
        </div>
        <div className={styles.arrowIcon}>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>
      <div className={`${styles.content} ${isOpen ? styles.open : ''}`}>
        {isOpen && children}
      </div>
    </div>
  )
}

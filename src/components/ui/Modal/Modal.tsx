import { ReactNode, useEffect, useState } from 'react'
import { LoadingIndicator } from '@/components/ui'
import { PartyPopper, X } from 'lucide-react'
import failedEmoji from '@assets/sad.png'
import styles from './styles.module.scss'

interface ModalProps {
  isOpen: boolean
  children?: ReactNode
  message: string[]
  style: 'loading' | 'failed' | 'congrats'
  closable?: boolean
  toggleModal?: () => void
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  message,
  style,
  closable,
  toggleModal,
}) => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setScrollY(window.scrollY)
    }
  }, [isOpen, scrollY])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closable && toggleModal && e.target === e.currentTarget) {
      toggleModal()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleOverlayClick}
      style={{ top: `${scrollY}px` }}
    >
      <div className={`${styles.modal} ${styles[style]}`}>
        {closable && (
          <button className={styles.closeButton} onClick={toggleModal}>
            <X size={20} />
          </button>
        )}
        <div className={styles.modalHeader}>
          {style === 'loading' && <LoadingIndicator size={60} />}
          {style === 'failed' && <img src={failedEmoji} alt="failed icon" />}
          {style === 'congrats' && <PartyPopper width={50} height={50} />}
        </div>

        <div className={styles.modalMessage}>
          {message.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>

        {children}
      </div>
    </div>
  )
}

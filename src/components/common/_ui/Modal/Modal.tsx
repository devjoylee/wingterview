import React, { useState, ReactNode } from 'react'
import { LoadingIndicator } from '@/components/common'
import { PartyPopper } from 'lucide-react'
import failedEmoji from '@assets/sad.png'
import styles from './styles.module.scss'

interface ModalProps {
  isOpen: boolean
  children?: ReactNode
  message: string[]
  style: 'loading' | 'failed' | 'congrats'
  closeOnBgClick?: boolean
  hasYesNo?: boolean
  onYesClick?: () => void
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  message,
  style,
  closeOnBgClick = true,
  hasYesNo = false,
  onYesClick,
}) => {
  const [closeModal, setCloseModal] = useState(false)

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBgClick && e.target === e.currentTarget) {
      setCloseModal(true)
    }
  }

  if (!isOpen || closeModal) return null

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={`${styles.modal} ${styles[style]}`}>
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

        {hasYesNo && (
          <div className={styles.modalButtons}>
            <button onClick={onYesClick}>YES</button>
            <button onClick={() => setCloseModal(true)}>NO</button>
          </div>
        )}
      </div>
    </div>
  )
}

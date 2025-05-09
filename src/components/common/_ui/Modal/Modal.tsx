import React, { ReactNode } from 'react'
import { LoadingIndicator } from '@/components/common'
import failedEmoji from '@assets/sad.png'
import styles from './styles.module.scss'

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  children?: ReactNode
  message: string[]
  style: 'loading' | 'failed'
  closeOnBgClick?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  message,
  style,
  closeOnBgClick = true,
}) => {
  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBgClick && e.target === e.currentTarget && onClose) {
      onClose()
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={`${styles.modal} ${styles[style]}`}>
        <div className={styles.modalHeader}>
          {style === 'loading' && <LoadingIndicator size={60} />}
          {style === 'failed' && <img src={failedEmoji} alt="failed icon" />}
        </div>

        <div className={styles.modalContent}>
          {message.map((line, idx) => (
            <p key={idx} className={styles.modalMessage}>
              {line}
            </p>
          ))}
          {children}
        </div>
      </div>
    </div>
  )
}

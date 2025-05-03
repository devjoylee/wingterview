import React from 'react'
import styles from './styles.module.scss'
import { CircleAlert } from 'lucide-react'

interface ErrorMessageProps {
  error: string
  size?: 'small'
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, size }) => {
  if (!error) return null

  return (
    <div
      className={`${styles.errorMessage} ${size === 'small' ? styles.small : ''}`}
    >
      <CircleAlert />
      <p>{error}</p>
    </div>
  )
}

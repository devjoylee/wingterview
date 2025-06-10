import React, { useEffect, useRef } from 'react'
import { useTimerStore } from '@/stores/timerStore'
import { Timer as TimerIcon } from 'lucide-react'
import styles from './styles.module.scss'

interface TimerProps {
  onTimerEnd?: () => void
}

export const Timer: React.FC<TimerProps> = ({ onTimerEnd }) => {
  const { isActive, time } = useTimerStore()
  const endTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isActive) {
      endTimeRef.current = null
      return
    }

    if (endTimeRef.current === null) {
      endTimeRef.current =
        Date.now() + (time.minutes * 60 + time.seconds) * 1000
    }

    const timer = setInterval(() => {
      if (!endTimeRef.current) return

      const now = Date.now()
      const remaining = Math.max(0, endTimeRef.current - now)
      const totalSeconds = Math.ceil(remaining / 1000)
      const minutes = Math.floor(totalSeconds / 60)
      const seconds = totalSeconds % 60

      useTimerStore.setState({ time: { minutes, seconds } })

      if (totalSeconds <= 0) {
        clearInterval(timer)
        useTimerStore.setState({ isActive: false })
        endTimeRef.current = null
        if (onTimerEnd) onTimerEnd()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, onTimerEnd])

  return (
    <div className={styles.container}>
      <TimerIcon />
      <div className={styles.timer}>
        00:
        {String(time.minutes).padStart(2, '0')}:
        {String(time.seconds).padStart(2, '0')}
      </div>
    </div>
  )
}

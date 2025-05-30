import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { Logo } from '@/components/common'
import { Timer } from '@/components/interview'
import { useRecordingStore } from '@/stores'
import styles from './styles.module.scss'

export const AIInterviewLayout: React.FC = () => {
  const { mediaRecorder, addAudioChunk } = useRecordingStore()

  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.ondataavailable = event => {
        if (event.data && event.data.size > 0) {
          addAudioChunk(event.data)
        }
      }

      mediaRecorder.onerror = event => {
        console.error('MediaRecorder 오류:', event)
      }
    }
  }, [mediaRecorder, addAudioChunk])

  return (
    <div className={styles.interviewLayout}>
      <div className={styles.pageHeader}>
        <div className={styles.logoWrapper}>
          <Logo width={60} color="light" />
        </div>
        <div className={styles.timerWrapper}>
          <Timer />
        </div>
      </div>
      <div className={styles.pageContent}>
        <Outlet />
      </div>
    </div>
  )
}

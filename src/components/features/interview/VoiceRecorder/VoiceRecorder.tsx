import styles from './styles.module.scss'

export const VoiceRecorder: React.FC = () => {
  return (
    <div className={styles.voiceRecorder}>
      <div className={styles.controls}> 🔴 녹음 중...</div>
    </div>
  )
}

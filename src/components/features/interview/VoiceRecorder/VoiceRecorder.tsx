import styles from './styles.module.scss'
import recordingGif from '@/assets/recording.gif'

export const VoiceRecorder: React.FC = () => {
  return (
    <div className={styles.voiceRecorder}>
      <img src={recordingGif} alt="recording" className={styles.recordingGif} />
      <img src={recordingGif} alt="recording" className={styles.recordingGif} />
    </div>
  )
}

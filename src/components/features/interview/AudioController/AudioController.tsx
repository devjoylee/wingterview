import { Volume2, Play, Pause } from 'lucide-react'
import styles from './styles.module.scss'

interface AudioControllerProps {
  isRecording: boolean
  audioLevel: number
  hasLevelBar: boolean
  onPlay: () => void
  onStop: () => void
}

export const AudioController: React.FC<AudioControllerProps> = ({
  isRecording,
  audioLevel,
  hasLevelBar,
  onPlay,
  onStop,
}) => {
  return (
    <div className={styles.controller}>
      {isRecording ? (
        <button className={styles.stopButton} onClick={onStop}>
          <Pause size={20} className={styles.icon} />
        </button>
      ) : (
        <button className={styles.playButton} onClick={onPlay}>
          <Play size={20} className={styles.icon} />
        </button>
      )}

      <div className={styles.audioLevel}>
        <Volume2 size={20} />
        {hasLevelBar ? (
          <div className={styles.levelBar}>
            <div
              className={styles.active}
              style={{ width: `${Math.min(Math.max(audioLevel, 0), 100)}%` }}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

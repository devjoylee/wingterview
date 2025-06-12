import { useRef } from 'react'
import styles from './styles.module.scss'

interface Props {
  audioURL: string
}

export const AudioPlayer: React.FC<Props> = ({ audioURL }) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  return (
    <div className={styles.audioPlayer}>
      <audio ref={audioRef} controls>
        <source src={audioURL} type="audio/webm" />
      </audio>
    </div>
  )
}

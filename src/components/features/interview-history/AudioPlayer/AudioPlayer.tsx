import { useRef, useEffect } from 'react'
import styles from './styles.module.scss'
import { useAudioStore } from '@/stores'

interface Props {
  audioURL: string
}

export const AudioPlayer: React.FC<Props> = ({ audioURL }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { setAudioRef } = useAudioStore()

  useEffect(() => {
    setAudioRef(audioRef as React.RefObject<HTMLAudioElement>)
  }, [setAudioRef])

  return (
    <div className={styles.audioPlayer}>
      <audio ref={audioRef} controls>
        <source src={audioURL} type="audio/webm" />
      </audio>
    </div>
  )
}

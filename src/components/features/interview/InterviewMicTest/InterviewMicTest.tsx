import { useState, useEffect, useRef } from 'react'
import { Mic, Square, Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui'
import { useMediaRecorder } from '@/hooks'
import { useRecordingStore } from '@/stores/recordingStore'
import mrWing from '@/assets/mrwing.png'
import styles from './styles.module.scss'

interface Props {
  onPrev: () => void
  startInterview: () => void
}

export const InterviewMicTest: React.FC<Props> = ({
  onPrev,
  startInterview,
}) => {
  const [permission, setPermission] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const { startRecording, stopRecording } = useMediaRecorder()
  const { isRecording, recordedBlob } = useRecordingStore()

  const isInit = !isRecording && !recordedBlob && !isPlaying
  const isDone = recordedBlob && !isRecording && !isPlaying

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        })
        stream.getTracks().forEach(track => track.stop())
        setPermission(true)
      } catch (error) {
        console.error('마이크 권한을 얻을 수 없습니다:', error)
        setPermission(false)
      }
    }

    checkPermission()
  }, [])

  const startPlayback = () => {
    if (recordedBlob && audioRef.current) {
      const audioUrl = URL.createObjectURL(recordedBlob)
      audioRef.current.src = audioUrl
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsPlaying(false)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => setIsPlaying(false)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('pause', handlePause)
    }
  }, [recordedBlob])

  const handleBack = () => {
    if (isRecording) stopRecording()
    if (isPlaying) stopPlayback()
    onPrev()
  }

  const handleStart = () => {
    if (isRecording) stopRecording()
    if (isPlaying) stopPlayback()
    startInterview()
  }

  const handleRecordingToggle = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const handlePlaybackToggle = () => {
    if (isPlaying) {
      stopPlayback()
    } else {
      startPlayback()
    }
  }

  return (
    <div className={styles.container}>
      <img src={mrWing} alt="mr wing" className={styles.mrwing} />

      <h3>마이크 테스트</h3>

      {permission && (
        <div className={styles.status}>
          {isInit && <span>마이크 버튼을 눌러 테스트를 진행하세요.</span>}
          {isRecording && <span>음성을 녹음하고 있어요...</span>}
          {(isDone || isPlaying) && (
            <span>
              녹음 완료! 재생버튼을 눌러 확인해보세요. <br />
              녹음이 잘 되었다면 이제 면접을 시작할 수 있습니다.
            </span>
          )}
        </div>
      )}

      {!permission && (
        <div className={styles.status}>
          <span className={styles.error}>
            마이크에 접근할 수 없습니다. <br />
            브라우저 설정에서 마이크 권한을 허용해주세요.
          </span>
        </div>
      )}

      <div className={styles.micTest}>
        {permission && (
          <div className={styles.controller}>
            {(isInit || isRecording) && (
              <>
                {isRecording ? (
                  <button
                    className={styles.stopButton}
                    onClick={handleRecordingToggle}
                  >
                    <Square size={18} className={styles.icon} />
                  </button>
                ) : (
                  <button
                    className={styles.recordButton}
                    onClick={handleRecordingToggle}
                  >
                    <Mic size={20} className={styles.icon} />
                  </button>
                )}
              </>
            )}

            {(isDone || isPlaying) && (
              <>
                {isPlaying ? (
                  <button
                    className={styles.pauseButton}
                    onClick={handlePlaybackToggle}
                  >
                    <Pause size={20} className={styles.icon} />
                  </button>
                ) : (
                  <button
                    className={styles.playButton}
                    onClick={handlePlaybackToggle}
                  >
                    <Play size={20} className={styles.icon} />
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <div className={styles.buttons}>
        <Button text="이전" onClick={handleBack} color="black" />
        <Button text="면접 시작" onClick={handleStart} disabled={!permission} />
      </div>

      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  )
}

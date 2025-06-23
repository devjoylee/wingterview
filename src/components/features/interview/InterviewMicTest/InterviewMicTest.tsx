import { useState, useEffect, useRef } from 'react'
import { AudioController } from '@/components/features'
import { Button } from '@/components/ui'
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
  const [isRecording, setIsRecording] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const [permission, setPermission] = useState(false)

  const streamRef = useRef<MediaStream | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startMicTest = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      setPermission(true)
      setIsRecording(true)

      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100)
      }, 100)
      intervalRef.current = interval
    } catch (error) {
      console.error('마이크 권한을 얻을 수 없습니다:', error)
      setPermission(false)
    }
  }

  const stopMicTest = () => {
    setIsRecording(false)

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }

    setAudioLevel(0)
  }

  const handleBack = () => {
    stopMicTest()
    onPrev()
  }

  const handleStart = () => {
    stopMicTest()
    startInterview()
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      startMicTest()
    }, 100)

    return () => {
      clearTimeout(timer)
      stopMicTest()
    }
  }, [])

  return (
    <div className={styles.container}>
      <img src={mrWing} alt="mr wing" className={styles.mrwing} />

      <h3>마이크 테스트</h3>
      <p>마이크가 정상적으로 작동하는지 확인해주세요.</p>

      <div className={styles.micTest}>
        {!permission && (
          <p className={styles.error}>
            마이크에 접근할 수 없습니다. <br />
            브라우저 설정에서 마이크 권한을 허용해주세요.
          </p>
        )}

        {permission && (
          <AudioController
            isRecording={isRecording}
            audioLevel={audioLevel}
            onPlay={startMicTest}
            onStop={stopMicTest}
            hasLevelBar
          />
        )}
      </div>

      <div className={styles.buttons}>
        <Button text="이전" onClick={handleBack} color="black" />
        <Button
          text="녹음 실행 및 면접 시작"
          onClick={handleStart}
          disabled={!permission}
        />
      </div>
    </div>
  )
}

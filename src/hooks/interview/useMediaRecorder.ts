import { useState } from 'react'
import { useRecordingStore } from '@/stores/recordingStore'

export const useMediaRecorder = () => {
  const [micError, setMicError] = useState<string[]>([])
  const { setIsRecording, setMediaRecorder, clearChunks, setStream } =
    useRecordingStore()

  const startRecording = async () => {
    const permission = await navigator.permissions.query({
      name: 'microphone' as PermissionName,
    })

    if (permission.state === 'denied') {
      setMicError([
        '마이크 권한이 차단되어 있습니다.',
        '브라우저 설정에서 마이크 권한을 허용해주세요.',
      ])
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    setStream(stream)

    const recorder = new MediaRecorder(stream)
    clearChunks()

    recorder.start(1000)
    setMediaRecorder(recorder)
    setIsRecording(true)
  }

  const stopRecording = () => {
    const { mediaRecorder, stream } = useRecordingStore.getState()

    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop()
    }

    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }

    setMediaRecorder(null)
    setIsRecording(false)
  }

  return {
    startRecording,
    stopRecording,
    micError,
  }
}

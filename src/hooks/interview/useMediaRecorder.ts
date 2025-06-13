import { useState } from 'react'
import { useRecordingStore } from '@/stores/recordingStore'
import { useAudioUpload } from '../presigned'

export const useMediaRecorder = () => {
  const [recordingError, setRecordingError] = useState<string[]>([])
  const {
    setIsRecording,
    setRecordedBlob,
    setMediaRecorder,
    clearChunks,
    setStream,
  } = useRecordingStore()

  const { uploadAudio } = useAudioUpload()

  const startRecording = async () => {
    const permission = await navigator.permissions.query({
      name: 'microphone' as PermissionName,
    })

    if (permission.state === 'denied') {
      setRecordingError([
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
    const { mediaRecorder, stream, audioChunks } = useRecordingStore.getState()

    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.onstop = () => {
        try {
          const blob = new Blob(audioChunks, { type: 'audio/webm' })
          if (blob.size === 0) {
            console.warn('녹음 파일을 찾을 수 없습니다.')
            return
          }
          setRecordedBlob(blob)
        } catch (error) {
          console.error('녹음 파일 생성에 실패했습니다', error)
        }
      }

      mediaRecorder.stop()
    }

    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }

    setMediaRecorder(null)
    setIsRecording(false)
  }

  const uploadRecording = async (interviewId: string) => {
    const { recordedBlob } = useRecordingStore.getState()

    if (!recordedBlob) {
      console.warn('업로드할 녹음 파일을 찾을 수 없습니다.')
      return
    }

    try {
      await uploadAudio(recordedBlob, `interview-${interviewId}.webm`)
      clearChunks()
    } catch (error) {
      console.error('녹음 파일 업로드에 실패했습니다', error)
    }
  }

  return {
    startRecording,
    stopRecording,
    uploadRecording,
    recordingError,
  }
}

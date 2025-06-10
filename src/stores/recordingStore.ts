import { create } from 'zustand'

interface RecordingState {
  stream: MediaStream | null
  mediaRecorder: MediaRecorder | null
  recordedBlob: Blob | null
  audioChunks: Blob[]
  isRecording: boolean

  setStream: (stream: MediaStream | null) => void
  setMediaRecorder: (recorder: MediaRecorder | null) => void
  setRecordedBlob: (blob: Blob | null) => void
  setIsRecording: (isRecording: boolean) => void

  addAudioChunk: (chunk: Blob) => void
  clearChunks: () => void
}

export const useRecordingStore = create<RecordingState>(set => ({
  stream: null,
  mediaRecorder: null,
  recordedBlob: null,
  audioChunks: [],
  isRecording: false,

  setStream: stream => set({ stream }),
  setMediaRecorder: recorder => set({ mediaRecorder: recorder }),
  setRecordedBlob: blob => set({ recordedBlob: blob }),
  setIsRecording: isRecording => set({ isRecording }),

  addAudioChunk: chunk =>
    set(state => ({ audioChunks: [...state.audioChunks, chunk] })),
  clearChunks: () => set({ audioChunks: [] }),
}))

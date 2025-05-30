import { create } from 'zustand'

interface RecordingState {
  mediaRecorder: MediaRecorder | null
  recordedBlob: Blob | null
  audioChunks: Blob[]

  setMediaRecorder: (recorder: MediaRecorder | null) => void
  setRecordedBlob: (blob: Blob | null) => void

  addAudioChunk: (chunk: Blob) => void
  clearChunks: () => void
}

export const useRecordingStore = create<RecordingState>(set => ({
  mediaRecorder: null,
  recordedBlob: null,
  audioChunks: [],

  setMediaRecorder: recorder => set({ mediaRecorder: recorder }),
  setRecordedBlob: blob => set({ recordedBlob: blob }),

  addAudioChunk: chunk =>
    set(state => ({ audioChunks: [...state.audioChunks, chunk] })),
  clearChunks: () => set({ audioChunks: [] }),
}))

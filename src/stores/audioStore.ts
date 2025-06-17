import { create } from 'zustand'

interface AudioState {
  audioRef: React.RefObject<HTMLAudioElement> | null
  setAudioRef: (ref: React.RefObject<HTMLAudioElement>) => void
  jumpTo: (seconds: number) => void
}

export const useAudioStore = create<AudioState>((set, get) => ({
  audioRef: null,

  setAudioRef: (ref: React.RefObject<HTMLAudioElement>) =>
    set({ audioRef: ref }),

  jumpTo: (seconds: number) => {
    const { audioRef } = get()
    if (audioRef?.current) {
      audioRef.current.currentTime = seconds
      audioRef.current.play()
    }
  },
}))

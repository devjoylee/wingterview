import { create } from 'zustand'

interface TimerState {
  isActive: boolean
  time: { minutes: number; seconds: number }
  startTimer: () => void
  resetTimer: (init?: { minutes: number; seconds: number }) => void
}

export const useTimerStore = create<TimerState>(set => ({
  isActive: false,
  time: { minutes: 20, seconds: 0 },

  startTimer: () => set({ isActive: true }),
  resetTimer: (init = { minutes: 20, seconds: 0 }) =>
    set({ isActive: false, time: init }),
}))

import { create } from 'zustand'

interface TimerState {
  isActive: boolean
  time: { minutes: number; seconds: number }
  startTimer: (minutes: number) => void
  resetTimer: (init?: { minutes: number; seconds: number }) => void
}

export const useTimerStore = create<TimerState>(set => ({
  isActive: false,
  time: { minutes: 0, seconds: 0 },

  startTimer: minutes =>
    set({ isActive: true, time: { minutes: minutes - 1, seconds: 59 } }),
  resetTimer: (init = { minutes: 0, seconds: 0 }) =>
    set({ isActive: false, time: init }),
}))

import { create } from 'zustand'

interface MatchResultState {
  matchResult: MatchResultData | null
  setMatchResult: (result: MatchResultData) => void
}

export const useMatchStore = create<MatchResultState>(set => ({
  matchResult: null,
  setMatchResult: result => set({ matchResult: result }),
}))

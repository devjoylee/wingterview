import { create } from 'zustand'

interface MatchResultState {
  matchResultInStore: MatchResultData | null
  setMatchResultInStore: (result: MatchResultData) => void
  getInterviewee: () => BaseProfile | null
}

export const useMatchStore = create<MatchResultState>((set, get) => ({
  matchResultInStore: null,
  setMatchResultInStore: result => set({ matchResultInStore: result }),
  getInterviewee: () => get().matchResultInStore?.interviewee ?? null,
}))

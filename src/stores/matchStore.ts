import { create } from 'zustand'

interface MatchResultState {
  matchResultInStore: MatchResultData | null
  setMatchResultInStore: (result: MatchResultData) => void
  getInterviewee: () => BaseProfile | null
  getOddInterviewee: () => BaseProfile | null
  getEvenInterviewee: () => BaseProfile | null
}

export const useMatchStore = create<MatchResultState>((set, get) => ({
  matchResultInStore: null,
  setMatchResultInStore: result => set({ matchResultInStore: result }),
  getInterviewee: () => get().matchResultInStore?.interviewee || null,
  getOddInterviewee: () => get().matchResultInStore?.interviewee || null,
  getEvenInterviewee: () => get().matchResultInStore?.interviewer || null,
}))

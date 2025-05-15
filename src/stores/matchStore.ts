import { create } from 'zustand'

interface MatchResultState {
  matchResultInStore: MatchResultData | null
  isMatching: boolean

  setIsMatching: (isMatching: boolean) => void
  setMatchResultInStore: (result: MatchResultData) => void
  getInterviewee: () => BaseProfile | null
  getOddInterviewee: () => BaseProfile | null
  getEvenInterviewee: () => BaseProfile | null
}

export const useMatchStore = create<MatchResultState>((set, get) => ({
  matchResultInStore: null,
  isMatching: false,

  setIsMatching: isMatching => set({ isMatching: isMatching }),
  setMatchResultInStore: result => set({ matchResultInStore: result }),
  getInterviewee: () => get().matchResultInStore?.interviewee || null,
  getOddInterviewee: () => get().matchResultInStore?.interviewee || null,
  getEvenInterviewee: () => get().matchResultInStore?.interviewer || null,
}))

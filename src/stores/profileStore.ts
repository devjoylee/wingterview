import { create } from 'zustand'
import type { Swiper as SwiperType } from 'swiper'

interface ProfileState {
  formData: UserProfile
  currentStep: number
  swiper: SwiperType | null

  updateBasicInfo: (name: string, nickname: string, curriculum: string) => void
  updateJobInterest: (interests: string[]) => void
  updateTechStack: (stacks: string[]) => void
  updateProfileImageUrl: (url: string | null) => void
  updateSeatPosition: (seatPosition: [number, number]) => void

  nextStep: () => void
  prevStep: () => void
  setSwiper: (swiper: SwiperType | null) => void

  submitForm: () => Promise<void>
}

const initialFormData: UserProfile = {
  name: '',
  nickname: '',
  curriculum: '',
  jobInterest: [],
  techStack: [],
  profileImageUrl: null,
  seatPosition: [0, 0],
}

export const useProfileStore = create<ProfileState>()((set, get) => ({
  formData: initialFormData,
  currentStep: 1,
  swiper: null,

  updateBasicInfo: (name, nickname, curriculum) =>
    set(state => ({
      formData: {
        ...state.formData,
        name: name,
        nickname: nickname,
        curriculum: curriculum,
      },
    })),

  updateJobInterest: interests =>
    set(state => ({
      formData: {
        ...state.formData,
        jobInterest: interests,
      },
    })),

  updateTechStack: stacks =>
    set(state => ({
      formData: {
        ...state.formData,
        techStack: stacks,
      },
    })),

  updateProfileImageUrl: url =>
    set(state => ({
      formData: {
        ...state.formData,
        profileImageUrl: url,
      },
    })),

  updateSeatPosition: seat =>
    set(state => ({
      formData: {
        ...state.formData,
        seatPosition: seat,
      },
    })),

  nextStep: () => {
    const { swiper, currentStep } = get()
    if (swiper) swiper.slideNext()
    set({ currentStep: currentStep + 1 })
  },

  prevStep: () => {
    const { swiper, currentStep } = get()
    if (swiper) swiper.slidePrev()
    set({ currentStep: Math.max(1, currentStep - 1) })
  },

  setSwiper: swiper => set({ swiper }),

  submitForm: async () => {
    try {
      console.log('폼 제출 데이터:', get().formData)
      return Promise.resolve()
    } catch (error) {
      console.error('폼 제출 오류:', error)
      throw error
    }
  },
}))

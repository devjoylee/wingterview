import { create } from 'zustand'
import type { Swiper as SwiperType } from 'swiper'

interface ProfileState {
  formData: UserProfile
  currentStep: number
  swiper: SwiperType | null
  selectedSeat: Seat

  updateBasicInfo: (name: string, nickname: string, curriculum: string) => void
  updateJobInterest: (interests: string[]) => void
  updateTechStack: (stacks: string[]) => void
  updateProfileImageUrl: (url: string | null) => void
  updateSeatPosition: (seatPosition: [number, number]) => void
  setSelectedSeat: (seat: Seat) => void

  nextStep: () => void
  prevStep: () => void
  setSwiper: (swiper: SwiperType | null) => void
}

const initialFormData: UserProfile = {
  name: '',
  nickname: '',
  curriculum: '',
  jobInterest: [],
  techStack: [],
  profileImageUrl: null,
  seatPosition: [1, 1],
}

export const useProfileStore = create<ProfileState>()((set, get) => ({
  formData: initialFormData,
  currentStep: 1,
  swiper: null,
  selectedSeat: {
    section: null,
    line: null,
    seat: null,
  },

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
  setSelectedSeat: seat => set({ selectedSeat: seat }),
}))

import { create } from 'zustand'
import type { Swiper as SwiperType } from 'swiper'
import {
  validateBasicInfo,
  validateJobInterest,
  validateTechStack,
  validateProfileImage,
  validateSeatLocation,
} from '@/utils/validators'

interface ProfileState {
  formData: ProfileFormData
  currentStep: number
  swiper: SwiperType | null
  selectedSeat: SeatData
  formErrors: Record<string, string>

  updateBasicInfo: (name: string, nickname: string, curriculum: string) => void
  updateJobInterest: (interests: string[]) => void
  updateTechStack: (stacks: string[]) => void
  updateProfileImageUrl: (url: string | null) => void
  updateSeatPosition: (seatPosition: SeatData) => void
  setSelectedSeat: (seat: SeatData) => void

  nextStep: () => void
  prevStep: () => void
  setSwiper: (swiper: SwiperType | null) => void

  validateCurrentStep: () => boolean
  setFormErrors: (errors: Record<string, string>) => void
}

const initialFormData: ProfileFormData = {
  name: '',
  nickname: '',
  curriculum: '',
  jobInterest: [],
  techStack: [],
  profileImageUrl: null,
  seatPosition: {
    section: '',
    seat: [null, null],
  },
}

export const useProfileStore = create<ProfileState>()((set, get) => ({
  formData: initialFormData,
  currentStep: 1,
  swiper: null,
  selectedSeat: {
    section: '',
    seat: [null, null],
  },
  formErrors: {},

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

  validateCurrentStep: () => {
    const { formData, currentStep } = get()
    let validationResult = { isValid: true, errors: {} }

    switch (currentStep) {
      case 1:
        validationResult = validateBasicInfo(formData)
        break
      case 2:
        validationResult = validateJobInterest(formData)
        break
      case 3:
        validationResult = validateTechStack(formData)
        break
      case 4:
        validationResult = validateProfileImage(formData)
        break
      case 5:
        validationResult = validateSeatLocation(formData)
        break
      default:
        break
    }

    set({ formErrors: validationResult.errors })

    return validationResult.isValid
  },

  setFormErrors: errors => set({ formErrors: errors }),
}))

import { create } from 'zustand'
import { persist, StorageValue } from 'zustand/middleware'
import {
  validateBasicInfo,
  validateJobInterest,
  validateTechStack,
  validateProfileImage,
  validateSeatLocation,
} from '@/utils/validators'

interface ProfileState {
  formData: ProfileFormData
  selectedSeat: SeatData
  formErrors: Record<string, string>
  imageURL: string
  imageFile: File | null
  nickname: string
  currentStep: number

  updateBasicInfo: (name: string, nickname: string, curriculum: string) => void
  updateJobInterest: (interests: string[]) => void
  updateTechStack: (stacks: string[]) => void
  updateProfileImage: (url: string | null) => void
  updateSeatPosition: (seatPosition: SeatData) => void

  validateCurrentStep: (currentStep: number) => boolean

  setFormErrors: (errors: Record<string, string>) => void
  setSelectedSeat: (seat: SeatData) => void
  setImageURL: (url: string) => void
  setImageFile: (file: File) => void
  setCurrentStep: (currentStep: number) => void
}

const initialFormData: ProfileFormData = {
  name: '',
  nickname: '',
  curriculum: '',
  jobInterest: [],
  techStack: [],
  profileImageName: null,
  seatPosition: {
    section: '',
    seat: [null, null],
  },
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      formData: initialFormData,
      selectedSeat: {
        section: '',
        seat: [null, null],
      },
      formErrors: {},
      imageURL: '',
      imageFile: null,
      nickname: initialFormData.nickname,
      currentStep: 0,

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
          formErrors: {},
        })),

      updateTechStack: stacks =>
        set(state => ({
          formData: {
            ...state.formData,
            techStack: stacks,
          },
          formErrors: {},
        })),

      updateProfileImage: name =>
        set(state => ({
          formData: {
            ...state.formData,
            profileImageName: name,
          },
        })),

      updateSeatPosition: seat =>
        set(state => ({
          formData: {
            ...state.formData,
            seatPosition: seat,
          },
          formErrors: {},
        })),

      setImageURL: (url: string) => set(() => ({ imageURL: url })),
      setImageFile: (file: File) => set(() => ({ imageFile: file })),
      setSelectedSeat: seat => set({ selectedSeat: seat }),

      validateCurrentStep: currentStep => {
        const { formData } = get()
        let validationResult = { isValid: true, errors: {} }

        switch (currentStep + 1) {
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
      setCurrentStep: (currentStep: number) => set({ currentStep }),
    }),
    {
      name: 'profile-storage',
      storage: {
        getItem: key => {
          const value = sessionStorage.getItem(key)
          return value
            ? (JSON.parse(value) as StorageValue<ProfileState>)
            : null
        },
        setItem: (key, value) => {
          sessionStorage.setItem(key, JSON.stringify(value))
        },
        removeItem: key => {
          sessionStorage.removeItem(key)
        },
      },
    }
  )
)

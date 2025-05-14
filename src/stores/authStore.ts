import { create } from 'zustand'
import { persist, StorageValue } from 'zustand/middleware'

interface AuthState {
  accessToken: string
  isNewUser: boolean
  isLoggedIn: () => boolean
  hasProfile: () => boolean
  isValidUser: () => boolean

  setAccessToken: (accessToken: string) => void
  setIsNewUser: (isNewUser: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: '',
      isNewUser: false,

      setIsNewUser: (isNewUser: boolean) => set({ isNewUser }),
      setAccessToken: (accessToken: string) => set({ accessToken }),
      isLoggedIn: () => !!get().accessToken,
      hasProfile: () => !!localStorage.getItem('nickname'),
      isValidUser: () => get().isLoggedIn() && get().hasProfile(),
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: key => {
          const value = sessionStorage.getItem(key)
          return value ? (JSON.parse(value) as StorageValue<AuthState>) : null
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

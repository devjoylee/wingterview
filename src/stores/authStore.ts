import { create } from 'zustand'
import { persist, StorageValue } from 'zustand/middleware'

interface AuthState {
  accessToken: string | null
  isNewUser: boolean

  setTokens: (accessToken: string) => void
  setIsNewUser: (isNewUser: boolean) => void
  isLoggedIn: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      isNewUser: false,

      setIsNewUser: (isNewUser: boolean) => set({ isNewUser }),
      setTokens: (accessToken: string) =>
        set({
          accessToken,
        }),

      isLoggedIn: () => {
        const nickname = localStorage.getItem('nickname')
        const token = get().accessToken
        return !!(nickname && token)
      },
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

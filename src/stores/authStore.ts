import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  isNewUser: boolean

  setTokens: (accessToken: string, refreshToken: string) => void
  setIsNewUser: (isNewUser: boolean) => void
  isLoggedIn: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      isNewUser: false,

      setIsNewUser: (isNewUser: boolean) => set({ isNewUser }),
      setTokens: (accessToken: string, refreshToken: string) =>
        set({
          accessToken,
          refreshToken,
        }),

      isLoggedIn: () => {
        return !!get().accessToken
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

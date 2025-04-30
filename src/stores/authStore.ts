import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  authCode: string | null
  accessToken: string | null
  refreshToken: string | null

  setAuthCode: (authCode: string) => void
  setTokens: (accessToken: string, refreshToken: string) => void
  isLoggedIn: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      authCode: null,
      accessToken: null,
      refreshToken: null,

      setAuthCode: (authCode: string) => set({ authCode }),
      setTokens: (accessToken: string, refreshToken: string) =>
        set({
          accessToken,
          refreshToken,
        }),

      isLoggedIn: () => {
        return !!get().authCode
        // return !!get().accessToken
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

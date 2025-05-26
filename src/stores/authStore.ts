import { create } from 'zustand'
import { persist, StorageValue } from 'zustand/middleware'

interface AuthState {
  accessToken: string
  isNewUser: boolean
  isLoggedIn: boolean
  hasProfile: boolean

  setAccessToken: (accessToken: string) => void
  setLoginState: (accessToken: string, isNewUser: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      accessToken: '',
      isNewUser: false,
      isLoggedIn: false,
      hasProfile: !!localStorage.getItem('nickname'),

      setAccessToken: (accessToken: string) => set({ accessToken }),
      setLoginState: (accessToken: string, isNewUser: boolean) =>
        set({
          accessToken,
          isNewUser,
          isLoggedIn: !!accessToken,
        }),
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

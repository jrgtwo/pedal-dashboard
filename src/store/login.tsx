import { create } from 'zustand'

interface LoginStore {
  user: any | null
  logout: () => void
  isLoggedIn: boolean
  setLoginStatus: (userData: any | null) => void
}

const useLoginStore = create<LoginStore>((set) => ({
  user: null,
  isLoggedIn: false,
  setLoginStatus: (userData) => set(() => ({
    isLoggedIn: !!userData,
    user: userData,
  })),
  logout: () => set(() => ({
    isLoggedIn: false,
    user: null
  })),
}))

export { useLoginStore }

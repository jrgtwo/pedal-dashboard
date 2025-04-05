import { create } from 'zustand'

export enum LOGIN_STATES {
  LOGGED_IN,
  LOGGED_OUT,
  NOT_CHECKED
}

interface LoginStore {
  user: any | null
  logout: () => void
  isLoggedIn: LOGIN_STATES,
  setLoginStatus: (userData: any | null) => void
}

const useLoginStore = create<LoginStore>((set) => ({
  user: null,
  isLoggedIn: LOGIN_STATES.NOT_CHECKED,
  setLoginStatus: (userData) => set(() => ({
    isLoggedIn: userData ? LOGIN_STATES.LOGGED_IN : LOGIN_STATES.LOGGED_OUT,
    user: userData,
  })),
  logout: () => set(() => ({
    isLoggedIn: LOGIN_STATES.LOGGED_OUT,
    user: null
  })),
}))

export { useLoginStore }

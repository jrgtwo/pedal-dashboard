import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'
export enum LOGIN_STATES {
  LOGGED_IN,
  LOGGED_OUT,
  NOT_CHECKED
}

interface LoginStore {
  user: User | null
  logout: () => void
  user_status: LOGIN_STATES,
  setLoginStatus: (userData: User | null) => void
}

const useLoginStore = create<LoginStore>((set) => ({
  user: null,
  user_status: LOGIN_STATES.NOT_CHECKED,
  setLoginStatus: (userData) => set(() => {
    // debugger
    return ({
      user_status: userData ? LOGIN_STATES.LOGGED_IN : LOGIN_STATES.LOGGED_OUT,
      user: userData,
    })
  }),
  logout: () => set(() => ({
    user_status: LOGIN_STATES.LOGGED_OUT,
    user: null
  })),
}))

export { useLoginStore }

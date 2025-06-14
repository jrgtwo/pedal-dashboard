import { create } from 'zustand'

type MyGearStore = {
  pedalList: number[]
  setPedalList: (pedalList: number[]) => void
}

const useMyGearStore = create<MyGearStore>((set) => ({
  pedalList: [],
  setPedalList: (pedalList) => set(() => ({
    pedalList: pedalList,
  })),
}))

export { useMyGearStore }

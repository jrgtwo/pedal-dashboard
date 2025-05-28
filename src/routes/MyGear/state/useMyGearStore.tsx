import { create } from 'zustand'

type MyGearStore = {
  pedalList: number[]
  setPedalList: (pedalList: number[]) => void
  addPedalToList: (pedal: number) => void
  removePedalFromList: (pedalId: number) => void
}

const useMyGearStore = create<MyGearStore>((set) => ({
  pedalList: [],
  setPedalList: (pedalList) => set(() => ({
    pedalList: pedalList,
  })),
  addPedalToList: (pedal) => set((state) => ({
    pedalList: [...state.pedalList, pedal],
  })),
  removePedalFromList: (pedalId) => set((state) => {
    return ({
      pedalList: state.pedalList.filter((pedal) => {
        return pedal !== pedalId
      }),
    })
  })
}))

export { useMyGearStore }

import { create } from 'zustand'

type MyGearStore = {
  pedalList: []
  // clearPedalList: () => void
  setPedalList: (pedalList: []) => void
  // addPedalToList: (pedal: { id: number, name: string }) => void
  // removePedalFromList: (pedalId: number) => void
}

const useMyGearStore = create<MyGearStore>((set) => ({
  pedalList: [],
  setPedalList: (pedalList) => set(() => ({
    pedalList: pedalList,
  })),
  // clearPedalList: () => set(() => ({
  //   pedalList: [],
  // })),
  // addPedalToList: (pedal) => set((state) => ({
  //   pedalList: [...state.pedalList, pedal],
  // })),
  // removePedalFromList: (pedalId) => set((state) => ({
  //   pedalList: state.pedalList.filter((pedal) => pedal.id !== pedalId),
  // }))
}))

export { useMyGearStore }

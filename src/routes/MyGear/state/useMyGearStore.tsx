import { create } from 'zustand'

type Pedal = Record<string, string>
type MyGearStore = {
  pedalList: Pedal[]
  // clearPedalList: () => void
  setPedalList: (pedalList: Pedal[]) => void
  addPedalToList: (pedal: Pedal) => void
  removePedalFromList: (pedalId: number) => void
}

const useMyGearStore = create<MyGearStore>((set) => ({
  pedalList: [],
  setPedalList: (pedalList) => set(() => ({
    pedalList: pedalList,
  })),
  // clearPedalList: () => set(() => ({
  //   pedalList: [],
  // })),
  addPedalToList: (pedal) => set((state) => ({
    pedalList: [...state.pedalList, pedal],
  })),
  removePedalFromList: (pedalId) => set((state) => {
    debugger
    return ({
      pedalList: state.pedalList.filter((pedal) => {
        debugger
        return pedal !== pedalId
      }),
    })
  })
}))

export { useMyGearStore }

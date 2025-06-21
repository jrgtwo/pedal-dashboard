import { create } from 'zustand'

const useMyGearStore = create((set) => ({
  myGear: [],
  myPedals: [],
  setMyGear: (gear) => set({ myGear: gear }),
  setMyPedals: (pedals) => set({ myPedals: pedals }),
}))

export { useMyGearStore }

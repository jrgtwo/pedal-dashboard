import { create } from 'zustand'
import type { PedalShape } from '../../Pedal/Pedal.types'

const mockPedalJSON = [{
  id: 1,
  name: 'test pedal',
  brand: 'JRGarcia Amps',
  location: {
    w: 100,
    h: 100,
    x: 0,
    y: 0
  }
}, {
  id: 2,
  name: 'test pedal 2',
  brand: 'JRGarcia Amps',
  location: {
    w: 200,
    h: 100,
    x: 200,
    y: 200
  }
}]

interface PedalStore {
  pedals: PedalShape[];
  addNewPedals: (newPedal: PedalShape) => void;
}
const usePedalStore = create<PedalStore>((set) => ({
  pedals: mockPedalJSON,
  addNewPedals: (newPedal) => set((state) => ({
    pedals: [...state.pedals, newPedal]
  }))

}))

export { usePedalStore }
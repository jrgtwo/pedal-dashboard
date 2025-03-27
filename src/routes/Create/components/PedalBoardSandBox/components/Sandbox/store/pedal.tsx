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
}, {
  id: 3,
  name: 'bmp',
  brand: '-',
  img: 'bmp.png',
  location: {
    w: 192,
    h: 253,
    x: 450,
    y: 200
  }
}]
const usePedalStore = create<{ pedals: PedalShape[] }>((set) => ({
  pedals: mockPedalJSON,
  updatePedals: (newPedal: PedalShape) => {
    return set((state) => ({ pedals: state.pedals.push(newPedal) }))
  }
}))

export { usePedalStore }
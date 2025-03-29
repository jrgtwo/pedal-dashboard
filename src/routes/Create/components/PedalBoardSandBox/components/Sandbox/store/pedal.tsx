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
  history: PedalShape[][];
  updateHistory: (updatedState: PedalShape[]) => void;
  undoHistory: () => void;
}
const usePedalStore = create<PedalStore>((set) => ({
  pedals: mockPedalJSON,
  addNewPedals: (newPedal) => set((state) => {
    const updatedState = [...state.pedals, newPedal]
    return ({
      pedals: updatedState,
      history: [...state.history, updatedState]
    })
  }),
  history: [mockPedalJSON],
  updateHistory: (updatedState) => set((state) => ({
    history: [...state.history, updatedState]
  })),
  undoHistory: () => set((state) => {
    debugger
    if (state.history.length < 2) return state
    const updatedState = [...state.history]
    // TODO Add redo feature with last state
    const lastState = updatedState.pop()

    return ({
      pedals: updatedState[updatedState.length - 1],
      history: updatedState
    })
  })
}))

export { usePedalStore }

import { create } from 'zustand'
import type { PedalShape } from '../../Pedal/Pedal.types'

interface PedalStore {
  saveId: null,
  name: string | null,
  pedals: PedalShape[];
  addNewPedals: (newPedal: PedalShape) => void;
  history: PedalShape[][];
  updateHistory: (newPedals: PedalShape[]) => void;
  undoHistory: () => void;
  redoLastHistory: PedalShape[] | null;
  removeBy: (key: keyof PedalShape, value: string) => void
  clear: () => void

  saveBoard: () => void
  saveBoardName: (name: string) => void
}

const usePedalStore = create<PedalStore>((set) => ({
  pedals: [],
  history: [],
  redoLastHistory: null,
  saveId: null,
  name: null,

  addNewPedals: (newPedal) => set((state) => {
    const updatedState = [...state.pedals, newPedal]

    return ({
      pedals: updatedState,
      history: [...state.history, updatedState]
    })
  }),

  updateHistory: (newPedals) => set((state) => {
    return ({
      pedals: structuredClone(newPedals),
      history: [...state.history, structuredClone(newPedals)]
    })
  }),

  undoHistory: () => set((state) => {
    if (state.history.length < 1) return state
    const updatedState = [...state.history]

    const lastState = updatedState.pop()

    return ({
      pedals: updatedState[updatedState.length - 1] || [],
      history: updatedState,
      redoLastHistory: lastState
    })
  }),

  removeBy: (key, value) => set((state) => {
    const prevPedals = state.pedals
    const updatedPedals = prevPedals.filter((item) => {
      return `${item[key]}` !== `${value}`
    })

    return {
      pedals: updatedPedals,
      history: [...state.history, structuredClone(updatedPedals)]
    }
  }),

  clear: () => set(() => {
    return {
      pedals: [],
      history: [],
      redoLastHistory: null
    }
  }),

  saveBoard: () => set(() => {

    return {}
  }),

  saveBoardName: (name) => set(() => {
    return {
      name
    }
  })
}))

export { usePedalStore }

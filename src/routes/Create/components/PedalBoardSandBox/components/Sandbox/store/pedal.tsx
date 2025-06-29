import { create } from 'zustand'
import type { DraggablePedalShape } from '../../Pedal/Pedal.types'

interface PedalStore {
  pedals2: DraggablePedalShape[];
  history2: DraggablePedalShape[][];
  redoLastHistory2: DraggablePedalShape[] | null;
  name: string | null,
  boardId: number | null,

  addNewPedals: (newPedal: DraggablePedalShape) => void;
  updateHistory: (newPedals: DraggablePedalShape[]) => void;
  undoHistory: () => void;
  removeBy: (key: keyof DraggablePedalShape, value: string) => void;
  clear: () => void;
  updateBoardName: (name: string) => void;
  updateBoardId: (id: number) => void;
  updateFromFetch: ({
    id, pedals, name
  }: {
    id: number | undefined,
    pedals: DraggablePedalShape[] | undefined,
    name: string | null | undefined
  }) => void;
}

const usePedalStore = create<PedalStore>((set) => ({
  pedals2: [],
  history2: [],
  redoLastHistory2: null,
  name: null,
  boardId: null,

  addNewPedals: (newPedal) => set((state) => {
    const newPedal2 = {
      ...newPedal,
      x: 0,
      y: 0
    }

    const updatedState2 = [...state.pedals2, newPedal2]

    return ({
      pedals2: updatedState2,
      history2: [...state.history2, updatedState2]
    })
  }),

  updateHistory: (newPedals) => set((state) => {
    const newPedals2 = newPedals

    return ({
      pedals2: newPedals2,
      history2: [...state.history2, newPedals2]
    })
  }),

  undoHistory: () => set((state) => {
    if (state.history2.length < 1) return state
    const updatedState2 = [...state.history2]
    const lastState2 = updatedState2.pop()

    return ({
      pedals2: updatedState2[updatedState2.length - 1] || [],
      history2: updatedState2,
      redoLastHistory2: lastState2
    })
  }),

  removeBy: (key, value) => set((state) => {
    const prevPedals2 = state.pedals2

    const updatedPedals2 = prevPedals2.filter((item) => {
      return `${item[key]}` !== `${value}`
    })

    return {
      pedals2: updatedPedals2,
      history2: [...state.history2, updatedPedals2],
    }
  }),

  clear: () => set(() => {
    return {
      pedals2: [],
      history2: [],
      redoLastHistory2: null,
      name: null,
      boardId: null
    }
  }),

  updateBoardId: (id) => set(() => {
    return {
      boardId: id
    }
  }),

  updateBoardName: (name) => set(() => {
    return {
      name
    }
  }),

  updateFromFetch: ({ id, pedals, name }) => set(() => {

    return {
      boardId: id,
      pedals2: pedals,
      ...(name && { name }),
      history2: [pedals],
      redoLastHistory2: null
    }
  })
}))

export { usePedalStore }

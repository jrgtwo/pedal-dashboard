import { create } from 'zustand'
import type { DraggablePedalShape } from '../../Pedal/Pedal.types'


interface PedalStore {
  pedals: DraggablePedalShape[];
  history: DraggablePedalShape[][];
  redoLastHistory: DraggablePedalShape[] | null;
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
  pedals: [],
  history: [],
  redoLastHistory: null,
  name: null,
  boardId: null,

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
      redoLastHistory: null,
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
      pedals,
      ...(name && { name }),
      history: [structuredClone(pedals)],
      redoLastHistory: null
    }
  })
}))

export { usePedalStore }

import { RequiredDataValues } from '../hooks/useDraggable'
import { create } from 'zustand'

export const useRotationData = create((set) => ({
  isRotating: false,
  currRotateElement: null as HTMLElement | null,
  currRotatable: null as RequiredDataValues | null,
  currDraggableRotationXY: null as { x: number, y: number, rotation: number } | null,
  setIsRotating: (isRotating: boolean) => set(() => ({ isRotating })),
  setCurrDraggableRotationXY: ({ x, y, rotation }) => set((state) => ({
    currDraggableRotationXY: {
      x: x || (state.currDraggableRotationXY?.x || 0),
      y: y || (state.currDraggableRotationXY?.y || 0),
      rotation: rotation || (state.currDraggableRotationXY?.rotation || 0)
    }
  }))
}))

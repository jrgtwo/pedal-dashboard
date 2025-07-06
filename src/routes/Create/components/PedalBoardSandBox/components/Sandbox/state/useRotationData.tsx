import { RequiredDataValues } from '../Sandbox.types'
import { create } from 'zustand'

type RotationData = {
  isRotating: boolean
  currRotateElement: HTMLElement | null
  currRotatable: RequiredDataValues | null
  currDraggableRotationXY: { x: number, y: number, rotation: number } | null
  setIsRotating: (isRotating: boolean) => void
  setCurrDraggableRotationXY: (rotationData: { x?: number, y?: number, rotation?: number }) => void
}

export const useRotationData = create<RotationData>((set) => ({
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

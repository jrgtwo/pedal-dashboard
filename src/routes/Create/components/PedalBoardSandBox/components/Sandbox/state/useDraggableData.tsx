import { create } from "zustand"

type DraggableData = {
  currDraggableWidth: number
  currDraggableHeight: number
  currDraggableXOffset: number
  currDraggableYOffset: number
  currDraggable: any | null
  currDraggableElement: HTMLElement | null
  setCurrDraggableElement: (element: HTMLElement | null) => void
  setCurrDraggable: (draggable: any) => void
  setCurrDraggableData: (dimensions: {
    width?: number
    height?: number
    xOffset?: number
    yOffset?: number
  }) => void
}

export const useDraggableData = create<DraggableData>((set) => ({
  currDraggableWidth: 0,
  currDraggableHeight: 0,
  currDraggableXOffset: 0,
  currDraggableYOffset: 0,
  currDraggable: null,
  currDraggableElement: null,
  setCurrDraggableElement: (element: HTMLElement | null) => set({ currDraggableElement: element }),
  setCurrDraggable: (draggable) => set({ currDraggable: draggable }),
  setCurrDraggableData: ({
    width,
    height,
    xOffset,
    yOffset
  }) => set((state) => ({
    currDraggableWidth: width || state.currDraggableWidth,
    currDraggableHeight: height || state.currDraggableHeight,
    currDraggableXOffset: xOffset || state.currDraggableXOffset,
    currDraggableYOffset: yOffset || state.currDraggableYOffset
  })),
}))

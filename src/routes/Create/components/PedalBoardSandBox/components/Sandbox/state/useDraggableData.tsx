import { create } from "zustand"

export const useDraggableData = create((set) => ({
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
  }: {
    width?: number
    height?: number
    xOffset?: number
    yOffset?: number
  }) => set((state) => ({
    currDraggableWidth: width || state.currDraggableWidth,
    currDraggableHeight: height || state.currDraggableHeight,
    currDraggableXOffset: xOffset || state.currDraggableXOffset,
    currDraggableYOffset: yOffset || state.currDraggableYOffset
  })),
}))

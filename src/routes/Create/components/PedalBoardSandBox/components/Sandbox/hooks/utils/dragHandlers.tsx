import type { MouseEvent } from 'react'
import { keepInBounds } from './data'
import { useSandboxPosition } from '../../state/useSandboxPosition'
import { useDraggableData } from '../../state/useDraggableData'
import type { DraggablePedalShape } from '../../../Pedal/Pedal.types'

type MouseDownDragHandlerParams = {
  event: MouseEvent<HTMLElement>
  sandboxElem: HTMLElement
  draggableMap: Map<number | string, DraggablePedalShape>
  setIsDragging: (isDragging: boolean) => void
}

type MouseMoveDragHandlerParams = {
  event: MouseEvent<HTMLElement>
  setDraggableMap: (draggableMap: Map<number | string, DraggablePedalShape>) => void
}

export const mouseDownDragHandler = ({
  event,
  sandboxElem,
  draggableMap,
  setIsDragging,

}: MouseDownDragHandlerParams) => {
  const { setSandboxPosition } = useSandboxPosition.getState()
  const { setCurrDraggableData, setCurrDraggable, currDraggableElement: draggableElement } = useDraggableData.getState()

  const draggableId = draggableElement?.getAttribute('data-draggable-id')
  const draggable = draggableId === 'testboard'
    ? draggableMap.get(draggableId)
    : draggableMap.get(Number(draggableId))

  if (!draggable) {
    setIsDragging(false)
    setCurrDraggable(null)
    return
  }

  setCurrDraggable(draggable)

  setSandboxPosition({
    top: sandboxElem.offsetTop,
    left: sandboxElem.offsetLeft,
    width: sandboxElem.clientWidth,
    height: sandboxElem.clientHeight
  })

  setCurrDraggableData({
    width: draggableElement?.clientWidth,
    height: draggableElement?.clientHeight,
    xOffset: event.clientX - sandboxElem.offsetLeft - (draggableElement?.offsetLeft || 0),
    yOffset: event.clientY - sandboxElem.offsetTop - (draggableElement?.offsetTop || 0)
  })

  setIsDragging(true)
}

export const mouseMoveDragHandler = ({
  event,
  setDraggableMap,
}: MouseMoveDragHandlerParams) => {
  const {
    sandboxPosition
  } = useSandboxPosition.getState()
  const {
    currDraggableWidth,
    currDraggableHeight,
    currDraggableXOffset,
    currDraggableYOffset,
    currDraggable
  } = useDraggableData.getState()

  if (!currDraggable) return

  const xPos = (keepInBounds(
    event.clientX - sandboxPosition.left - currDraggableXOffset, sandboxPosition.width - currDraggableWidth
  ))
  const yPos = (keepInBounds(
    event.clientY - sandboxPosition.top - currDraggableYOffset, sandboxPosition.height - currDraggableHeight
  ))

  const newCurrDraggable = { ...currDraggable };

  newCurrDraggable.x = xPos
  newCurrDraggable.y = yPos

  setDraggableMap((prevDraggableMap) => {
    return new Map(prevDraggableMap.set(currDraggable.dragId, newCurrDraggable))
  })
}

export const mouseUpDragHandler = () => {
  const { setCurrDraggable } = useDraggableData.getState()
  setCurrDraggable(null)
}

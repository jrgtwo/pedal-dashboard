import { keepInBounds } from './data'
import { useSandboxPosition } from '../../state/useSandboxPosition'
import { useDraggableData } from '../../state/useDraggableData'

export const mouseDownDragHandler = ({
  event,
  sandboxElem,
  draggableMap,
  setIsDragging,

}) => {
  const { setSandboxPosition } = useSandboxPosition.getState()
  const { setCurrDraggableData, setCurrDraggable, currDraggableElement: draggableElement } = useDraggableData.getState()

  const draggableId = draggableElement.getAttribute('data-draggable-id')
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
    width: draggableElement.clientWidth,
    height: draggableElement.clientHeight,
    xOffset: event.clientX - sandboxElem.offsetLeft - draggableElement.offsetLeft,
    yOffset: event.clientY - sandboxElem.offsetTop - draggableElement.offsetTop
  })

  setIsDragging(true)
}
export const mouseMoveDragHandler = ({
  event,
  draggableMap,
  setDraggableMap,
}) => {
  const {
    sandboxPosition
  } = useSandboxPosition.getState((state) => state)
  const {
    currDraggableWidth,
    currDraggableHeight,
    currDraggableXOffset,
    currDraggableYOffset,
    currDraggable
  } = useDraggableData.getState((state) => state)

  if (!currDraggable) return

  const xPos = (keepInBounds(
    event.clientX - sandboxPosition.left - currDraggableXOffset, sandboxPosition.width - currDraggableWidth
  ))
  const yPos = (keepInBounds(
    event.clientY - sandboxPosition.top - currDraggableYOffset, sandboxPosition.height - currDraggableHeight
  ))

  const isColliding = [...draggableMap].find(([id, { w, h, x, y }]) => {
    if (id === currDraggable.dragId) return
    const pedalW = w * 30
    const pedalH = h * 30

    return (
      (x < (xPos + currDraggableWidth)) &&
      ((x + pedalW) > xPos) &&
      (y < (yPos + currDraggableHeight)) &&
      ((y + pedalH) > yPos)
    )
  })

  console.log(isColliding)

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

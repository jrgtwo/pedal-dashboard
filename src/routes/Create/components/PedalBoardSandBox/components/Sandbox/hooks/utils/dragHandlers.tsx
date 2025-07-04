import { keepInBounds } from './data'

export const mouseDownDragHandler = ({
  event,
  target,
  sandboxElem,
  draggableMap,
  setCurrDraggableElement,
  setCurrDraggable,
  setSandboxTop,
  setSandboxLeft,
  setSandboxWidth,
  setSandboxHeight,
  setCurrDraggableHeight,
  setCurrDraggableWidth,
  setCurrDraggableXOffset,
  setCurrDraggableYOffset,
  setIsDragging
}) => {
  const draggableElement = target.classList.contains('draggable')
    ? target
    : target.parentElement

  if (draggableElement === null) return
  setCurrDraggableElement(target)

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
  setSandboxTop(sandboxElem.offsetTop)
  setSandboxLeft(sandboxElem.offsetLeft)
  setSandboxWidth(sandboxElem.clientWidth)
  setSandboxHeight(sandboxElem.clientHeight)

  setCurrDraggableHeight(draggableElement.clientHeight)
  setCurrDraggableWidth(draggableElement.clientWidth)
  setCurrDraggableXOffset(event.clientX - sandboxElem.offsetLeft - draggableElement.offsetLeft)
  setCurrDraggableYOffset(event.clientY - sandboxElem.offsetTop - draggableElement.offsetTop)

  setIsDragging(true)
}
export const mouseMoveDragHandler = ({
  event,
  currDraggable,
  draggableMap,
  setDraggableMap,
  sandboxLeft,
  sandboxTop,
  sandboxWidth,
  sandboxHeight,
  currDraggableHeight,
  currDraggableWidth,
  currDraggableXOffset,
  currDraggableYOffset,
  setLastDragTime
}) => {
  const xPos = (keepInBounds(
    event.clientX - sandboxLeft - currDraggableXOffset, sandboxWidth - currDraggableWidth
  ))
  const yPos = (keepInBounds(
    event.clientY - sandboxTop - currDraggableYOffset, sandboxHeight - currDraggableHeight
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

  setLastDragTime(Date.now())
}

export const mouseUpDragHandler = () => {

}

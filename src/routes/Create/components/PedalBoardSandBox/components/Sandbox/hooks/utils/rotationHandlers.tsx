import { useRotationData } from "../../state/useRotationData"

export const mouseDownRotationHandler = ({
  event, target, draggableMap, setCurrRotateElement, setCurrRotatable
}) => {
  const { setIsRotating, setCurrDraggableRotationXY } = useRotationData.getState()
  const draggableParent = target.closest('.draggable')
  const draggableId = draggableParent?.getAttribute('data-draggable-id')
  const rotatable = draggableId === 'testboard'
    ? draggableMap.get(draggableId)
    : draggableMap.get(Number(draggableId))
  let currRotation = 0

  if (!rotatable) return

  if ((draggableParent as HTMLElement)?.style?.transform.includes('rotate')) {
    currRotation = Number((draggableParent as HTMLElement)?.style?.transform?.split('(')[1]?.split('deg')?.[0] || 0)
    rotatable.rotation = currRotation
  }

  setCurrRotateElement(draggableParent as HTMLElement)
  setCurrRotatable(rotatable)
  setCurrDraggableRotationXY({
    x: event.clientX,
    y: event.clientY,
    rotation: currRotation
  })
  setIsRotating(true)
}

export const mouseMoveRotationHandler = ({
  event, currRotatable, currRotateElement, setDraggableMap
}) => {
  const { currDraggableRotationXY, isRotating } = useRotationData.getState()

  if (!isRotating || !currRotatable || !currRotateElement) return

  const xDiff = event.clientX - (currDraggableRotationXY?.x || 0)
  const yDiff = event.clientY - (currDraggableRotationXY?.y || 0)
  const pedalHeight = currRotatable.h * 30
  const pedalWidth = currRotatable.w * 30

  const degsX = (xDiff / pedalWidth) * 180
  const degsY = (yDiff / pedalHeight) * 180

  const newCurrRotatable = { ...currRotatable };
  newCurrRotatable.rotation = degsX + degsY + (currDraggableRotationXY?.rotation || 0)

  setDraggableMap((prevDraggableMap) => {
    return new Map(prevDraggableMap.set(currRotatable.dragId, newCurrRotatable))
  })

}

export const mouseUpRotationHandler = () => {
  const { setIsRotating } = useRotationData.getState()
  setIsRotating(false)
}


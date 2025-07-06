import { useRotationData } from "../../state/useRotationData"
import { useDraggableData } from "../../state/useDraggableData"

export const mouseDownRotationHandler = ({
  event, target, draggableMap, setCurrRotatable
}) => {

  if (!target?.classList?.contains('rotate') && !target?.parentElement?.classList.contains('rotate')) return

  const { setIsRotating, setCurrDraggableRotationXY } = useRotationData.getState()
  const { currDraggableElement } = useDraggableData.getState()

  const draggableId = currDraggableElement?.getAttribute('data-draggable-id')
  const rotatable = draggableId === 'testboard'
    ? draggableMap.get(draggableId)
    : draggableMap.get(Number(draggableId))
  let currRotation = 0

  if (!rotatable) return

  if ((currDraggableElement as HTMLElement)?.style?.transform.includes('rotate')) {
    currRotation = Number((currDraggableElement as HTMLElement)?.style?.transform?.split('(')[1]?.split('deg')?.[0] || 0)
    rotatable.rotation = currRotation
  }

  setCurrRotatable(rotatable)
  setCurrDraggableRotationXY({
    x: event.clientX,
    y: event.clientY,
    rotation: currRotation
  })
  setIsRotating(true)
}

export const mouseMoveRotationHandler = ({
  event, currRotatable, setDraggableMap
}) => {
  const { currDraggableRotationXY, isRotating } = useRotationData.getState()
  const { currDraggableElement } = useDraggableData.getState()

  if (!isRotating || !currRotatable || !currDraggableElement) return

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


import { useState, useCallback, useEffect, type MouseEvent } from 'react'

type RequiredDataValues = {
  id: number,
  dragId: number,
  w: number,
  h: number,
  x: number,
  y: number,
  rotation: number,
}
const keepInBounds = (value: number, max: number) => {
  return Math.min(Math.max(value, 0), max)
}

const dataToMap = <T extends RequiredDataValues,>(_data: T[]) => _data?.reduce((acc, item) => {
  acc.set(item.dragId, { ...item })
  return acc
}, new Map())

const triggerOnComplete = <T,>(data: T[], target: HTMLElement | null, listeners: ((data: T[], target: HTMLElement | null) => void)[]) => {
  listeners.forEach((listener) => {
    listener(data, target)
  })
}

const useDraggable = <T extends RequiredDataValues,>(data: T[] = []) => {

  // Draggable state
  const [lastDragTime, setLastDragTime] = useState<number | null>()
  const [draggableMap, setDraggableMap] = useState(dataToMap<T>([...data || []]))
  const [currDraggable, setCurrDraggable] = useState<T | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Sandbox state
  const [sandboxTop, setSandboxTop] = useState(0)
  const [sandboxLeft, setSandboxLeft] = useState(0)
  const [sandboxWidth, setSandboxWidth] = useState(0)
  const [sandboxHeight, setSandboxHeight] = useState(0)

  // Position settings
  const [currDraggableWidth, setCurrDraggableWidth] = useState(0)
  const [currDraggableHeight, setCurrDraggableHeight] = useState(0)
  const [currDraggableXOffset, setCurrDraggableXOffset] = useState(0)
  const [currDraggableYOffset, setCurrDraggableYOffset] = useState(0)
  const [currDraggableElement, setCurrDraggableElement] = useState<HTMLElement | null>(null)

  const [isRotating, setIsRotating] = useState(false)
  const [currRotateElement, setCurrRotateElement] = useState<HTMLElement | null>(null)
  const [currRotatable, setCurrRotatable] = useState<T | null>(null)
  const [currDraggableRotationXY, setCurrDraggableRotationXY] = useState<{ x: number, y: number } | null>(null)

  // Output data 
  const [draggableArray, setDraggableArray] = useState<T[]>([])

  // Client Listeners
  const [onCompleteListeners, setOnCompleteListeners] = useState<((data: T[], target: HTMLElement | null) => void)[]>([])

  const handleMouseDown = useCallback((event: MouseEvent) => {
    event.preventDefault()
    setLastDragTime(Date.now())
    const target = event.target as HTMLElement
    const sandboxElem = event.currentTarget as HTMLElement

    if (target.classList.contains('rotate') || target.parentElement?.classList.contains('rotate')) {

      const draggableParent = target.closest('.draggable')
      const draggableId = draggableParent?.getAttribute('data-draggable-id')
      const rotatable = draggableId === 'testboard'
        ? draggableMap.get(draggableId)
        : draggableMap.get(Number(draggableId))

      if (!rotatable) return
      setCurrRotateElement(draggableParent as HTMLElement)
      setCurrRotatable(rotatable)
      setCurrDraggableRotationXY({
        x: event.clientX,
        y: event.clientY
      })
      setIsRotating(true)


    } else if (
      target.classList.contains('draggable')
      || target.parentElement?.classList.contains('draggable')
    ) {

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
  }, [draggableMap]);


  const handleMouseUp = useCallback((event: MouseEvent) => {
    console.log('===handleMouseUp')
    event.preventDefault()
    triggerOnComplete(draggableArray, currDraggableElement, onCompleteListeners)
    setIsDragging(false)
    setIsRotating(false)
    setCurrRotateElement(null)
    setCurrDraggableElement(null)
    setCurrDraggable(null)
    setLastDragTime(null)

  }, [onCompleteListeners, draggableArray, currDraggableElement])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const now = Date.now()

    if (isRotating && !!currRotatable && currRotateElement) {

      console.log(currDraggableRotationXY, { x: event.clientX, Y: event.clientY })
      const xDiff = event.clientX - (currDraggableRotationXY?.x || 0)
      const yDiff = event.clientY - (currDraggableRotationXY?.y || 0)
      const pedalHeight = currRotatable.h * 30
      const pedalWidth = currRotatable.w * 30

      const degsX = (xDiff / pedalWidth) * 180
      const degsY = (yDiff / pedalHeight) * 180

      const newCurrRotatable = { ...currRotatable };
      newCurrRotatable.rotation = degsX + degsY

      setDraggableMap((prevDraggableMap) => {
        return new Map(prevDraggableMap.set(currRotatable.dragId, newCurrRotatable))
      })

      setLastDragTime(Date.now())
      return
    }

    if (isDragging && !!currDraggable && lastDragTime && now - lastDragTime > 9) {

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
  }, [
    isDragging, currDraggable, draggableMap,
    sandboxTop, sandboxLeft, sandboxWidth, sandboxHeight,
    currDraggableWidth, currDraggableHeight, currDraggableXOffset, currDraggableYOffset,
    setDraggableMap, lastDragTime, currRotatable, currRotateElement, isRotating, currDraggableRotationXY
  ])

  useEffect(() => {
    setDraggableArray([...draggableMap.values()])
  }, [draggableMap])

  const setter = useCallback((updatedData: T[]) => {
    if (typeof updatedData === 'string') {
      updatedData = JSON.parse(updatedData) as T[]
    }

    setDraggableMap(dataToMap(updatedData))
  }, [])

  const onDraggingComplete = useCallback((callback: (data: T[], target: HTMLElement | null) => void) => {
    setOnCompleteListeners((prev) => [...prev, callback])
  }, [])

  return { handleMouseDown, handleMouseUp, handleMouseMove, draggableArray, setter, isDragging, onDraggingComplete, onCompleteListeners }
}

export { useDraggable }

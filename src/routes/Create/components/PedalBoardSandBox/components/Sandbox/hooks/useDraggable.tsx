import { useState, useCallback, useEffect, type MouseEvent } from 'react'

type RequiredDataValues = {
  id: number,
  dragId: number,
  location: {
    w: number,
    h: number,
    x: number,
    y: number
  }
}
const keepInBounds = (value: number, max: number) => {
  return Math.min(Math.max(value, 0), max)
}

const dataToMap = <T extends RequiredDataValues,>(_data: T[]) => _data.reduce((acc, item) => {
  acc.set(item.dragId, { ...item })
  return acc
}, new Map())

const triggerOnComplete = <T,>(data: T[], listeners: ((data: T[]) => void)[]) => {
  listeners.forEach((listener) => {
    listener(data)
  })
}

const useDraggable = <T extends RequiredDataValues,>(data: T[]) => {

  // Draggable state
  const [lastDragTime, setLastDragTime] = useState<number | null>()
  const [draggableMap, setDraggableMap] = useState(dataToMap<T>([...data]))
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

  // Output data 
  const [draggableArray, setDraggableArray] = useState<T[]>([])

  // Client Listeners
  const [onCompleteListeners, setOnCompleteListeners] = useState<((data: T[]) => void)[]>([])

  const handleMouseDown = useCallback((event: MouseEvent) => {
    event.preventDefault()
    setLastDragTime(Date.now())
    const target = event.target as HTMLElement
    const sandboxElem = event.currentTarget as HTMLElement

    if (
      target.classList.contains('draggable')
      || target.parentElement?.classList.contains('draggable')
    ) {
      const draggableElement = target.classList.contains('draggable')
        ? target
        : target.parentElement

      if (draggableElement === null) return

      const draggableId = draggableElement.getAttribute('data-draggable-id')
      const draggable = draggableMap.get(Number(draggableId))

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
    event.preventDefault()
    setIsDragging(false)
    setCurrDraggable(null)
    setLastDragTime(null)
    triggerOnComplete(draggableArray, onCompleteListeners)
  }, [onCompleteListeners, draggableArray])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const now = Date.now()
    if (isDragging && !!currDraggable && lastDragTime && now - lastDragTime > 9) {

      const xPos = (keepInBounds(
        event.clientX - sandboxLeft - currDraggableXOffset, sandboxWidth - currDraggableWidth
      ))
      const yPos = (keepInBounds(
        event.clientY - sandboxTop - currDraggableYOffset, sandboxHeight - currDraggableHeight
      ))

      const newCurrDraggable = { ...currDraggable }

      newCurrDraggable.location = { ...newCurrDraggable.location }
      newCurrDraggable.location.x = xPos
      newCurrDraggable.location.y = yPos

      setDraggableMap((prevDraggableMap) => {
        return new Map(prevDraggableMap.set(currDraggable.dragId, newCurrDraggable))
      })

      setLastDragTime(Date.now())
    }
  }, [
    isDragging, currDraggable,
    sandboxTop, sandboxLeft, sandboxWidth, sandboxHeight,
    currDraggableWidth, currDraggableHeight, currDraggableXOffset, currDraggableYOffset,
    setDraggableMap, lastDragTime
  ])

  useEffect(() => {
    setDraggableArray([...draggableMap.values()])
  }, [draggableMap])

  const setter = useCallback((updatedData: T[]) => {
    setDraggableMap(dataToMap(updatedData))
  }, [])

  const onDraggingComplete = useCallback((callback: (data: T[]) => void) => {
    setOnCompleteListeners((prev) => [...prev, callback])
  }, [])

  return { handleMouseDown, handleMouseUp, handleMouseMove, draggableArray, setter, isDragging, onDraggingComplete, onCompleteListeners }
}

export { useDraggable }

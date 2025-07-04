import { useState, useCallback, useEffect, type MouseEvent } from 'react'
import { mouseDownRotationHandler, mouseMoveRotationHandler } from './utils/rotationHandlers'
import { mouseDownDragHandler, mouseMoveDragHandler } from './utils/dragHandlers'
import { dataToMap } from './utils/data'
import { triggerOnComplete } from './utils/listeners'

export type RequiredDataValues = {
  id: number,
  dragId: number,
  w: number,
  h: number,
  x: number,
  y: number,
  rotation: number,
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
  const [currDraggableRotationXY, setCurrDraggableRotationXY] = useState<{ x: number, y: number, rotation: number } | null>(null)

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
      return mouseDownRotationHandler({
        event,
        setIsRotating,
        target,
        draggableMap,
        setCurrRotateElement,
        setCurrRotatable,
        setCurrDraggableRotationXY
      })
    }

    if (
      target.classList.contains('draggable')
      || target.parentElement?.classList.contains('draggable')
    ) {
      return mouseDownDragHandler({
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
      })
    }
  }, [draggableMap]);


  const handleMouseUp = useCallback((event: MouseEvent) => {
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
      return mouseMoveRotationHandler({
        event, currDraggableRotationXY, currRotatable, setDraggableMap, setLastDragTime
      })
    }

    if (isDragging && !!currDraggable && lastDragTime && now - lastDragTime > 9) {
      return mouseMoveDragHandler({
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
      })
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
